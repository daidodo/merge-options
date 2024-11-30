[**APIs Documentation**](../README.md)

***

# Function: mergeOptions()

> **mergeOptions**\<`T`\>(`merger`, ...`options`): `T`

Merge multiple plain object with custom rules ([Merger](#Merger)).

## Type Parameters

• **T** *extends* `object`

## Parameters

### merger

`undefined` | [`Merger`](../type-aliases/Merger.md)\<`T`\>

### options

...(`undefined` \| `null` \| `T`)[]

An array of plain objects. Any _null_ or _undefined_ elements will be omitted.

## Returns

`T`

## Example

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
// obj_2 = {foo: 4, bar: ['abc', 'def']}
```

Each field in a merger defines how that field is merged between configs. If _undefined_, the
field will use the default policy which is replacement by the latter.

## Defined in

[index.ts:63](https://github.com/daidodo/merge-options/blob/2014e172b83fb5388479cb5a3ce60de761994d65/src/index.ts#L63)
