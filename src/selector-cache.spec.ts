import { Observable } from 'rxjs';
import { SelectorCache } from './selector-cache';

test('Check if invalid dependencies get filtered out', () => {
  const createInvalidCache = () => {
    return new SelectorCache(
      new Observable<object>(),
      {
        // @ts-ignore
        world: 'not-valid',
        invalidDep: {
          selector: () => null,
          dependencies: ['world'],
        },
      },
      () => true,
    );
  };
  expect(createInvalidCache).toThrow();
});

test('Check if passing an invalid key throws', () => {
  const cache = new SelectorCache(
    new Observable<object>(),
    {
      // @ts-ignore
      invalidDep: {
        selector: () => null,
      },
    },
    () => true,
  );
  const callInvalidSelector = () => {
    cache.observeTo('invalidDep');
  };
  expect(callInvalidSelector).toThrow();
});
