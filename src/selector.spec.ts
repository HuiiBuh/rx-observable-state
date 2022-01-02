import { getDummyStore } from './store.provider.spec';

test('Check if the selector works', () => {
  const store = getDummyStore();
  const expected = [
    [1, 2, 3, 4],
    [1, 2, 3, 4, 6],
  ];
  let index = 0;
  store.select('getNumberArray').subscribe((result) => {
    expect(result).toStrictEqual(expected[index]);
    ++index;
  });
  store.dispatch('addNumberToArray', 6);
});

test('Check if dependable selector works', () => {
  const store = getDummyStore();
  store.select('concatArrayLengthWithHello').subscribe((result) => {
    expect(result).toBe('world4');
  });
});
