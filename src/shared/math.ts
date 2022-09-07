import { curry } from "ramda";

export const percentage = curry((of: number, n: number) => of * (n / 100));
