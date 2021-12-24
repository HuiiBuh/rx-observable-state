import { StoreConstructorOptions } from './store';

export type Constructor<CLASS, GENERIC_STATE> = new (
  state: GENERIC_STATE,
  options: StoreConstructorOptions
) => CLASS;
