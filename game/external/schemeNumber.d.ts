// Type definitions for schemeNumber.js
// Project: https://github.com/jtobey/javascript-bignum
// Documentation: http://john-edwin-tobey.org/Scheme/javascript-bignum/docs/files/schemeNumber-js.html
// Definitions by: Nathan Shively-Sanders <nathansa@microsoft.com>, 
// Definitions: https://github.com/borisyankov/DefinitelyTyped
type SchemeOperator = (...args: (string | SchemeNumber | number)[]) => SchemeNumber;
declare var VERSION: number[];
declare function raise(conditionType: string, message: string, ...irritants: any[]): void;
declare var maxIntegerDigits: number;
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
	toString(radix: number);
	toFixed(fractionDigits: number): string;
	toExponential(fractionDigits: number): string;
	toPrecision(precision: number): string;
	add(n: number): void;
	fn: SchemeFn;
}
declare var SchemeNumber: SchemeNumber;
