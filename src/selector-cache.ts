import { combineLatest, distinctUntilChanged, map, Observable } from 'rxjs';
import { DependableSelector, isDependableSelector, ISelector, isSelector, Selector } from './selector';
import { Index } from './types';

export class SelectorCache<T extends object> {
  private cache: Record<Index, Observable<any>> = {};

  constructor(
    private store: Observable<T>,
    private selector: ISelector<T>,
    private comparator: (a: any, b: any) => boolean,
  ) {
    this.validateDependableSelectors();
  }

  private validateDependableSelectors(): void {
    const dependableSelectors = this.getDependableSelectors();
    for (const [selector, executor] of dependableSelectors) {
      if (!this.dependenciesExist(executor.dependencies)) {
        throw new Error(`One or more of the dependencies of one of the selector ${String(selector)} is wrong`);
      }
    }
  }

  private dependenciesExist(dependencies: Index[]): boolean {
    return dependencies.every((d) => isSelector(this.selector[d]) || isDependableSelector(this.selector[d]));
  }

  private getDependableSelectors(): [Index, DependableSelector][] {
    return Object.entries(this.selector).filter((e) => isDependableSelector(e[1])) as [Index, DependableSelector][];
  }

  public observeTo(selector: Index): Observable<any> {
    if (selector in this.cache) return this.cache[selector];
    const executor = this.selector[selector];
    if (isSelector(executor)) {
      return this.observableFromSelector(selector, executor);
    } else if (isDependableSelector(executor)) {
      return this.observableFromDependableSelector(selector, executor);
    }
    throw new Error(`Selector ${String(selector)} is not a valid selector`);
  }

  private observableFromSelector(selector: Index, executor: Selector<any>): Observable<any> {
    this.cache[selector] = this.store.pipe(
      map((state) => executor.apply(this.selector, [state])),
      distinctUntilChanged(this.comparator),
    );
    return this.cache[selector];
  }

  private observableFromDependableSelector(selector: Index, executor: DependableSelector): Observable<any> {
    this.createCacheForDependencies(executor.dependencies);
    this.cache[selector] = combineLatest(executor.dependencies.map((d) => this.cache[d])).pipe(
      map((values) => executor.selector.apply(this.selector, values)),
    );
    return this.cache[selector];
  }

  private createCacheForDependencies(dependencies: Index[]): void {
    dependencies.filter((d) => !(d in this.cache)).forEach((d) => this.observeTo(d));
  }
}
