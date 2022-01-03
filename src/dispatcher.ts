import { List } from 'ts-toolbelt';
import { Store } from './store';
import { KeysOfType } from './types';

export type StoreContext<T extends object, SELECTOR extends object = object, DISPATCHER extends object = object> = Pick<
  Store<T, DISPATCHER, SELECTOR>,
  'get' | 'state' | 'patch' | 'setState' | 'dispatch' | 'selectCurrent'
>;

export type DispatcherFunction = (state: StoreContext<any>, ...args: any[]) => any;
export type DispatcherFunctions<T extends object> = KeysOfType<T, DispatcherFunction>;
export type DispatcherFunctionParameter<T, S extends object> = List.Filter<
  T extends DispatcherFunction ? Parameters<T> : never[],
  StoreContext<S>
>;
