[**APIs Documentation**](../README.md)

***

# Function: concatArrayEx()

> **concatArrayEx**\<`T`\>(): (`a`, `b`) => `undefined` \| `T` \| `T`[]

Same as [concatArray](#concatArray) but also handle `T | T[]` fields.

## Type Parameters

• **T**

## Returns

`Function`

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

## Defined in

[index.ts:147](https://github.com/daidodo/merge-options/blob/2014e172b83fb5388479cb5a3ce60de761994d65/src/index.ts#L147)
