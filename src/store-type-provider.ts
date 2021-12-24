import { Observable } from 'rxjs';
import { Object, Tuple } from 'ts-toolbelt';
// tslint:disable:max-line-length

type Index = string | number | symbol;

export abstract class StoreTypeProvider<S> {
  public on<P1 extends keyof Object.Path<S, []>>(part1: P1): Observable<Object.Path<S, [P1]>>;

  public on<P1 extends keyof Object.Path<S, []>,
    P2 extends keyof Object.Path<S, [P1]>>(part1: P1, part2: P2): Observable<Object.Path<S, [P1, P2]>>;

  public on<P1 extends keyof Object.Path<S, []>,
    P2 extends keyof Object.Path<S, [P1]>,
    P3 extends keyof Object.Path<S, [P1, P2]>>(part1: P1, part2: P2, part3: P3): Observable<Object.Path<S, [P1, P2, P3]>>;

  public on<P1 extends keyof Object.Path<S, []>,
    P2 extends keyof Object.Path<S, [P1]>,
    P3 extends keyof Object.Path<S, [P1, P2]>,
    P4 extends keyof Object.Path<S, [P1, P2, P3]>>(part1: P1, part2: P2, part3: P3, part4: P4): Observable<Object.Path<S, [P1, P2, P3, P4]>>;

  public on<P1 extends keyof Object.Path<S, []>,
    P2 extends keyof Object.Path<S, [P1]>,
    P3 extends keyof Object.Path<S, [P1, P2]>,
    P4 extends keyof Object.Path<S, [P1, P2, P3]>,
    P5 extends keyof Object.Path<S, [P1, P2, P3, P4]>>(part1: P1, part2: P2, part3: P3, part4: P4, part5: P5): Observable<Object.Path<S, [P1, P2, P3, P4, P5]>>;

  public on<P1 extends keyof Object.Path<S, []>,
    P2 extends keyof Object.Path<S, [P1]>,
    P3 extends keyof Object.Path<S, [P1, P2]>,
    P4 extends keyof Object.Path<S, [P1, P2, P3]>,
    P5 extends keyof Object.Path<S, [P1, P2, P3, P4]>,
    P6 extends keyof Object.Path<S, [P1, P2, P3, P4, P5]>>(part1: P1, part2: P2, part3: P3, part4: P4, part5: P5, part6: P6): Observable<Object.Path<S, [P1, P2, P3, P4, P5, P6]>>;

  public on<P1 extends keyof Object.Path<S, []>,
    P2 extends keyof Object.Path<S, [P1]>,
    P3 extends keyof Object.Path<S, [P1, P2]>,
    P4 extends keyof Object.Path<S, [P1, P2, P3]>,
    P5 extends keyof Object.Path<S, [P1, P2, P3, P4]>,
    P6 extends keyof Object.Path<S, [P1, P2, P3, P4, P5]>,
    P7 extends keyof Object.Path<S, [P1, P2, P3, P4, P5, P6]>>(part1: P1, part2: P2, part3: P3, part4: P4, part5: P5, part6: P6, part7: P7): Observable<Object.Path<S, [P1, P2, P3, P4, P5, P6, P7]>>;

  public on<P1 extends keyof Object.Path<S, []>,
    P2 extends keyof Object.Path<S, [P1]>,
    P3 extends keyof Object.Path<S, [P1, P2]>,
    P4 extends keyof Object.Path<S, [P1, P2, P3]>,
    P5 extends keyof Object.Path<S, [P1, P2, P3, P4]>,
    P6 extends keyof Object.Path<S, [P1, P2, P3, P4, P5]>,
    P7 extends keyof Object.Path<S, [P1, P2, P3, P4, P5, P6]>,
    P8 extends keyof Object.Path<S, [P1, P2, P3, P4, P5, P6, P7]>>(part1: P1, part2: P2, part3: P3, part4: P4, part5: P5, part6: P6, part7: P7, part8: P8): Observable<Object.Path<S, [P1, P2, P3, P4, P5, P6, P7, P8]>>;

