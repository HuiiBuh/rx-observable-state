import { Store } from './store';
import { Constructor } from './types';

export const addCapabilities = <T extends object>() => {
  return <S extends Constructor<Store<T>, T>>(store: S): Constructor<Store<T> & Dispatcher<T>, T> => {
    // @ts-ignore
    return class extends store implements Dispatcher<T> {
      constructor(...args: [any, any]) {
        super(...args);
      }

      public dispatch(): void {
      }
    };
  };
};

interface Dispatcher<T> {
  dispatch(): void;
}

const NewState = addCapabilities<{ hello: string }>()(Store);
const s = new NewState({hello: ''}, {deepEqual: true});
s.dispatch();
