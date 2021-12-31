import { Observable } from 'rxjs';

type Index = string | number | symbol;

export abstract class StoreTypeProvider<S> {
  public on<P1 extends keyof S, V extends S[P1]>(part1: P1): Observable<V>;
  public on<P1 extends keyof S, P2 extends keyof S[P1], V extends S[P1][P2]>(part1: P1, part2: P2): Observable<V>;
  public on<P1 extends keyof S, P2 extends keyof S[P1], P3 extends keyof S[P1][P2], V extends S[P1][P2][P3]>(
    part1: P1,
    part2: P2,
    part3: P3,
  ): Observable<V>;
  public on<
    P1 extends keyof S,
    P2 extends keyof S[P1],
    P3 extends keyof S[P1][P2],
    P4 extends keyof S[P1][P2][P3],
    V extends S[P1][P2][P3][P4],
  >(part1: P1, part2: P2, part3: P3, part4: P4): Observable<V>;
  public on<
    P1 extends keyof S,
    P2 extends keyof S[P1],
    P3 extends keyof S[P1][P2],
    P4 extends keyof S[P1][P2][P3],
    P5 extends keyof S[P1][P2][P3][P4],
    V extends S[P1][P2][P3][P4][P5],
  >(part1: P1, part2: P2, part3: P3, part4: P4, part5: P5): Observable<V>;
  public on<
    P1 extends keyof S,
    P2 extends keyof S[P1],
    P3 extends keyof S[P1][P2],
    P4 extends keyof S[P1][P2][P3],
    P5 extends keyof S[P1][P2][P3][P4],
    P6 extends keyof S[P1][P2][P3][P4][P5],
    V extends S[P1][P2][P3][P4][P5][P6],
  >(part1: P1, part2: P2, part3: P3, part4: P4, part5: P5, part6: P6): Observable<V>;
  public on<
    P1 extends keyof S,
    P2 extends keyof S[P1],
    P3 extends keyof S[P1][P2],
    P4 extends keyof S[P1][P2][P3],
    P5 extends keyof S[P1][P2][P3][P4],
    P6 extends keyof S[P1][P2][P3][P4][P5],
    P7 extends keyof S[P1][P2][P3][P4][P5][P6],
    V extends S[P1][P2][P3][P4][P5][P6][P7],
  >(part1: P1, part2: P2, part3: P3, part4: P4, part5: P5, part6: P6, part7: P7): Observable<V>;
  public on<
    P1 extends keyof S,
    P2 extends keyof S[P1],
    P3 extends keyof S[P1][P2],
    P4 extends keyof S[P1][P2][P3],
    P5 extends keyof S[P1][P2][P3][P4],
    P6 extends keyof S[P1][P2][P3][P4][P5],
    P7 extends keyof S[P1][P2][P3][P4][P5][P6],
    P8 extends keyof S[P1][P2][P3][P4][P5][P6][P7],
    V extends S[P1][P2][P3][P4][P5][P6][P7][P8],
  >(part1: P1, part2: P2, part3: P3, part4: P4, part5: P5, part6: P6, part7: P7, part8: P8): Observable<V>;
  public on<
    P1 extends keyof S,
    P2 extends keyof S[P1],
    P3 extends keyof S[P1][P2],
    P4 extends keyof S[P1][P2][P3],
    P5 extends keyof S[P1][P2][P3][P4],
    P6 extends keyof S[P1][P2][P3][P4][P5],
    P7 extends keyof S[P1][P2][P3][P4][P5][P6],
    P8 extends keyof S[P1][P2][P3][P4][P5][P6][P7],
    R extends Index[],
    V extends any,
  >(part1: P1, part2: P2, part3: P3, part4: P4, part5: P5, part6: P6, part7: P7, part8: P8, ...rest: R): Observable<V>;
  public on(...parts: Index[]): Observable<any> {
    return this._on(parts);
  }

  public get<P1 extends keyof S, V extends S[P1]>(part1: P1): V;
  public get<P1 extends keyof S, P2 extends keyof S[P1], V extends S[P1][P2]>(part1: P1, part2: P2): V;
  public get<P1 extends keyof S, P2 extends keyof S[P1], P3 extends keyof S[P1][P2], V extends S[P1][P2][P3]>(
    part1: P1,
    part2: P2,
    part3: P3,
  ): V;
  public get<
    P1 extends keyof S,
    P2 extends keyof S[P1],
    P3 extends keyof S[P1][P2],
    P4 extends keyof S[P1][P2][P3],
    V extends S[P1][P2][P3][P4],
  >(part1: P1, part2: P2, part3: P3, part4: P4): V;
  public get<
    P1 extends keyof S,
    P2 extends keyof S[P1],
    P3 extends keyof S[P1][P2],
    P4 extends keyof S[P1][P2][P3],
    P5 extends keyof S[P1][P2][P3][P4],
    V extends S[P1][P2][P3][P4][P5],
  >(part1: P1, part2: P2, part3: P3, part4: P4, part5: P5): V;
  public get<
    P1 extends keyof S,
    P2 extends keyof S[P1],
    P3 extends keyof S[P1][P2],
    P4 extends keyof S[P1][P2][P3],
    P5 extends keyof S[P1][P2][P3][P4],
    P6 extends keyof S[P1][P2][P3][P4][P5],
    V extends S[P1][P2][P3][P4][P5][P6],
  >(part1: P1, part2: P2, part3: P3, part4: P4, part5: P5, part6: P6): V;
  public get<
    P1 extends keyof S,
    P2 extends keyof S[P1],
    P3 extends keyof S[P1][P2],
    P4 extends keyof S[P1][P2][P3],
    P5 extends keyof S[P1][P2][P3][P4],
    P6 extends keyof S[P1][P2][P3][P4][P5],
    P7 extends keyof S[P1][P2][P3][P4][P5][P6],
    V extends S[P1][P2][P3][P4][P5][P6][P7],
  >(part1: P1, part2: P2, part3: P3, part4: P4, part5: P5, part6: P6, part7: P7): V;
  public get<
    P1 extends keyof S,
    P2 extends keyof S[P1],
    P3 extends keyof S[P1][P2],
    P4 extends keyof S[P1][P2][P3],
    P5 extends keyof S[P1][P2][P3][P4],
    P6 extends keyof S[P1][P2][P3][P4][P5],
    P7 extends keyof S[P1][P2][P3][P4][P5][P6],
    P8 extends keyof S[P1][P2][P3][P4][P5][P6][P7],
    V extends S[P1][P2][P3][P4][P5][P6][P7][P8],
  >(part1: P1, part2: P2, part3: P3, part4: P4, part5: P5, part6: P6, part7: P7, part8: P8): V;
  public get<
    P1 extends keyof S,
    P2 extends keyof S[P1],
    P3 extends keyof S[P1][P2],
    P4 extends keyof S[P1][P2][P3],
    P5 extends keyof S[P1][P2][P3][P4],
    P6 extends keyof S[P1][P2][P3][P4][P5],
    P7 extends keyof S[P1][P2][P3][P4][P5][P6],
    P8 extends keyof S[P1][P2][P3][P4][P5][P6][P7],
    R extends Index[],
    V extends any,
  >(part1: P1, part2: P2, part3: P3, part4: P4, part5: P5, part6: P6, part7: P7, part8: P8, ...rest: R): V;
  public get(...parts: Index[]): any {
    return this._get(parts);
  }

