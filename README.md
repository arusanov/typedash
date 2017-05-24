# TypeScript minimal lodash

[![NPM version](https://img.shields.io/npm/v/typedash.svg)](https://www.npmjs.com/package/typedash)
[![Build Status](https://travis-ci.org/arusanov/typedash.svg?branch=master)](https://travis-ci.org/arusanov/typedash)
[![Coverage Status](https://coveralls.io/repos/github/arusanov/typedash/badge.svg?branch=master)](https://coveralls.io/github/arusanov/typedash?branch=master)
[![Greenkeeper badge](https://badges.greenkeeper.io/arusanov/typedash.svg)](https://greenkeeper.io/)

Minimal (and naive) implementation subset of lodash functions in typescript

### Installation

Using npm:

```bash
$ npm i typedash
```

### Usage

From TypeScript (using webpack2 or rollup)

```typescript
import {noop} from 'typedash'

noop()
```

From nodejs

```js
const {noop} = require('typedash')

noop()

```

### Contributing

Commit all changes for PR using

```bash
$ npm run commit
```
