# Merge Options

<!--
First publish:

```sh
npm publish --access public
```
-->

[![npm](https://img.shields.io/npm/v/@dozerg/merge-options.svg)](https://www.npmjs.com/package/@dozerg/merge-options)
![Downloads](https://img.shields.io/npm/dm/@dozerg/merge-options.svg)
[![Build Status](https://github.com/daidodo/merge-options/actions/workflows/node.js.yml/badge.svg)](https://github.com/daidodo/merge-options/actions)

Merge plain objects with customised rules.

# Install

```sh
npm i @dozerg/merge-options
```

# Usage

```ts
import { mergeOptions, Merger, concatArray } from '@dozerg/merge-options';

interface T {
  foo: number;
  bar?: string[];
}

const obj_1 = mergeOptions(undefined, {foo: 3, bar: ['abc']}, {foo: 4, bar: ['def']});
// obj_1 = {foo: 4, bar: ['def']}

const merger: Merger<T> = {
  bar: concatArray();
}

const obj_2 = mergeOptions(merger, {foo: 3, bar: ['abc']}, {foo: 4, bar: ['def']});
// obj_2 = {foo: 4, bar: ['abc', 'def']}
```

# APIs

- [mergeOptions](docs/README.md#mergeoptions)
- [Merger](docs/README.md#merger)
- [concatArray](docs/README.md#concatarray)
- [concatArrayEx](docs/README.md#concatarrayex)
- [customize](docs/README.md#customize)

# License

MIT © Zhao DAI <daidodo@gmail.com>
