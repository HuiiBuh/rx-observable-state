import { Index, KeysOfType } from './types';

export type Selector<S extends object> = (context: S) => any;
export type DependableSelector = {
  selector: (...args: any[]) => any;
  dependencies: string[];
};

export const isSelector = (f: Selector<any> | DependableSelector): f is Selector<any> => typeof f === 'function';

export type ISelector<S extends object> = {
  [key: Index]: DependableSelector | Selector<S>;
};

export type SelectorFunctions<SELECTOR extends object, STATE extends object> = KeysOfType<
  SELECTOR,
  Selector<STATE> | DependableSelector
>;

export type SelectorReturnType<
  SELECTOR,
  ACCESSOR extends keyof SELECTOR,
  ITEM = SELECTOR[ACCESSOR],
> = ITEM extends Selector<any>
  ? ReturnType<ITEM>
  : ITEM extends DependableSelector
  ? ReturnType<ITEM['selector']>
  : never;
