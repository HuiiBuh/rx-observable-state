import { Store } from './store';

export type StoreContext<T extends object> = Pick<Store<T, never>, 'get' | 'state' | 'patch' | 'setState'>;

export interface StoreDispatcher<T extends object> {
  [key: string]: (...args: any[]) => any;
}