  public on<P1 extends keyof Object.Path<S, []>,
    P2 extends keyof Object.Path<S, [P1]>,
    P3 extends keyof Object.Path<S, [P1, P2]>,
    P4 extends keyof Object.Path<S, [P1, P2, P3]>,
    P5 extends keyof Object.Path<S, [P1, P2, P3, P4]>,
    P6 extends keyof Object.Path<S, [P1, P2, P3, P4, P5]>,
    P7 extends keyof Object.Path<S, [P1, P2, P3, P4, P5, P6]>,
    P8 extends keyof Object.Path<S, [P1, P2, P3, P4, P5, P6, P7]>,
    P9 extends keyof Object.Path<S, [P1, P2, P3, P4, P5, P6, P7, P8]>>(part1: P1, part2: P2, part3: P3, part4: P4, part5: P5, part6: P6, part7: P7, part8: P8, part9: P9): Observable<Object.Path<S, [P1, P2, P3, P4, P5, P6, P7, P8, P9]>>;

  public on<P1 extends keyof Object.Path<S, []>,
    P2 extends keyof Object.Path<S, [P1]>,
    P3 extends keyof Object.Path<S, [P1, P2]>,
    P4 extends keyof Object.Path<S, [P1, P2, P3]>,
    P5 extends keyof Object.Path<S, [P1, P2, P3, P4]>,
    P6 extends keyof Object.Path<S, [P1, P2, P3, P4, P5]>,
    P7 extends keyof Object.Path<S, [P1, P2, P3, P4, P5, P6]>,
    P8 extends keyof Object.Path<S, [P1, P2, P3, P4, P5, P6, P7]>,
    P9 extends keyof Object.Path<S, [P1, P2, P3, P4, P5, P6, P7, P8]>,
    R extends Index[]>(part1: P1, part2: P2, part3: P3, part4: P4, part5: P5, part6: P6, part7: P7, part8: P8, part9: P9, ...rest: R): Observable<Object.Path<S, Tuple.Concat<[P1, P2, P3, P4, P5, P6, P7, P8, P9], R>>>;
  public on(...parts: Index[]): Observable<any> {
    return this._on(parts);
  }

  protected abstract _on(path: Index[]): Observable<any>;

  public get<P1 extends keyof Object.Path<S, []>>(part1: P1): Object.Path<S, [P1]>;

  public get<P1 extends keyof Object.Path<S, []>,
    P2 extends keyof Object.Path<S, [P1]>>(part1: P1, part2: P2): Object.Path<S, [P1, P2]>;

  public get<P1 extends keyof Object.Path<S, []>,
    P2 extends keyof Object.Path<S, [P1]>,
    P3 extends keyof Object.Path<S, [P1, P2]>>(part1: P1, part2: P2, part3: P3): Object.Path<S, [P1, P2, P3]>;

  public get<P1 extends keyof Object.Path<S, []>,
    P2 extends keyof Object.Path<S, [P1]>,
    P3 extends keyof Object.Path<S, [P1, P2]>,
    P4 extends keyof Object.Path<S, [P1, P2, P3]>>(part1: P1, part2: P2, part3: P3, part4: P4): Object.Path<S, [P1, P2, P3, P4]>;

  public get<P1 extends keyof Object.Path<S, []>,
    P2 extends keyof Object.Path<S, [P1]>,
    P3 extends keyof Object.Path<S, [P1, P2]>,
    P4 extends keyof Object.Path<S, [P1, P2, P3]>,
    P5 extends keyof Object.Path<S, [P1, P2, P3, P4]>>(part1: P1, part2: P2, part3: P3, part4: P4, part5: P5): Object.Path<S, [P1, P2, P3, P4, P5]>;

  public get<P1 extends keyof Object.Path<S, []>,
    P2 extends keyof Object.Path<S, [P1]>,
    P3 extends keyof Object.Path<S, [P1, P2]>,
    P4 extends keyof Object.Path<S, [P1, P2, P3]>,
    P5 extends keyof Object.Path<S, [P1, P2, P3, P4]>,
    P6 extends keyof Object.Path<S, [P1, P2, P3, P4, P5]>>(part1: P1, part2: P2, part3: P3, part4: P4, part5: P5, part6: P6): Object.Path<S, [P1, P2, P3, P4, P5, P6]>;

  public get<P1 extends keyof Object.Path<S, []>,
    P2 extends keyof Object.Path<S, [P1]>,
    P3 extends keyof Object.Path<S, [P1, P2]>,
    P4 extends keyof Object.Path<S, [P1, P2, P3]>,
    P5 extends keyof Object.Path<S, [P1, P2, P3, P4]>,
    P6 extends keyof Object.Path<S, [P1, P2, P3, P4, P5]>,
    P7 extends keyof Object.Path<S, [P1, P2, P3, P4, P5, P6]>>(part1: P1, part2: P2, part3: P3, part4: P4, part5: P5, part6: P6, part7: P7): Object.Path<S, [P1, P2, P3, P4, P5, P6, P7]>;

