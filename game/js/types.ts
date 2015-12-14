/** Types for the whole project */
declare var cc: any; // TODO: Give a real type.
declare interface SchemeNumber {
	(value: string | number): SchemeNumber
	toFixed(n: number): number
	fn: any; // TODO: Fill in the bundled mathematical functions
}
declare var SchemeNumber: SchemeNumber;

declare var Rhaboo: any; // TODO: Real type
