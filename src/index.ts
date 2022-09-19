/* eslint-disable @typescript-eslint/ban-types */

/**
 * Merger is a type whose fields are the same as `T`, while the types are functions.
 * Each function defines how that field is merged between objects of `T`.
 * If _undefined_, the field will use default rule which is overwritten by the latter.

 *
 * @example
 *
 * ```ts
 * interface T {
 *   foo: number;
 *   bar?: string[];
 * }
 *
 * type MT = Merger<T>;
 * ```
 *
 * `MT` is equavelant to:
 *
 * ```ts
 * interface MT {
 *   foo?: (a: number, b: number) => number;
 *   bar?: (a: string[] | undefined, b: string[] | undefined) => (string[] | undefined);
 * }
 * ```
 */
export type Merger<T extends object> = {
  [P in keyof T]?: (a: T[P], b: T[P]) => T[P];
};

/**
 * Merge multiple plain object with custom rules ([Merger](#Merger)).
 *
 * @example
 *
 * ```ts
 * interface T {
 *   foo: number;
 *   bar?: string[];
 * }
 *
 * const obj_1 = mergeOptions(undefined, {foo: 3, bar: ['abc']}, {foo: 4, bar: ['def']});
 * // obj_1 = {foo: 4, bar: ['def']}
 *
 * const merger: Merger<T> = {
 *   bar: (a, b) => [...a, ...b];
 * }
 *
 * const obj_2 = mergeOptions(merger, {foo: 3, bar: ['abc']}, {foo: 4, bar: ['def']});
 * // obj = {foo: 4, bar: ['abc', 'def']}
 * ```
 *
 * Each field in a merger defines how that field is merged between configs. If _undefined_, the
 * field will use the default policy which is replacement by the latter.
 *
 * @param merger - A custom object with merge functions for fields. Or _undefined_ if using all default.
 * @param options - An array of plain objects
 */
export function mergeOptions<T extends object>(merger: Merger<T> | undefined, ...options: T[]) {
  if (options.length < 2) return options?.[0] ?? {};
  const mm = merger ?? ({} as Merger<T>);
  return options.reduce((a, b) => {
    const c = (Object.keys(mm) as (keyof T)[])
      .map(k => {
        const m = mm[k];
        return { [k]: m ? m(a[k], b[k]) : b[k] ?? a[k] };
      })
      .reduce((a, b) => ({ ...a, ...b }), {}) as T;
    return { ...purify(a), ...purify(b), ...purify(c) };
  });
}

function purify<T extends object>(a: T): T {
  let r = {} as T;
  let k: keyof T;
  for (k in a) if (a[k] !== undefined) r = { ...r, [k]: a[k] };
  return r;
}

/**
 * Helper function to define merge functions. It deals with _undefined_ values.
 *
 * @example
 *
 * ```ts
 * interface T {
 *   val?: number;  // val is optional
 * }
 *
 * const merger: Merger<T> = {
 *   val: customize((a, b) => a + b); // You don't need to handle undefined a or b
 * }
 *
 * const t1 = mergeOptions(merger, {val: 1}, {}); // t1 = {val: 1}
 * const t2 = mergeOptions(merger, {}, {val: 2}); // t2 = {val: 2}
 * const t3 = mergeOptions(merger, {val: 1}, {val: 2}); // t3 = {val: 3}
 * ```
 */
export function customize<T>(m: (a: T, b: T) => T) {
  return (a: T | undefined, b: T | undefined) => (a ? (b ? m(a, b) : a) : b);
}

/**
 * Pre-defined merge function for concatenating arrays.
 *
 * @example
 *
 * ```ts
 * interface T {
 *   vals?: number[];
 * }
 *
 * const merger: Merger<T> = {
 *   vals: concatArray();
 * }
 *
 * const t = mergeOptions(merger, {vals: [1]}, {vals: [2, 3]}); // t = {vals: [1, 2, 3]}
 * ```
 */
export function concatArray<T>() {
  return customize<T[]>((a, b) => [...a, ...b]);
}

/**
 * Same as [concatArray](#concatArray) but also handle `T | T[]` fields.
 * @example
 *
 * ```ts
 * interface T {
 *   vals?: number | number[];
 * }
 *
 * const merger: Merger<T> = {
 *   vals: concatArrayEx();
 * }
 *
 * const t = mergeOptions(merger, {vals: 1}, {vals: [2, 3]}); // t = {vals: [1, 2, 3]}
 * ```
 */
export function concatArrayEx<T>() {
  return customize<T | T[]>((a, b) => [
    ...(Array.isArray(a) ? a : [a]),
    ...(Array.isArray(b) ? b : [b]),
  ]);
}
