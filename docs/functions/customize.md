[**APIs Documentation**](../README.md)

***

# Function: customize()

> **customize**\<`T`\>(`m`): (`a`, `b`) => `undefined` \| `T`

Defined in: [index.ts:104](https://github.com/daidodo/merge-options/blob/66948b7775e5a512b4c74579757f94a75241911f/src/index.ts#L104)

Helper function to define merge functions. It deals with _undefined_ values.

## Type Parameters

### T

`T`

## Parameters

### m

(`a`, `b`) => `T`

## Returns

> (`a`, `b`): `undefined` \| `T`

### Parameters

#### a

`undefined` | `T`

#### b

`undefined` | `T`

### Returns

`undefined` \| `T`

## Example

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