  public get<P1 extends keyof Object.Path<S, []>,
    P2 extends keyof Object.Path<S, [P1]>,
    P3 extends keyof Object.Path<S, [P1, P2]>,
    P4 extends keyof Object.Path<S, [P1, P2, P3]>,
    P5 extends keyof Object.Path<S, [P1, P2, P3, P4]>,
    P6 extends keyof Object.Path<S, [P1, P2, P3, P4, P5]>,
    P7 extends keyof Object.Path<S, [P1, P2, P3, P4, P5, P6]>,
    P8 extends keyof Object.Path<S, [P1, P2, P3, P4, P5, P6, P7]>>(part1: P1, part2: P2, part3: P3, part4: P4, part5: P5, part6: P6, part7: P7, part8: P8): Object.Path<S, [P1, P2, P3, P4, P5, P6, P7, P8]>;

  public get<P1 extends keyof Object.Path<S, []>,
    P2 extends keyof Object.Path<S, [P1]>,
    P3 extends keyof Object.Path<S, [P1, P2]>,
    P4 extends keyof Object.Path<S, [P1, P2, P3]>,
    P5 extends keyof Object.Path<S, [P1, P2, P3, P4]>,
    P6 extends keyof Object.Path<S, [P1, P2, P3, P4, P5]>,
    P7 extends keyof Object.Path<S, [P1, P2, P3, P4, P5, P6]>,
    P8 extends keyof Object.Path<S, [P1, P2, P3, P4, P5, P6, P7]>,
    P9 extends keyof Object.Path<S, [P1, P2, P3, P4, P5, P6, P7, P8]>>(part1: P1, part2: P2, part3: P3, part4: P4, part5: P5, part6: P6, part7: P7, part8: P8, part9: P9): Object.Path<S, [P1, P2, P3, P4, P5, P6, P7, P8, P9]>;

  public get<P1 extends keyof Object.Path<S, []>,
    P2 extends keyof Object.Path<S, [P1]>,
    P3 extends keyof Object.Path<S, [P1, P2]>,
    P4 extends keyof Object.Path<S, [P1, P2, P3]>,
    P5 extends keyof Object.Path<S, [P1, P2, P3, P4]>,
    P6 extends keyof Object.Path<S, [P1, P2, P3, P4, P5]>,
    P7 extends keyof Object.Path<S, [P1, P2, P3, P4, P5, P6]>,
    P8 extends keyof Object.Path<S, [P1, P2, P3, P4, P5, P6, P7]>,
    P9 extends keyof Object.Path<S, [P1, P2, P3, P4, P5, P6, P7, P8]>,
    R extends Index[]>(part1: P1, part2: P2, part3: P3, part4: P4, part5: P5, part6: P6, part7: P7, part8: P8, part9: P9, ...rest: R): Object.Path<S, Tuple.Concat<[P1, P2, P3, P4, P5, P6, P7, P8, P9], R>>;
  public get(...parts: Index[]): any {
    return this._get(parts);
  }

  protected abstract _get(path: Index[]): any;

  public patch<P1 extends keyof Object.Path<S, []>>(value: Object.Path<S, [P1]>, part1: P1): void;

  public patch<P1 extends keyof Object.Path<S, []>,
    P2 extends keyof Object.Path<S, [P1]>>(value: Object.Path<S, [P1, P2]>, part1: P1, part2: P2): void;

  public patch<P1 extends keyof Object.Path<S, []>,
    P2 extends keyof Object.Path<S, [P1]>,
    P3 extends keyof Object.Path<S, [P1, P2]>>(value: Object.Path<S, [P1, P2, P3]>, part1: P1, part2: P2, part3: P3): void;

  public patch<P1 extends keyof Object.Path<S, []>,
    P2 extends keyof Object.Path<S, [P1]>,
    P3 extends keyof Object.Path<S, [P1, P2]>,
    P4 extends keyof Object.Path<S, [P1, P2, P3]>>(value: Object.Path<S, [P1, P2, P3, P4]>, part1: P1, part2: P2, part3: P3, part4: P4): void;

  public patch<P1 extends keyof Object.Path<S, []>,
    P2 extends keyof Object.Path<S, [P1]>,
    P3 extends keyof Object.Path<S, [P1, P2]>,
    P4 extends keyof Object.Path<S, [P1, P2, P3]>,
    P5 extends keyof Object.Path<S, [P1, P2, P3, P4]>>(value: Object.Path<S, [P1, P2, P3, P4, P5]>, part1: P1, part2: P2, part3: P3, part4: P4, part5: P5): void;

