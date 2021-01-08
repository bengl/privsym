const test = require('pitesti')();
const assert = require('assert');

let PrivateSymbol;

test`require`(() => {
  PrivateSymbol = require('.');
});

test.context`symbol`(() => {
  let sym;
  const obj = {};

  test`is created and set`(() => {
    sym = PrivateSymbol('foo');
    obj[sym] = 'bar';
    assert.strictEqual(obj[sym], 'bar');
  });

  test`is "in" obj`(() => {
    assert.ok(sym in obj);
  });

  test`is not enumerably "in" obj`(() => {
    for (const key in obj) {
      assert.notStrictEqual(key, sym);
    }
  });

  test`is not enumerably "of" obj`(() => {
    for (const value in obj) {
      assert.notStrictEqual(value, 'bar');
    }
  });

  test`is not in Object.keys`(() => {
    assert.ok(!Object.keys(obj).includes(sym));
  });

  test`is not in Object.values`(() => {
    assert.ok(!Object.values(obj).includes('bar'));
  });

  test`is not in Object.entries`(() => {
    assert.ok(!Object.entries(obj).map(x => x[0]).includes(sym));
  });

  test`is not in Object.getOwnPropertyNames`(() => {
    assert.ok(!Object.getOwnPropertyNames(obj).includes(sym));
  });

  test`is not in Object.getOwnPropertySymbols`(() => {
    assert.ok(!Object.getOwnPropertySymbols(obj).includes(sym));
  });

  test`is not in Object.getOwnPropertySymbols`(() => {
    assert.ok(!Object.keys(Object.getOwnPropertyDescriptors(obj)).includes(sym));
  });

  test`is not in Reflect.ownKeys`(() => {
    assert.ok(!Reflect.ownKeys(obj).includes(sym));
  });
});

test`does not alter v8 flag`(() => {
  function testEval () {
    // eslint-disable-next-line no-eval
    eval('%CreatePrivateSymbol()');
  }
  if (process.argv[2] === 'flag') {
    assert.doesNotThrow(testEval);
  } else {
    assert.throws(testEval);
  }
});

test();
