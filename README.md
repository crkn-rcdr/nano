# @crkn-rcdr/nano

Boilerplate for invoking [apache/couchdb-nano](https://github.com/apache/couchdb-nano).

## Usage

```js
import Nano from "@crkn-rcdr/nano";

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
