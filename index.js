'use strict';

function makeExports () {
  // eslint-disable-next-line no-new-func
  module.exports = new Function('name', 'return %CreatePrivateSymbol(name)');
}

try {
  makeExports();
} catch (e) {
  const v8 = require('v8');
  v8.setFlagsFromString('--allow-natives-syntax');
  makeExports();
  v8.setFlagsFromString('--no-allow-natives-syntax');
}
