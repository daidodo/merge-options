[**APIs Documentation**](../README.md)

***

# Function: concatArray()

> **concatArray**\<`T`\>(): (`a`, `b`) => `undefined` \| `T`[]

Pre-defined merge function for concatenating arrays.

## Type Parameters

• **T**

## Returns

`Function`

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

## Defined in

[index.ts:127](https://github.com/daidodo/merge-options/blob/2014e172b83fb5388479cb5a3ce60de761994d65/src/index.ts#L127)
