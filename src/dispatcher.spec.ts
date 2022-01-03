import { lastValueFrom } from 'rxjs';
import { getDummyStore } from './store.provider.spec';

test('If the string array list gets cleared', async () => {
  const store = getDummyStore();
  await lastValueFrom(store.dispatch('clearStringArray'));
  expect(store.get('deep', 'nested', 'object')).toStrictEqual([]);
});

test('If the a number gets appended to the list', async () => {
  const store = getDummyStore();
  await lastValueFrom(store.dispatch('addNumberToArray', 5));
  expect(store.get('deep', 'nested', 'and')).toStrictEqual([1, 2, 3, 4, 5]);
});
