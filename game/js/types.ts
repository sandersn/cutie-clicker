/// <reference path="../external/jquery.d.ts"/>
// Types for the whole project
interface CutieClickerInit {
	(): void;
	once: boolean;
	addAction<T>(action: string, readableAction: string, runFunction: (remover: ActionRemover) => T): T;
	addScript(action: string, readableAction: string, script: string, library?: boolean): void;
}
type CutieCallback = (cutie: Cutie) => void
interface Cutie {
	(dataIndex: number, callback: CutieCallback): void;
	l(index: number | CutieCallback, callback?: CutieCallback): any;
	m(index: number | CutieCallback, callback?: CutieCallback): any;
	r(index: number | CutieCallback, callback?: CutieCallback): any;
	clearCutieCard: any;
	proto: any;
	selection: any;
	selections: any;
	listTime: number;
	list: any;
	add: any;
	remove: any;
	construct: any;
	cutie: any;

	tick: any;
	love: any;
	burstPoints: any;
	targetxp: any;
	targetBpMet: any;
	targetXpMet: any;
	xpDrain: any;
	preBurstPause: any;
	burstSuccess: any;
	burstFailure: any;
	glyph: any;
	rarity: any;
}
interface Map<T> {
	[key: string]: T;
}
interface Util {
	rhanum(parent: Rhaboo, name: string, value?: string | number): string;
	cssrule<T>(selector: string): (name: string | Map<T>, value?: T) => void;
	l(url: string): string;
	getcss(url: string): JQuery;
	transferclicks(element: string): void;
	rhainc(parent: Rhaboo, name: string, inc?: string): void;
}
interface CutieClicker {
	v: string;
	f: boolean;
	init: CutieClickerInit;
	getScript(url: string, callback?: () => void): JQueryXHR;
	util: Util;
	cuties: Cutie;
	loop: any;
	ls: any;
	burstStart: any;
	burstReady: any;
	burstEnd: any;
	stats: any;
	menu: any;
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
