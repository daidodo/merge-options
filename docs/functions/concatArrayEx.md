[**APIs Documentation**](../README.md)

***

# Function: concatArrayEx()

> **concatArrayEx**\<`T`\>(): (`a`, `b`) => `undefined` \| `T` \| `T`[]

Defined in: [index.ts:145](https://github.com/daidodo/merge-options/blob/66948b7775e5a512b4c74579757f94a75241911f/src/index.ts#L145)

Same as [concatArray](#concatArray) but also handle `T | T[]` fields.

## Type Parameters

### T

`T`

## Returns

> (`a`, `b`): `undefined` \| `T` \| `T`[]

### Parameters

#### a

`undefined` | `T` | `T`[]

#### b

`undefined` | `T` | `T`[]

### Returns

`undefined` \| `T` \| `T`[]

## Example

```ts
interface T {
  vals?: number | number[];
}

const merger: Merger<T> = {
  vals: concatArrayEx();
}

const t = mergeOptions(merger, {vals: 1}, {vals: [2, 3]}); // t = {vals: [1, 2, 3]}
```
