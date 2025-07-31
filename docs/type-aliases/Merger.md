[**APIs Documentation**](../README.md)

***

# Type Alias: Merger\<T\>

> **Merger**\<`T`\> = `{ [P in keyof T]?: (a: T[P], b: T[P]) => T[P] }`

Defined in: [index.ts:29](https://github.com/daidodo/merge-options/blob/66948b7775e5a512b4c74579757f94a75241911f/src/index.ts#L29)

Merger is a type whose fields are the same as `T`, while the types are functions.
Each function defines how that field is merged between objects of `T`.
If _undefined_, the field will use default rule which is overwritten by the latter.

## Type Parameters

### T

`T` *extends* `object`

## Example

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
