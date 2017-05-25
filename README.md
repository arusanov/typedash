# lodash in TypeScript

[![NPM version](https://img.shields.io/npm/v/typedash.svg)](https://www.npmjs.com/package/typedash)
[![Build Status](https://travis-ci.org/arusanov/typedash.svg?branch=master)](https://travis-ci.org/arusanov/typedash)
[![Coverage Status](https://coveralls.io/repos/github/arusanov/typedash/badge.svg?branch=master)](https://coveralls.io/github/arusanov/typedash?branch=master)
[![Greenkeeper badge](https://badges.greenkeeper.io/arusanov/typedash.svg)](https://greenkeeper.io/)
[![gzip size](http://img.badgesize.io/https://unpkg.com/typedash/dist/typedash.min.js?compression=gzip)](https://unpkg.com/typedash/dist/typedash.min.js)

Minimal (and naive) implementation subset of lodash functions in typescript.
Implemented only most commonly used function in a very simple way. 
No excessive checks are made ([trust the compiler](https://slack.engineering/typescript-at-slack-a81307fa288d)),
most edge cases (like unicode codepoints) are ignored.
Can be used with [tree shaking bundlers](https://webpack.js.org/guides/tree-shaking/) like rollup/webpack.

### Installation

Using npm:

```bash
$ npm i typedash
```

### Usage

From TypeScript/es6 (using webpack2 or rollup)

```typescript
import {noop} from 'typedash'

noop()
```

From nodejs

```js
const {noop} = require('typedash')

noop()

```

[Full documentation](https://arusanov.github.io/typedash/) 

