import { List } from 'ts-toolbelt';
import { Store } from './store';
import { Index, KeysOfType } from './types';

export type StoreContext<T extends object> = Pick<Store<T, never>, 'get' | 'state' | 'patch' | 'setState'>;

export type DispatcherFunctions<T extends object> = KeysOfType<T, (...args: any[]) => any>;
export type DispatcherFunctionParameter<T, S extends object> = List.Filter<
  T extends (...args: any[]) => any ? Parameters<T> : never[],
  StoreContext<S>
>;

export type IDispatcher = {
  [key: Index]: ((...args: any[]) => any) | any;
};
