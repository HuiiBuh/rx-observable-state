import { Store } from './store';

test('Check if initial state gets created', () => {
  const s = new Store({hello: {world: 'asdf'}, world: 'test'});
  expect(s.state).toEqual({hello: {world: 'asdf'}, world: 'test'});
});

test('Check store update', () => {
  const s = new Store({hello: {world: 'asdf'}, world: 'test'});
  s.patch('fdsa', 'hello', 'world');
  expect(s.state).toEqual({hello: {world: 'fdsa'}, world: 'test'});
});

test('Check store overwrite primitive with nested object', () => {
  const s = new Store<{ hello: any }>({hello: undefined});
  s.patch('asdf', 'hello', 'world');
  expect(s.state).toEqual({hello: {world: 'asdf'}});
});

test('Check if immutability was preserved', () => {
  const s = new Store<{ hello: { world: string } }>({hello: {world: 'a'}});
  const oldState = s.get('hello');
  s.patch('a', 'hello', 'world');
  const newState = s.get('hello');
  expect(oldState).not.toBe(newState);
  expect(oldState).toEqual(newState);
});

test('Check if only required filed was updated', () => {
  const s = new Store<{ hello: { world: string }, update: string }>({hello: {world: 'a'}, update: 'me'});
  const oldState = s.get('hello');
  s.patch('updated', 'update');
  const newState = s.get('hello');
  expect(oldState).toBe(newState);
});