  public patch<P1 extends keyof S, V extends S[P1]>(value: V, part1: P1): void;
  public patch<P1 extends keyof S, P2 extends keyof S[P1], V extends S[P1][P2]>(value: V, part1: P1, part2: P2): void;
  public patch<P1 extends keyof S, P2 extends keyof S[P1], P3 extends keyof S[P1][P2], V extends S[P1][P2][P3]>(
    value: V,
    part1: P1,
    part2: P2,
    part3: P3,
  ): void;
  public patch<
    P1 extends keyof S,
    P2 extends keyof S[P1],
    P3 extends keyof S[P1][P2],
    P4 extends keyof S[P1][P2][P3],
    V extends S[P1][P2][P3][P4],
  >(value: V, part1: P1, part2: P2, part3: P3, part4: P4): void;
  public patch<
    P1 extends keyof S,
    P2 extends keyof S[P1],
    P3 extends keyof S[P1][P2],
    P4 extends keyof S[P1][P2][P3],
    P5 extends keyof S[P1][P2][P3][P4],
    V extends S[P1][P2][P3][P4][P5],
  >(value: V, part1: P1, part2: P2, part3: P3, part4: P4, part5: P5): void;
  public patch<
    P1 extends keyof S,
    P2 extends keyof S[P1],
    P3 extends keyof S[P1][P2],
    P4 extends keyof S[P1][P2][P3],
    P5 extends keyof S[P1][P2][P3][P4],
    P6 extends keyof S[P1][P2][P3][P4][P5],
    V extends keyof S[P1][P2][P3][P4][P5][P6],
  >(value: V, part1: P1, part2: P2, part3: P3, part4: P4, part5: P5, part6: P6): void;
  public patch<
    P1 extends keyof S,
    P2 extends keyof S[P1],
    P3 extends keyof S[P1][P2],
    P4 extends keyof S[P1][P2][P3],
    P5 extends keyof S[P1][P2][P3][P4],
    P6 extends keyof S[P1][P2][P3][P4][P5],
    P7 extends keyof S[P1][P2][P3][P4][P5][P6],
    V extends keyof S[P1][P2][P3][P4][P5][P6][P7],
  >(value: V, part1: P1, part2: P2, part3: P3, part4: P4, part5: P5, part6: P6, part7: P7): void;
  public patch<
    P1 extends keyof S,
    P2 extends keyof S[P1],
    P3 extends keyof S[P1][P2],
    P4 extends keyof S[P1][P2][P3],
    P5 extends keyof S[P1][P2][P3][P4],
    P6 extends keyof S[P1][P2][P3][P4][P5],
    P7 extends keyof S[P1][P2][P3][P4][P5][P6],
    P8 extends keyof S[P1][P2][P3][P4][P5][P6][P7],
    V extends keyof S[P1][P2][P3][P4][P5][P6][P7][P8],
  >(value: V, part1: P1, part2: P2, part3: P3, part4: P4, part5: P5, part6: P6, part7: P7, part8: P8): void;
  public patch<
    P1 extends keyof S,
    P2 extends keyof S[P1],
    P3 extends keyof S[P1][P2],
    P4 extends keyof S[P1][P2][P3],
    P5 extends keyof S[P1][P2][P3][P4],
    P6 extends keyof S[P1][P2][P3][P4][P5],
    P7 extends keyof S[P1][P2][P3][P4][P5][P6],
    P8 extends keyof S[P1][P2][P3][P4][P5][P6][P7],
    R extends Index[],
    V extends any,
  >(value: V, part1: P1, part2: P2, part3: P3, part4: P4, part5: P5, part6: P6, part7: P7, part8: P8, ...rest: R): void;
  public patch(value: any, ...path: Index[]): void {
    this._patch(value, path);
  }

  protected abstract _on(path: Index[]): Observable<any>;

  protected abstract _get(path: Index[]): any;

  protected abstract _patch(value: any, path: Index[]): void;
}
