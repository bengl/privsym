# privsym

Create private, unenumerable symbols in Node.js

## Usage

```js
const PrivateSymbol = require('privsym');

const mySym = PrivateSymbol('mySym');

const obj = {
  [mySym]: 'foo'
};

// etc.
```

## License

The MIT License. See LICENSE.txt
