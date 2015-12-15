// Type definitions for schemeNumber.js
// Project: https://github.com/jtobey/javascript-bignum
// Documentation: http://john-edwin-tobey.org/Scheme/javascript-bignum/docs/files/schemeNumber-js.html
// Definitions by: Nathan Shively-Sanders <nathansa@microsoft.com>, 
// Definitions: https://github.com/borisyankov/DefinitelyTyped
// SchemeNumber
type SchemeOperator = (...args: (string | SchemeNumber | number)[]) => SchemeNumber;
declare interface SchemeFn {
	[fnname: string]: SchemeOperator;
	floor: SchemeOperator;
	ceiling: SchemeOperator;
	round: SchemeOperator;
	max: SchemeOperator;
	min: SchemeOperator;
}
declare interface SchemeNumber {
	(value: string | number): SchemeNumber;
	toFixed(n: number): number;
	add(n: number): void;
	fn: SchemeFn;
}
declare var SchemeNumber: SchemeNumber;
