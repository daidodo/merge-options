[**APIs Documentation**](../README.md)

***

# Function: concatArray()

> **concatArray**\<`T`\>(): (`a`, `b`) => `undefined` \| `T`[]

Defined in: [index.ts:125](https://github.com/daidodo/merge-options/blob/66948b7775e5a512b4c74579757f94a75241911f/src/index.ts#L125)

Pre-defined merge function for concatenating arrays.

## Type Parameters

### T

`T`

## Returns

> (`a`, `b`): `undefined` \| `T`[]

### Parameters

#### a

`undefined` | `T`[]

#### b

`undefined` | `T`[]

### Returns

`undefined` \| `T`[]

## Example

```ts
interface T {
  vals?: number[];
}

const merger: Merger<T> = {
  vals: concatArray();
}

const t = mergeOptions(merger, {vals: [1]}, {vals: [2, 3]}); // t = {vals: [1, 2, 3]}
```
