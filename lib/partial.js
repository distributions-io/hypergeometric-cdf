'use strict';

// FUNCTIONS //


// PARTIAL //

/**
* FUNCTION: partial( m, n, k )
*	Partially applies number of white balls in urn `m` and number of black balls in urn `n` and number of draws `k` and returns a function for evaluating the cumulative distribution function (CDF) for a hypergeometric distribution.
*
* @param {Number} m - number of white balls in urn
* @param {Number} n - number of black balls in urn
* @param {Number} k - number of draws
* @returns {Function} CDF
*/
function partial( m, n, k ) {

	/**
	* FUNCTION: cdf( x )
	*	Evaluates the cumulative distribution function (CDF) for a hypergeometric distribution.
	*
	* @private
	* @param {Number} x - input value
	* @returns {Number} evaluated CDF
	*/
	return function cdf( x ) {

	};
} // end FUNCTION partial()


// EXPORTS //

module.exports = partial;
