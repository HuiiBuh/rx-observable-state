import { BehaviorSubject, distinctUntilChanged, map, Observable } from 'rxjs';
import { List } from 'ts-toolbelt';
import { StoreContext, StoreDispatcher } from './dispatcher';

import { deepEquals } from './equals';
import { StoreTypeProvider } from './store-type-provider';

type Index = string | number | symbol;
const isPrimitive = (object: any) => !(object instanceof Object);

export interface StoreConstructorOptions<D> {
  deepEqual?: boolean;
  dispatcher?: D;
}

export class Store<
  S extends object,
  D extends StoreDispatcher<S> | undefined = undefined,
> extends StoreTypeProvider<S> {
  public state$: Observable<S>;
  protected dispatcher: D | undefined;
  private readonly comparator: (a: any, b: any) => boolean;
  private _state$: BehaviorSubject<S>;

  constructor(initialState: S, { deepEqual = true, dispatcher }: StoreConstructorOptions<D> = {}) {
    super();
    this.comparator = deepEqual ? deepEquals : (a, b) => a === b;
    this.dispatcher = dispatcher;
    this._state$ = new BehaviorSubject(initialState);
    this.state$ = this._state$.asObservable();
  }

  public get state(): S {
    return this._state$.value;
  }

  public setState(state: S): void {
    this._state$.next(state);
  }

  public dispatch<A extends keyof D>(
    action: D extends undefined ? 'Please pass a dispatcher to the constructor' : A,
    ...args: D extends undefined ? never[] : List.Filter<Parameters<NonNullable<D>[A]>, StoreContext<S>>
  ): void {
    if (!this.dispatcher) {
      console.warn('Pass a dispatcher as to the constructor');
      return;
    }

    const actionFunction = (this.dispatcher as NonNullable<D>)[action];
    if (!action) {
      console.warn(`Action ${action} was not found in the dispatcher. Make sure that the action actually exists`);
      return;
    }
    actionFunction.apply(this.dispatcher, [...args, this]);
  }

  protected _on(path: Index[]): Observable<any> {
    return this.state$.pipe(
      map((state) => this._get(path, state)),
      distinctUntilChanged(this.comparator),
    );
  }

  protected _get(path: Index[], state = this.state): any {
    return path.reduce((returnState, key) => {
      if (returnState === null || returnState === undefined) return undefined;
      return (returnState as any)[key];
    }, state);
  }

  protected _patch(value: any, path: Index[]): void {
    const newState = { ...this.state } as any;
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
        stateCopy[key] = { ...stateCopy[key] };
      }
      stateCopy = stateCopy[key];
    }
    this.setState(newState);
  }
}
