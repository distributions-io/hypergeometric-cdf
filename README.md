Cumulative Distribution Function
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][codecov-image]][codecov-url] [![Dependencies][dependencies-image]][dependencies-url]

> [Hypergeometric](https://en.wikipedia.org/wiki/hypergeometric_distribution) distribution [cumulative distribution function](https://en.wikipedia.org/wiki/Cumulative_distribution_function).

Imagine a scenario with an urn holding black and white balls. Let `m` be the number of white balls in the urn and `n` be the number of black balls. We draw `k` balls from the urn. Defining the random variable `X` as the number of white balls drawn in total, `X` is said to follow a [hypergeometric distribution](https://en.wikipedia.org/wiki/Hypergeometric_distribution). The [cumulative distribution function](https://en.wikipedia.org/wiki/Cumulative_distribution_function) for a [hypergeometric](https://en.wikipedia.org/wiki/hypergeometric_distribution) random variable is

<div class="equation" align="center" data-raw-text="F(x;m,n,k) =\sum_{i=0}^{\lfloor x \rfloor} \frac{{m \choose i}{n \choose k-i}}{{m+n \choose k}}" data-equation="eq:cdf">
	<img src="https://cdn.rawgit.com/distributions-io/hypergeometric-cdf/6abed696e201c095d709dd40d55f5fce09585ece/docs/img/eqn.svg" alt="Cumulative distribution function for a hypergeometric distribution.">
	<br>
</div>

where `m` is the number of white balls in the urn, `n` is the number of black balls in the urn and `k` is the number of draws.

## Installation

``` bash
$ npm install distributions-hypergeometric-cdf
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var cdf = require( 'distributions-hypergeometric-cdf' );
```

#### cdf( x[, options] )

Evaluates the [cumulative distribution function](https://en.wikipedia.org/wiki/Cumulative_distribution_function) for the [hypergeometric](https://en.wikipedia.org/wiki/hypergeometric_distribution) distribution. `x` may be either a [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), an [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays), or a [`matrix`](https://github.com/dstructs/matrix).

``` javascript
var matrix = require( 'dstructs-matrix' ),
	mat,
	out,
	x,
	i;

out = cdf( 1 );
// returns 1

x = [ -4, -2, 0, 2, 4 ];
out = cdf( x );
// returns [ 0, 0, 0.5, 1, 1 ]

x = new Float32Array( x );
out = cdf( x );
// returns Float64Array( [0,0,0.5,1,1] )

x = new Float32Array( 6 );
for ( i = 0; i < 6; i++ ) {
	x[ i ] = i - 3;
}
mat = matrix( x, [3,2], 'float32' );
/*
	[ -3 -2
	  -1  0
	   1  2 ]
*/

out = cdf( mat );
/*
	[ 0 0
	  0 0.5
	  1 1 ]
*/

```

The function accepts the following `options`:

*	__m__: number of white balls in urn. Default: `1`.
*	__n__: number of black balls in urn. Default: `1`.
*	__k__: number of draws. Default: `1`.
* 	__accessor__: accessor `function` for accessing `array` values.
* 	__dtype__: output [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix) data type. Default: `float64`.
*	__copy__: `boolean` indicating if the `function` should return a new data structure. Default: `true`.
*	__path__: [deepget](https://github.com/kgryte/utils-deep-get)/[deepset](https://github.com/kgryte/utils-deep-set) key path.
*	__sep__: [deepget](https://github.com/kgryte/utils-deep-get)/[deepset](https://github.com/kgryte/utils-deep-set) key path separator. Default: `'.'`.

A [hypergeometric](https://en.wikipedia.org/wiki/hypergeometric_distribution) distribution is a function of 3 parameter(s): `m`(number of white balls in urn) and `n`(number of black balls in urn) and `k`(number of draws). By default, `m` is equal to `1` and `n` is equal to `1` and `k` is equal to `1`. To adjust either parameter, set the corresponding option(s).

``` javascript
var x = [ -4, -2, 0, 2, 4, 8, 10 ];

var out = cdf( x, {
	'm': 20,
	'n': 8,
	'k': 10
});
// returns [ 0, 0, 0, 0, ~0.011, ~0.884, 1 ]

```

For non-numeric `arrays`, provide an accessor `function` for accessing `array` values.

``` javascript
var data = [
	[0,-4],
	[1,-2],
	[2,0],
	[3,2],
	[4,4],
];

function getValue( d, i ) {
	return d[ 1 ];
}

var out = cdf( data, {
	'accessor': getValue
});
// returns [ 0, 0, 0.5, 1, 1 ]

```


To [deepset](https://github.com/kgryte/utils-deep-set) an object `array`, provide a key path and, optionally, a key path separator.

``` javascript
var data = [
	{'x':[0,-4]},
	{'x':[1,-2]},
	{'x':[2,0]},
	{'x':[3,2]},
	{'x':[4,4]},
];

var out = cdf( data, {
	'path': 'x/1',
	'sep': '/'
});
/*
	[
		{'x':[0,0]},
		{'x':[1,0]},
		{'x':[2,0.5]},
		{'x':[3,1]},
		{'x':[4,1]},
	]
*/

var bool = ( data === out );
// returns true
```

By default, when provided a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix), the output data structure is `float64` in order to preserve precision. To specify a different data type, set the `dtype` option (see [`matrix`](https://github.com/dstructs/matrix) for a list of acceptable data types).

``` javascript
var x, out;

x = new Float64Array( [-4,-2,0,2,4] );

out = cdf( x, {
	'dtype': 'float32'
});
// returns Float32Array( [0,0,0.5,1,1] )

// Works for plain arrays, as well...
out = cdf( [-4,-2,0,2,4], {
	'dtype': 'float32'
});
// returns Float32Array( [0,0,0.5,1,1] )

```

By default, the function returns a new data structure. To mutate the input data structure (e.g., when input values can be discarded or when optimizing memory usage), set the `copy` option to `false`.

``` javascript
var bool,
	mat,
	out,
	x,
	i;

x = [ -4, -2, 0, 2, 4 ];

out = cdf( x, {
	'copy': false
});
// returns [ 0, 0, 0.5, 1, 1 ]

bool = ( x === out );
// returns true

x = new Float32Array( 6 );
for ( i = 0; i < 6; i++ ) {
	x[ i ] = i - 3 ;
}
mat = matrix( x, [3,2], 'float32' );
/*
	[ -3 -2
	  -1  0
	   1  2 ]
*/

out = cdf( mat, {
	'copy': false
});
/*
	[ 0 0
	  0 0.5
	  1 1 ]
*/

bool = ( mat === out );
// returns true
```


## Notes

*	If an element is __not__ a numeric value, the evaluated [cumulative distribution function](https://en.wikipedia.org/wiki/Cumulative_distribution_function) is `NaN`.

	``` javascript
	var data, out;

	out = cdf( null );
	// returns NaN

	out = cdf( true );
	// returns NaN

	out = cdf( {'a':'b'} );
	// returns NaN

	out = cdf( [ true, null, [] ] );
	// returns [ NaN, NaN, NaN ]

	function getValue( d, i ) {
		return d.x;
	}
	data = [
		{'x':true},
		{'x':[]},
		{'x':{}},
		{'x':null}
	];

	out = cdf( data, {
		'accessor': getValue
	});
	// returns [ NaN, NaN, NaN, NaN ]

	out = cdf( data, {
		'path': 'x'
	});
	/*
		[
			{'x':NaN},
			{'x':NaN},
			{'x':NaN,
			{'x':NaN}
		]
	*/
	```

## Examples

``` javascript
var cdf = require( 'distributions-hypergeometric-cdf' ),
	matrix = require( 'dstructs-matrix' );

var data,
	mat,
	out,
	tmp,
	i;

// Plain arrays...
data = new Array( 10 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = i - 5;
}
out = cdf( data );

// Object arrays (accessors)...
function getValue( d ) {
	return d.x;
}
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': data[ i ]
	};
}
out = cdf( data, {
	'accessor': getValue
});

// Deep set arrays...
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': [ i, data[ i ].x ]
	};
}
out = cdf( data, {
	'path': 'x/1',
	'sep': '/'
});

// Typed arrays...
data = new Float32Array( 10 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = i - 5;
}
out = cdf( data );

// Matrices...
mat = matrix( data, [5,2], 'float32' );
out = cdf( mat );

// Matrices (custom output data type)...
out = cdf( mat, {
	'dtype': 'uint8'
});
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2015. The [Compute.io](https://github.com/compute-io) Authors.


[npm-image]: http://img.shields.io/npm/v/distributions-hypergeometric-cdf.svg
[npm-url]: https://npmjs.org/package/distributions-hypergeometric-cdf

[travis-image]: http://img.shields.io/travis/distributions-io/hypergeometric-cdf/master.svg
[travis-url]: https://travis-ci.org/distributions-io/hypergeometric-cdf

[codecov-image]: https://img.shields.io/codecov/c/github/distributions-io/hypergeometric-cdf/master.svg
[codecov-url]: https://codecov.io/github/distributions-io/hypergeometric-cdf?branch=master

[dependencies-image]: http://img.shields.io/david/distributions-io/hypergeometric-cdf.svg
[dependencies-url]: https://david-dm.org/distributions-io/hypergeometric-cdf

[dev-dependencies-image]: http://img.shields.io/david/dev/distributions-io/hypergeometric-cdf.svg
[dev-dependencies-url]: https://david-dm.org/dev/distributions-io/hypergeometric-cdf

[github-issues-image]: http://img.shields.io/github/issues/distributions-io/hypergeometric-cdf.svg
[github-issues-url]: https://github.com/distributions-io/hypergeometric-cdf/issues
