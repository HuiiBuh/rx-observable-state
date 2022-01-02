export type KeysOfType<T extends object, V> = { [K in keyof T]: T[K] extends V ? K : never }[keyof T];

export type Index = string | number | symbol;
