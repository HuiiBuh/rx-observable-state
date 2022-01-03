# Rx Observable State

[![codecov](https://codecov.io/gh/HuiiBuh/rx-observable-state/branch/main/graph/badge.svg?token=PXJF5SIA22)](https://codecov.io/gh/HuiiBuh/rx-observable-state)
[![NPM package](https://img.shields.io/npm/v/rx-observable-state.svg?logo=npm&logoColor=fff&label=NPM+package&color=rgb(49,199,84))](https://www.npmjs.com/package/rx-observable-state)

## Features

+ Minimal overhead and size
+ Completely type-save, even if you access the state 'only' with strings
+ Very minimal and easy to learn API
+ Pass your own (optional) dispatchers
+ Pass your own (optional) selectors
+ Autocomplete/Error everything (even strings)

## Example

For a more advanced example take a look at the [*example.ts*](https://github.com/HuiiBuh/rx-observable-state/blob/main/example.ts).

```typescript
interface Todo {
  id: TodoId;
  done: boolean;
  contents: any;
  shared: any;
}

interface TodoState {
  selectedTodo: Todo | null;
  todo: Record<TodoId, Todo>;
  username: string | null;
  allDone: boolean;
}

const store = new Store<TodoState>(
  // The initial state
  { todo: {}, selectedTodo: null, username: null, allDone: false },
);

// Logs the username every time the username changes
store.on('username').subscribe(console.log)

// Change the username
store.patch('huiibuh', 'username');
```

## API

### Properties

| name   | value         |
|--------|---------------|
| state  | S             |
| state$ | Observable<S\> |

### Methods
  
`?` stands for values which are infered. These values are typesave!

| name          | parameters                                                                                              | returns       | description                                                                       |
|---------------|---------------------------------------------------------------------------------------------------------|---------------|-----------------------------------------------------------------------------------|
| setState      | `state` __S__                                                                                                | void          | Completely replace the current state                                              |
| patch         | `value` __?__, `...path` __?__ The accessor path to the property you want to update                                    | void          | Update the value at a specific position of the state                              |
| on            | `...path` __?__ The accessor path to the property you want to subscribe to changes to                                              | Observable<?> | Get an observable which notifies you whenever the value behind the path changes   |
| get           | `...path` __?__ The accessor path to the property you want to get                                              | ?             | The the value at a specific path. undefined if the path does not exist            |
| dispatch      | `dispatcher` __S__ The name of the dispatcher, `...args` __?[]__ Whatever arguments have to be passed to the dispatcher | Observable<S\> | Dispatch an action which in turn will update the state. Returns the updated state |
| select        | `selector` __?__ The name of the selector                                                                      | Observable<?> | Select parts of the state with the name of a selector. Will update                |
| selectCurrent | `selector` __?__ The name of the selector                                                                      | ?             | Get the current value of a selector                                               |
