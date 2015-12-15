/// <reference path="../external/jquery.d.ts"/>
// Types for the whole project
interface Map<T> {
	[key: string]: T;
}
type CutieCallback = (cutie: Cutie) => void
interface CutieArray<T> extends Array<T> {
	write(index: number, options: any): void
}
interface CutieData { // seems redundant
	current: CutieArray<number>;
	list: CutieArray<Cutie>;
	write<T>(name: string, value: T): CutieData;
	selections: {[s: string]: CutieArray<Cutie>}
}
interface Cutie {
	(dataIndex: number, callback: CutieCallback): void;
	cutie: string; // this is some kind of id I think
	l(index: number | CutieCallback, callback?: CutieCallback): number;
	m(index: number | CutieCallback, callback?: CutieCallback): number;
	r(index: number | CutieCallback, callback?: CutieCallback): number;
	clearCutieCard: any;
	proto: any;
	selection(name: string, reset?: any): any;
	selections: () => {[s: string]: CutieArray<Cutie>};
	listTime: number;
	list: () => CutieArray<any>;
	add(cutie: Cutie, options?: any): number;
	remove: any;
	construct: any;

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
interface CutieClicker {
	v: string;
	f: boolean;
	init: CutieClickerInit;
	getScript(url: string, callback?: () => void): JQueryXHR;
	util: Util;
	cuties: Cutie;
	loop: any;
	ls: Rhaboo;
	burstStart: any;
	burstReady: any;
	burstEnd: any;
	stats: any;
	menu: any;
}
declare var cc: CutieClicker;
interface CutieClickerInit {
	(): void;
	once: boolean;
	addAction<T>(action: string, readableAction: string, runFunction: (remover: ActionRemover) => T): T;
	addScript(action: string, readableAction: string, script: string, library?: boolean): void;
}
interface ActionRemover {
	(): void,
	msg?: any,
	internalMsg?: any
}
interface Util {
	rhanum(parent: Rhaboo, name: string, value?: string | number): string;
	cssrule<T>(selector: string): (name: string | Map<T>, value?: T) => void;
	l(url: string): string;
	getcss(url: string): JQuery;
	transferclicks(element: string): void;
	rhainc(parent: Rhaboo, name: string, inc?: string): void;
}
declare interface SchemeNumber {
	(value: string | number): SchemeNumber
	toFixed(n: number): number
	fn: any; // TODO: Fill in the bundled mathematical functions
}
declare var SchemeNumber: SchemeNumber;

interface Rhaboo {
	persistent(name: string): Rhaboo;
	write<T>(key: string, value: T): T;
	d: any; // seems to need to be a subclass of Rhaboo
	v: number;
	erase(s: string): void;
}
declare var Rhaboo: any; // TODO: Real type
