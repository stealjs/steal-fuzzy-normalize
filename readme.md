# steal-fuzzy-normalize

[![Build Status](https://travis-ci.org/stealjs/steal-fuzzy-normalize.svg?branch=master)](https://travis-ci.org/stealjs/steal-fuzzy-normalize)
[![npm version](https://badge.fury.io/js/steal-fuzzy-normalize.svg)](http://badge.fury.io/js/steal-fuzzy-normalize)

**steal-fuzzy-normalize** is a module that tries its hardest to normalize a module identifier given the normal steal rules. It's imperfect, but if you give it a list of possible matches it might just work.

## Install

```
npm install steal-fuzzy-normalize --save
```

## Examples

Getting a match from an array.

```js
var normalize = require("steal-fuzzy-normalize");

var possibilities = [
	"app@1.0.0#home/home",
	"app@1.0.0#orders/orders",
	"app@1.0.0#cart/cart"
];

var match = normalize("orders/", possibilities);

assert.equal(match, "app@1.0.0#orders/orders"); // Works
```

Getting a match from an object. This allows you to get metadata for a particular match (useful for bundle manifests).

```js
var normalize = require("steal-fuzzy-normalize");

var possibilities = {
	"app@1.0.0#home/home": {page:"home"},
	"app@1.0.0#orders/orders": {page:"orders"},
	"app@1.0.0#cart/cart": {page:"cart"}
};

var match = normalize("orders/", possibilities);

assert.equal(match.page, "orders"); // Works
```
