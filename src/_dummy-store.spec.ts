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
  clearStringArray(store: StoreContext<DummyStoreType>): void {
    store.patch([] as string[], 'deep', 'nested', 'object');
  },
  addNumberToArray(newNumber: number, store: StoreContext<DummyStoreType>): void {
    const array = store.state.deep.nested.and;
    store.patch([...array, newNumber], 'deep', 'nested', 'and');
  },
} as const;

export const getDummyStore = () => {
  return new Store<DummyStoreType, typeof dispatcher>(
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
