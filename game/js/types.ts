/** Types for the whole project */
interface CutieClicker {
	v: string,
	f: any,
	init: any,
	getScript: any,
	util: any,
	cuties: any,
	loop: any,
	ls: any,
	burstStart: any,
	burstReady: any,
	burstEnd: any,
	stats: any,
	menu: any
}
interface ActionRemover {
	(): void,
	msg?: any,
	internalMsg?: any
}
declare var cc: CutieClicker;
declare interface SchemeNumber {
	(value: string | number): SchemeNumber
	toFixed(n: number): number
	fn: any; // TODO: Fill in the bundled mathematical functions
}
declare var SchemeNumber: SchemeNumber;

declare var Rhaboo: any; // TODO: Real type
