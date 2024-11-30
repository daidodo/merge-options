[**APIs Documentation**](../README.md)

***

# Type Alias: Merger\<T\>

> **Merger**\<`T`\>: `{ [P in keyof T]?: (a: T[P], b: T[P]) => T[P] }`

Merger is a type whose fields are the same as `T`, while the types are functions.
Each function defines how that field is merged between objects of `T`.
If _undefined_, the field will use default rule which is overwritten by the latter.

## Type Parameters

• **T** *extends* `object`

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

## Defined in

[index.ts:31](https://github.com/daidodo/merge-options/blob/2014e172b83fb5388479cb5a3ce60de761994d65/src/index.ts#L31)