  public patch<P1 extends keyof Object.Path<S, []>,
    P2 extends keyof Object.Path<S, [P1]>,
    P3 extends keyof Object.Path<S, [P1, P2]>,
    P4 extends keyof Object.Path<S, [P1, P2, P3]>,
    P5 extends keyof Object.Path<S, [P1, P2, P3, P4]>,
    P6 extends keyof Object.Path<S, [P1, P2, P3, P4, P5]>>(value: Object.Path<S, [P1, P2, P3, P4, P5, P6]>, part1: P1, part2: P2, part3: P3, part4: P4, part5: P5, part6: P6): void;

  public patch<P1 extends keyof Object.Path<S, []>,
    P2 extends keyof Object.Path<S, [P1]>,
    P3 extends keyof Object.Path<S, [P1, P2]>,
    P4 extends keyof Object.Path<S, [P1, P2, P3]>,
    P5 extends keyof Object.Path<S, [P1, P2, P3, P4]>,
    P6 extends keyof Object.Path<S, [P1, P2, P3, P4, P5]>,
    P7 extends keyof Object.Path<S, [P1, P2, P3, P4, P5, P6]>>(value: Object.Path<S, [P1, P2, P3, P4, P5, P6, P7]>, part1: P1, part2: P2, part3: P3, part4: P4, part5: P5, part6: P6, part7: P7): void;

  public patch<P1 extends keyof Object.Path<S, []>,
    P2 extends keyof Object.Path<S, [P1]>,
    P3 extends keyof Object.Path<S, [P1, P2]>,
    P4 extends keyof Object.Path<S, [P1, P2, P3]>,
    P5 extends keyof Object.Path<S, [P1, P2, P3, P4]>,
    P6 extends keyof Object.Path<S, [P1, P2, P3, P4, P5]>,
    P7 extends keyof Object.Path<S, [P1, P2, P3, P4, P5, P6]>,
    P8 extends keyof Object.Path<S, [P1, P2, P3, P4, P5, P6, P7]>>(value: Object.Path<S, [P1, P2, P3, P4, P5, P6, P7, P8]>, part1: P1, part2: P2, part3: P3, part4: P4, part5: P5, part6: P6, part7: P7, part8: P8): void;

  public patch<P1 extends keyof Object.Path<S, []>,
    P2 extends keyof Object.Path<S, [P1]>,
    P3 extends keyof Object.Path<S, [P1, P2]>,
    P4 extends keyof Object.Path<S, [P1, P2, P3]>,
    P5 extends keyof Object.Path<S, [P1, P2, P3, P4]>,
    P6 extends keyof Object.Path<S, [P1, P2, P3, P4, P5]>,
    P7 extends keyof Object.Path<S, [P1, P2, P3, P4, P5, P6]>,
    P8 extends keyof Object.Path<S, [P1, P2, P3, P4, P5, P6, P7]>,
    P9 extends keyof Object.Path<S, [P1, P2, P3, P4, P5, P6, P7, P8]>>(value: Object.Path<S, [P1, P2, P3, P4, P5, P6, P7, P8, P9]>, part1: P1, part2: P2, part3: P3, part4: P4, part5: P5, part6: P6, part7: P7, part8: P8, part9: P9): void;

  public patch<P1 extends keyof Object.Path<S, []>,
    P2 extends keyof Object.Path<S, [P1]>,
    P3 extends keyof Object.Path<S, [P1, P2]>,
    P4 extends keyof Object.Path<S, [P1, P2, P3]>,
    P5 extends keyof Object.Path<S, [P1, P2, P3, P4]>,
    P6 extends keyof Object.Path<S, [P1, P2, P3, P4, P5]>,
    P7 extends keyof Object.Path<S, [P1, P2, P3, P4, P5, P6]>,
    P8 extends keyof Object.Path<S, [P1, P2, P3, P4, P5, P6, P7]>,
    P9 extends keyof Object.Path<S, [P1, P2, P3, P4, P5, P6, P7, P8]>,
    R extends Index[]>(value: Object.Path<S, Tuple.Concat<[P1, P2, P3, P4, P5, P6, P7, P8, P9], R>>, part1: P1, part2: P2, part3: P3, part4: P4, part5: P5, part6: P6, part7: P7, part8: P8, part9: P9, ...rest: R): void;

  public patch(value: any, ...path: Index[]): void {
    this._patch(value, path);
  }

  protected abstract _patch(value: any, path: Index[]): void;
}
