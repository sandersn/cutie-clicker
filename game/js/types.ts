/** Types for the whole project */
interface CutieClickerInit {
	(): void, 
	once: boolean,
	addAction<T>(action: string, readableAction: string, runFunction: (remover: ActionRemover) => T): T,
	addScript(action: string, readableAction: string, script: string, library?: boolean): void
}
interface Util {
	rhanum(parent: Rhaboo, name: string, value?: string | number): string,
	cssrule: any,
	l: (url: string) => string,
	getcss: any,
	transferclicks: any,
	rhainc: any,
}
interface CutieClicker {
	v: string,
	f: boolean,
	init: CutieClickerInit,
	getScript(url: string, callback?: () => void): JQueryXHR,
	util: Util,
	cuties: any,
	loop: any,
	ls: any,
	burstStart: any,
	burstReady: any,
	burstEnd: any,
	stats: any,
	menu: any
}
interface ActionRemover { // TODO: Should probably just push this down to where it's used.
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

interface Rhaboo {
	persistent(name: string): Rhaboo;
	write(key: string, value: any): void;
}
declare var Rhaboo: any; // TODO: Real type
