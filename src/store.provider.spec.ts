import { StoreContext } from './dispatcher';
import { Store } from './store';

type DummyStoreType = {
  hello: string;
  deep: {
    nested: {
      object: string[];
      and: number[];
    };
  };
};

const dispatcher = {
  iAmIgnored: 'sdfghj',
  clearStringArray(store: StoreContext<DummyStoreType>): void {
    store.patch([] as string[], 'deep', 'nested', 'object');
  },
  addNumberToArray(newNumber: number, store: StoreContext<DummyStoreType>): void {
    const array = store.state.deep.nested.and;
    store.patch([...array, newNumber], 'deep', 'nested', 'and');
  },
};

const selector = {
  iAmIgnored: 'sdfghj',
  getHello(store: DummyStoreType): string {
    return store.hello;
  },
  getNumberArray(store: DummyStoreType): number[] {
    return store.deep.nested.and;
  },
  concatArrayLengthWithHello: {
    selector(array: number[], hello: string): string {
      return `${hello}${array.length}`;
    },
    dependencies: ['getNumberArray', 'getHello'],
  },
};

export const getDummyStore = () => {
  return new Store<DummyStoreType, typeof dispatcher, typeof selector>(
    {
      hello: 'world',
      deep: {
        nested: {
          object: ['with', 'arrays'],
          and: [1, 2, 3, 4],
        },
      },
    },
    {
      dispatcher,
      selector,
    },
  );
};

test('Store gets created', () => {
  const state = getDummyStore();
  expect(state.state).toStrictEqual({
    hello: 'world',
    deep: {
      nested: {
        object: ['with', 'arrays'],
        and: [1, 2, 3, 4],
      },
    },
  });
});
