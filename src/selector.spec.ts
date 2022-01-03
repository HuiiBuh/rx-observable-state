import { lastValueFrom, Observable } from 'rxjs';
import { observableToBehaviourSubject } from './selector-cache';
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

test('Check selector for current value', () => {
  const store = getDummyStore();
  const hello = store.selectCurrent('getHello');
  expect(hello).toBe('world');
  store.patch('new', 'hello');
  const newValue = store.selectCurrent('getHello');
  expect(newValue).toBe('new');
});

test('Check if invalid selector throws exception', () => {
  const store = getDummyStore();

  expect(() => {
    // @ts-ignore
    store.selectCurrent('not-a-valid-selector');
  }).toThrow();
});

test('Test toObservable next', async () => {
  const ob = new Observable<string>((s) => {
    s.next('next');
    s.complete();
  });
  const sub = observableToBehaviourSubject(ob);
  expect(await lastValueFrom(sub)).toBe('next');
});

test('Test toObservable error', async () => {
  const ob = new Observable<string>((s) => s.error('error'));
  const sub = observableToBehaviourSubject(ob);

  await expect(async () => {
    await lastValueFrom(sub);
  }).rejects.toEqual('error');
});
