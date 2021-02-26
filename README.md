# @crkn-rcdr/nano

[![GitHub CI status](https://github.com/crkn-rcdr/nano/actions/workflows/node.js.yml/badge.svg)](https://github.com/crkn-rcdr/nano)
[![npm version](https://badge.fury.io/js/%40crkn-rcdr%2Fnano.svg)](https://www.npmjs.com/package/@crkn-rcdr/nano)

Boilerplate for invoking [apache/couchdb-nano](https://github.com/apache/couchdb-nano).

## Usage

```js
import * as Nano from "@crkn-rcdr/nano";

const auth = {
  user: "admin",
  password: "password",
};

const remoteNano = Nano.get("http://couch:5984", auth);
const anonymousHttpsNano = Nano.localhost(5984, undefined, "https");
```

## Build

```shell
$ npm run build
```

## Issues

File one on [GitHub](https://github.com/crkn-rcdr/nano/issues).
