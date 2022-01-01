import { combineLatest, distinctUntilChanged, map, Observable } from 'rxjs';
import { DependableSelector, ISelector, isSelector, Selector } from './selector';

export class SelectorCache<T extends object> {
  private cache: Record<string, Observable<any>> = {};

  constructor(
    private store: Observable<T>,
    private selector: ISelector<T>,
    private comparator: (a: any, b: any) => boolean,
  ) {}

  public observeTo(selector: string): Observable<any> {
    if (selector in this.cache) return this.cache[selector];
    const executor = this.selector[selector];
    if (isSelector(executor)) {
      return this.observableFromSelector(selector, executor);
    }
    return this.observableFromDependableSelector(selector, executor as DependableSelector<T>);
  }

  private observableFromSelector(selector: string, executor: Selector<any>): Observable<any> {
    this.cache[selector] = this.store.pipe(
      map((state) => executor.apply(this.selector, [state])),
      distinctUntilChanged(this.comparator),
    );
    return this.cache[selector];
  }

  private observableFromDependableSelector(selector: string, executor: DependableSelector<any>): Observable<any> {
    this.createCacheForDependencies(executor.dependencies);
    this.cache[selector] = combineLatest(executor.dependencies.map((d) => this.cache[d])).pipe(
      map((values) => executor.selector.apply(this.selector, values)),
    );
    return this.cache[selector];
  }

  private createCacheForDependencies(dependencies: string[]): void {
    dependencies.filter((d) => !(d in this.cache)).forEach((d) => this.observeTo(d));
  }
}
