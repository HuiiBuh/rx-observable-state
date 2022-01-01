import { BehaviorSubject, distinctUntilChanged, map, Observable } from 'rxjs';
import { DispatcherFunctionParameter, DispatcherFunctions } from './dispatcher';

import { deepEquals } from './equals';
import { ISelector } from './selector';
import { SelectorCache } from './selector-cache';
import { StoreTypes } from './store-types';

type Index = string | number | symbol;
const isPrimitive = (object: any) => !(object instanceof Object);

export interface StoreConstructorOptions<D, S> {
  deepEqual?: boolean;
  dispatcher?: D;
  selector?: S;
}

export class Store<
  S extends object,
  DISPATCHER extends object | undefined = undefined,
  SELECTOR extends object | undefined = undefined,
> extends StoreTypes<S> {
  public readonly state$: Observable<S>;
  protected readonly dispatcher: DISPATCHER | undefined;
  protected readonly selector: SELECTOR | undefined;
  protected readonly comparator: (a: any, b: any) => boolean;
  protected readonly _state$: BehaviorSubject<S>;
  protected readonly selectorCache: SelectorCache<S> | undefined;

  constructor(
    initialState: S,
    { deepEqual = true, dispatcher, selector }: StoreConstructorOptions<DISPATCHER, SELECTOR> = {},
  ) {
    super();
    this.comparator = deepEqual ? deepEquals : (a, b) => a === b;
    this.dispatcher = dispatcher;
    this.selector = selector;
    this._state$ = new BehaviorSubject(initialState);
    this.state$ = this._state$.asObservable();
    if (this.selector) {
      this.selectorCache = new SelectorCache(this.state$, this.selector as ISelector<S>, this.comparator);
    }
  }

  public get state(): S {
    return this._state$.value;
  }

  public setState(state: S): void {
    this._state$.next(state);
  }

  public select<A extends keyof SELECTOR & string>(selector: A): Observable<any> {
    if (!this.selector || !this.selectorCache) throw new Error('Pass a selector to the constructor');
    if (!(selector in this.selector)) {
      throw new Error(`Selector ${selector} was not found in the selector. Make sure that the action actually exists`);
    }

    return this.selectorCache.observeTo(selector);
  }

  public dispatch<A extends DispatcherFunctions<NonNullable<DISPATCHER>>>(
    action: DISPATCHER extends undefined ? never : A,
    ...args: DISPATCHER extends undefined ? never[] : DispatcherFunctionParameter<NonNullable<DISPATCHER>[A], S>
  ): void {
    if (!this.dispatcher) throw new Error('Pass a dispatcher to the constructor');

    const actionFunction = (this.dispatcher as NonNullable<DISPATCHER>)[action] as unknown as (
      ...args: any[]
    ) => any | undefined;
    if (!actionFunction) {
      throw new Error(`Action ${action} was not found in the dispatcher. Make sure that the action actually exists`);
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
