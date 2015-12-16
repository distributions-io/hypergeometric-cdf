'use strict';

// MODULES //

var hyperPMF = require( 'distributions-hypergeometric-pmf/lib/number.js' ),
	isnan = require( 'validate.io-nan' ),
	sum = require( 'compute-sum' );


// FUNCTIONS //

var max = Math.max,
	min = Math.min,
	trunc = Math.trunc;


// CDF //

/**
* FUNCTION: cdf( x, m, n, k )
*	Evaluates the cumulative distribution function (CDF) for a hypergeometric distribution with number of white balls in urn `m` and number of black balls in urn `n` and number of draws `k` at a value `x`.
*
* @param {Number} x - input value
* @param {Number} m - number of white balls in urn
* @param {Number} n - number of black balls in urn
* @param {Number} k - number of draws
* @returns {Number} evaluated CDF
*/
function cdf( x, m, n, k ) {
	var probs,
		num, denom,
		i,
		ret;

	if ( isnan( x ) ) {
		return NaN;
	}
	x = trunc( x );
	if ( x < max( 0, k - n ) ) {
		return 0;
	}
	if ( x > min( k, m ) ) {
		return 1;
	}

	probs = new Array( x + 1 );
	probs[ x ] = hyperPMF( x, m, n, k );
	// Use recurrence relation:
	// (x+1)( n -(k-x-1))P(X=x+1)=(m-x)(k-x)P(X=x)
	for ( i = x - 1; i >= 0; i-- ) {
		num = ( i + 1 ) * ( n - (k-i-1) );
		denom = ( m - i ) * ( k - i );
		probs[ i ] =  ( num / denom ) * probs[ i + 1 ];
	}
	ret = sum( probs );
	return ret;
} // end FUNCTION cdf()


// EXPORTS //

module.exports = cdf;
