import { List } from 'ts-toolbelt';
import { Store } from './store';

export type StoreContext<T extends object> = Pick<Store<T, never>, 'get' | 'state' | 'patch' | 'setState'>;

type KeysOfType<T extends object, V> = { [K in keyof T]: T[K] extends V ? K : never }[keyof T];

export type DispatcherFunctions<T extends object> = KeysOfType<T, (...args: any[]) => any>;
export type DispatcherFunctionParameter<T, S extends object> = List.Filter<
  T extends (...args: any[]) => any ? Parameters<T> : never[],
  StoreContext<S>
>;
