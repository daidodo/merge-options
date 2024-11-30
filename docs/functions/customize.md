[**APIs Documentation**](../README.md)

***

# Function: customize()

> **customize**\<`T`\>(`m`): (`a`, `b`) => `undefined` \| `T`

Helper function to define merge functions. It deals with _undefined_ values.

## Type Parameters

• **T**

## Parameters

### m

(`a`, `b`) => `T`

## Returns

`Function`

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

## Defined in

[index.ts:106](https://github.com/daidodo/merge-options/blob/2014e172b83fb5388479cb5a3ce60de761994d65/src/index.ts#L106)
