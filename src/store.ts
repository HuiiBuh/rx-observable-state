import { BehaviorSubject, distinctUntilChanged, map, Observable } from 'rxjs';

import { deepEquals } from './equals';
import { StoreTypeProvider } from './store-type-provider';

type Index = string | number | symbol;
const isPrimitive = (object: any) => !(object instanceof Object);

export interface StoreConstructorOptions {
  deepEqual?: boolean;
}

export class Store<S extends object> extends StoreTypeProvider<S> {
  private readonly comparator: (a: any, b: any) => boolean;
  private _state$: BehaviorSubject<S>;
  public state$: Observable<S>;

  public get state(): S {
    return this._state$.value;
  }

  constructor(initialState: S, {deepEqual = true}: StoreConstructorOptions = {}) {
    super();
    this.comparator = deepEqual ? deepEquals : (a, b) => a === b;
    this._state$ = new BehaviorSubject(initialState);
    this.state$ = this._state$.asObservable();
  }

  protected setState(state: S): void {
    this._state$.next(state);
  }

  protected _on(path: Index[]): Observable<any> {
    return this.state$.pipe(
      map(state => this._get(path, state)),
      distinctUntilChanged(this.comparator)
    );
  }

  protected _get(path: Index[], state = this.state): any {
    return path.reduce((returnState, key) => {
      if (returnState === null || returnState === undefined) return undefined;
      return (returnState as any)[key];
    }, state);
  }

  protected _patch(value: any, path: Index[]): void {
    const newState = {...this.state} as any;
    let stateCopy = newState;
    for (const [index, key] of path.entries()) {
      if (index === path.length - 1) {
        stateCopy[key] = value;
        continue;
      }
      if (isPrimitive(stateCopy[key]) || !(key in stateCopy)) {
        stateCopy[key] = {};
      }
      if (!isPrimitive(stateCopy[key])) {
        stateCopy[key] = {...stateCopy[key]};
      }
      stateCopy = stateCopy[key];
    }
    this.setState(newState);
  }

}
