import { getDummyStore } from './_dummy-store.spec';

test('If the string array list gets cleared', () => {
  const store = getDummyStore();
  store.dispatch('clearStringArray');
  expect(store.get('deep', 'nested', 'object')).toStrictEqual([]);
});

test('If the a number gets appended to the list', () => {
  const store = getDummyStore();
  store.dispatch('addNumberToArray', 5);
  expect(store.get('deep', 'nested', 'and')).toStrictEqual([1, 2, 3, 4, 5]);
});
