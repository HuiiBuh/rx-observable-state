import { lastValueFrom } from 'rxjs';
import { Store, StoreContext } from './src';

// Make Intellij shutup
const fetch = async (_: string): Promise<any> => null;

type TodoId = string;

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

// Declare a selector which helps you retrieve more complex state operations
const selector = {
  // Selector-functions can only have one parameter. The parameter with the value of the state
  getDoneTodos: (state: TodoState) => Object.values(state.todo).filter((todo) => todo.done),
  // Selector function with a dependency array
  getSharedDoneTodos: {
    // Selector function gets passed the return values of the dependencies and nothing more
    selector: (doneTodos: Todo[]) => doneTodos.filter((todo) => todo.shared),
    // Depends on the selector functions declared here.
    // Gets called every time the value of the selector function changes
    dependencies: ['getDoneTodos'],
  },
  // Selectors can ba async. The return value in this case would be bool and not PromiseBool, because the promise gets
  // striped away by the state
  asyncSelector: async (state: TodoState) => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return state.allDone;
  },
};

/**
 * If you don't want to modify the state with the patch method directly you can pass dispatchers which can abstract the
 * logic away.
 * Dispatchers and Selectors can be Classes, or simple objects (see selector)
 */
class Dispatcher {
  // A dispatcher function has the StoreContext as fist parameter, followed by whatever parameters you require
  // If the StoreContext is not the first parameter the method will not be recogniced as a dispatcher function
  public async fetchTodosFromAPI(s: StoreContext<TodoState>): Promise<void> {
    const user = s.state.username;
    const result: Record<TodoId, Todo> = await fetch(`some-api-url${user}`).then((r) => r.json());
    s.patch(result, 'todo');
  }

  public async fetchTodo(s: StoreContext<TodoState>, todoId: TodoId): Promise<void> {
    const result: Todo = await fetch(`some-api-url${todoId}`).then((r) => r.json());
    s.patch(result, 'todo', result.id);
  }

  // If you want to get access to the selectors you have to pass the type of the selector to the StoreContext
  public async tellApiIfEveryTodoIsDone(s: StoreContext<TodoState, typeof selector>): Promise<void> {
    const isDone = s.selectCurrent('getDoneTodos').length > 0;
    if (isDone) {
      await fetch('some-api-url');
    }
    s.patch(true, 'allDone');
  }

  // If you want to access the dispatcher functions you have to pass the Dispatcher itself.
  // This is only possible if the dispatcher is a class
  public async setUser(s: StoreContext<TodoState, typeof selector, Dispatcher>, username: string): Promise<void> {
    s.patch(username, 'username');
    await lastValueFrom(s.dispatch('fetchTodosFromAPI'));
  }
}

// Create a new store
const store = new Store<
  // Pass the state
  TodoState,
  // The type of the dispatcher
  Dispatcher,
  // And the type of the selector
  typeof selector
>(
  // The initial state
  { todo: {}, selectedTodo: null, username: null, allDone: false },
  // Pass some options to the state (optional)
  {
    // The dispatcher (optional)
    dispatcher: new Dispatcher(),
    // The selector (optional)
    selector,
    // Default is a shallow comparison === to make sure the same result is not dispatched multiple times
    // If you want to deep equal the object pass true (optional)
    deepEqual: true,
  },
);

store.select('asyncSelector').subscribe((value) => {
  console.log(value);
});

store.select('getDoneTodos').subscribe((value) => {
  console.log(value);
});

const newState = lastValueFrom(store.dispatch('fetchTodosFromAPI'));
store.on('todo', 'some-id').subscribe(console.log);
