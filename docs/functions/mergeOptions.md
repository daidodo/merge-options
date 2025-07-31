[**APIs Documentation**](../README.md)

***

# Function: mergeOptions()

> **mergeOptions**\<`T`\>(`merger`, ...`options`): `T`

Defined in: [index.ts:61](https://github.com/daidodo/merge-options/blob/66948b7775e5a512b4c74579757f94a75241911f/src/index.ts#L61)

Merge multiple plain object with custom rules ([Merger](#Merger)).

## Type Parameters

### T

`T` *extends* `object`

## Parameters

### merger

A custom object with merge functions for fields. Or _undefined_ if using all default.

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
