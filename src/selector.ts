export type Selector<S extends object> = (context?: S) => any;
export type DependableSelector<S extends object> = {
  selector: (...args: any[]) => any;
  dependencies: string[];
};

export const isSelector = (f: Selector<any> | DependableSelector<any>): f is Selector<any> => typeof f === 'function';

export type ISelector<S extends object> = Record<string, DependableSelector<S> | Selector<S>>;
