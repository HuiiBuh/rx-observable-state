import { BehaviorSubject, combineLatest, distinctUntilChanged, map, Observable } from 'rxjs';
import { DependableSelector, isDependableSelector, ISelector, isSelector, Selector } from './selector';
import { Index } from './types';

export class SelectorCache<T extends object> {
  private cache: Record<Index, BehaviorSubject<any>> = {};

  constructor(
    private store: Observable<T>,
    private selector: ISelector<T>,
    private comparator: (a: any, b: any) => boolean,
  ) {
    this.validateDependableSelectors();
  }

  public get(selector: Index): any {
    if (!(selector in this.cache)) this.observeTo(selector);
    return this.cache[selector].value;
  }

  public observeTo(selector: Index): Observable<any> {
    if (selector in this.cache) return this.cache[selector];
    const executor = this.selector[selector];
    if (isSelector(executor)) {
      return this.observableFromSelector(selector, executor).asObservable();
    } else if (isDependableSelector(executor)) {
      return this.observableFromDependableSelector(selector, executor).asObservable();
    }
    throw new Error(`Selector ${String(selector)} is not a valid selector`);
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

  private observableFromSelector(selector: Index, executor: Selector<any>): BehaviorSubject<any> {
    const observable = this.store.pipe(
      map((state) => executor.apply(this.selector, [state])),
      distinctUntilChanged(this.comparator),
    );
    this.cache[selector] = observableToBehaviourSubject(observable);
    return this.cache[selector];
  }

  private observableFromDependableSelector(selector: Index, executor: DependableSelector): BehaviorSubject<any> {
    this.createCacheForDependencies(executor.dependencies);
    const observable = combineLatest(executor.dependencies.map((d) => this.cache[d])).pipe(
      map((values) => executor.selector.apply(this.selector, values)),
    );
    this.cache[selector] = observableToBehaviourSubject(observable);
    return this.cache[selector];
  }

  private createCacheForDependencies(dependencies: Index[]): void {
    dependencies.filter((d) => !(d in this.cache)).forEach((d) => this.observeTo(d));
  }
}

export const observableToBehaviourSubject = <T>(observable: Observable<T>): BehaviorSubject<T> => {
  const subject = new BehaviorSubject<T>(null as any);
  observable.subscribe({
    complete: () => subject.complete(),
    error: (err: any) => subject.error(err),
    next: (value: T) => subject.next(value),
  });
  return subject;
};
