/** Types for the whole project */
interface CutieClicker {
	v: string,
	f: any,
	init: any,
	getScript: any,
	util: any
}
interface ActionRemover {
	(): void,
	msg?: any,
	internalMsg?: any
}
declare var cc: any; // TODO: Make it of type CutieClicker after I fix all the errors in init.ts
declare interface SchemeNumber {
	(value: string | number): SchemeNumber
	toFixed(n: number): number
	fn: any; // TODO: Fill in the bundled mathematical functions
}
declare var SchemeNumber: SchemeNumber;

declare var Rhaboo: any; // TODO: Real type
