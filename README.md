# Merge Options

<!--
First publish:

```sh
npm publish --access public
```
-->

[![npm](https://img.shields.io/npm/v/@dozerg/merge-options.svg)](https://www.npmjs.com/package/@dozerg/merge-options)
![Downloads](https://img.shields.io/npm/dm/@dozerg/merge-options.svg)
[![Build Status](https://github.com/daidodo/merge-options/actions/workflows/node.js.yml/badge.svg)](https://github.com/daidodo/merge-options/actions)

Merge plain objects with customised rules.

# Install

```sh
npm i @dozerg/merge-options
```

# Usage

```ts
import { mergeOptionsWithMerger, Merger } from '@dozerg/merge-options';

interface T {
  foo: number;
  bar: string[];
}

const merger: Merger<T> = {
  bar: (a, b) => [...a, ...b];
}

const obj = mergeOptionsWithMerger(merger, {foo: 3, bar: ['abc']}, {foo: 4, bar: ['def']});
// obj = {foo: 4, bar: ['abc', 'def']}
```

# APIs Documentation

## Type Aliases

### Merger

Ƭ **Merger**<`T`\>: { [P in keyof T]?: Function }

Merger is a type whose fields are the same as `T`, while the types are functions.
Each function defines how that field is merged between objects of `T`.
If _undefined_, the field will use default rule which is overwritten by the latter.

**`Example`**

```ts
interface T {
  foo: number;
  bar?: string[];
}

type MT = Merger<T>;
```

`MT` is equavelant to:

```ts
interface MT {
  foo?: (a: number, b: number) => number;
  bar?: (a: string[] | undefined, b: string[] | undefined) => (string[] | undefined);
}
```

#### Type parameters

| Name | Type             |
| :--- | :--------------- |
| `T`  | extends `object` |

#### Defined in

[index.ts:29](https://github.com/daidodo/merge-options/blob/3a9f96f/src/index.ts#L29)

## Functions

### concatArray

▸ **concatArray**<`T`\>(): (`a`: `undefined` \| `T`[], `b`: `undefined` \| `T`[]) => `undefined` \| `T`[]

Pre-defined merge function for concatenating arrays.

**`Example`**

```ts
interface T {
  vals?: number[];
}

const merger: Merger<T> = {
  vals: concatArray();
}

const t = mergeOptions(merger, {vals: [1]}, {vals: [2, 3]}); // t = {vals: [1, 2, 3]}
```

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Returns

`fn`

▸ (`a`, `b`): `undefined` \| `T`[]

##### Parameters

| Name | Type                 |
| :--- | :------------------- |
| `a`  | `undefined` \| `T`[] |
| `b`  | `undefined` \| `T`[] |

##### Returns

`undefined` \| `T`[]

#### Defined in

[index.ts:122](https://github.com/daidodo/merge-options/blob/3a9f96f/src/index.ts#L122)

---

### concatArrayEx

▸ **concatArrayEx**<`T`\>(): (`a`: `undefined` \| `T` \| `T`[], `b`: `undefined` \| `T` \| `T`[]) => `undefined` \| `T` \| `T`[]

Same as [concatArray](#concatArray) but also handle `T | T[]` fields.

**`Example`**

```ts
interface T {
  vals?: number | number[];
}

const merger: Merger<T> = {
  vals: concatArrayEx();
}

const t = mergeOptions(merger, {vals: 1}, {vals: [2, 3]}); // t = {vals: [1, 2, 3]}
```

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Returns

`fn`

▸ (`a`, `b`): `undefined` \| `T` \| `T`[]

##### Parameters

| Name | Type                        |
| :--- | :-------------------------- |
| `a`  | `undefined` \| `T` \| `T`[] |
| `b`  | `undefined` \| `T` \| `T`[] |

##### Returns

`undefined` \| `T` \| `T`[]

#### Defined in

[index.ts:142](https://github.com/daidodo/merge-options/blob/3a9f96f/src/index.ts#L142)

---

### customize

▸ **customize**<`T`\>(`m`): (`a`: `undefined` \| `T`, `b`: `undefined` \| `T`) => `undefined` \| `T`

Helper function to define merge functions. It deals with _undefined_ values.

**`Example`**

```ts
interface T {
  val?: number;  // val is optional
}

const merger: Merger<T> = {
  val: customize((a, b) => a + b); // You don't need to handle undefined a or b
}

const t1 = mergeOptions(merger, {val: 1}, {}); // t1 = {val: 1}
const t2 = mergeOptions(merger, {}, {val: 2}); // t2 = {val: 2}
const t3 = mergeOptions(merger, {val: 1}, {val: 2}); // t3 = {val: 3}
```

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name | Type                        |
| :--- | :-------------------------- |
| `m`  | (`a`: `T`, `b`: `T`) => `T` |

#### Returns

`fn`

▸ (`a`, `b`): `undefined` \| `T`

##### Parameters

| Name | Type               |
| :--- | :----------------- |
| `a`  | `undefined` \| `T` |
| `b`  | `undefined` \| `T` |

##### Returns

`undefined` \| `T`

#### Defined in

[index.ts:101](https://github.com/daidodo/merge-options/blob/3a9f96f/src/index.ts#L101)

---

### mergeOptions

▸ **mergeOptions**<`T`\>(`merger`, ...`options`): `T`

Merge multiple plain object with custom rules ([Merger](#Merger)).

**`Example`**

```ts
interface T {
  foo: number;
  bar?: string[];
}

const obj_1 = mergeOptions(undefined, {foo: 3, bar: ['abc']}, {foo: 4, bar: ['def']});
// obj_1 = {foo: 4, bar: ['def']}

const merger: Merger<T> = {
  bar: (a, b) => [...a, ...b];
}

const obj_2 = mergeOptions(merger, {foo: 3, bar: ['abc']}, {foo: 4, bar: ['def']});
// obj = {foo: 4, bar: ['abc', 'def']}
```

Each field in a merger defines how that field is merged between configs. If _undefined_, the
field will use the default policy which is replacement by the latter.

#### Type parameters

| Name | Type             |
| :--- | :--------------- |
| `T`  | extends `object` |

#### Parameters

| Name         | Type                                              | Description                                                                           |
| :----------- | :------------------------------------------------ | :------------------------------------------------------------------------------------ |
| `merger`     | `undefined` \| [`Merger`](README.md#merger)<`T`\> | A custom object with merge functions for fields. Or _undefined_ if using all default. |
| `...options` | `T`[]                                             | An array of plain objects                                                             |

#### Returns

`T`

#### Defined in

[index.ts:61](https://github.com/daidodo/merge-options/blob/3a9f96f/src/index.ts#L61)

# License

MIT © Zhao DAI <daidodo@gmail.com>
