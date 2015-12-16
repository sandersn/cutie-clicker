/// <reference path="../external/jquery.d.ts"/>
/// <reference path="../external/schemeNumber.d.ts"/>
// Types for the whole project
interface Map<T> {
	[key: string]: T;
}
type CutieCallback = (cutie: Cutie) => void;
interface CutieArray<T> extends Array<T> {
	write(index: number, options: any): void
}
interface CutieData { // seems redundant
	current: CutieArray<number>;
	list: CutieArray<Cutie>;
	selections: Map<CutieArray<number>>
	write<T>(name: string, value: T): CutieData;
}
interface CutieProto {
	rarity: number;
	targetbp(): string;
	preBurstPause(): number;
	xpDrain(): string;
	tick(now: number): void;
	targetxp(): string;
	burstSuccess(): number;
	burstFailure(): number;
	lv(value: string): string;
	love(value?: SchemeNumber): string;
	targetXpMet(value?: string): SchemeNumber;
	loveup(): void;
	bp(value?: SchemeNumber): string;
	burstPoints(value?: SchemeNumber): string;
	targetBpMet(value?: string): SchemeNumber;
	renderCutieCard(element: string | JQuery, defaultClass: string): void;
	renderCutieClasses(): string;
	index(): number;
	slot(): number;
	selected(name: string): number; 
	select(name: string, mode: boolean): void;
}
// note: the concept of Cutie vs Cuties is pretty blurry here
interface Cutie extends CutieProto {
	(dataIndex: number, callback: CutieCallback): void;
	[cutie: string]: any;
	cutie: string; // this is some kind of id I think
	proto: CutieProto;
	glyph: string; // not sure why this isn't on CutieProto

	selections: () => Map<CutieArray<number>>;
	list: () => CutieArray<Cutie>;
	current: () => CutieArray<number>;
	l(index: number | CutieCallback, callback?: CutieCallback): number;
	m(index?: number | CutieCallback, callback?: CutieCallback): number;
	r(index: number | CutieCallback, callback?: CutieCallback): number;

	clearCutieCard(element: string, defaultClass: string): void;
	/**
	 * for selection, reset is only ever passed as boolean or undefined,
	 * but the code for selection implies that it could be number or array or array of number too
	 * selection('foo') -- sets the selection
	 * selection('foo', true) -- unsets the selection
	 * selection('foo', [12]) -- sets the selection at a specific index? 
	 *   I think? This overload is never used.
	 */
	selection(name: string, reset?: any): CutieArray<number>;
	listTime: number;
	add(cutie: Cutie | string, options?: Cutie): number;
	remove(index: number): boolean;
	construct(data: Cutie): void;
}
interface Loop {
	task(func: (now: number) => void): void;
	tick(func: (now: number) => void): void;
	draw(func: (now: number) => void): void;
	taskInterval: number,
	tickInterval: number,
	drawInterval: number
}
interface Stats {
	xp(value?: string | SchemeNumber): string;
	excitement(value?: string | SchemeNumber): string;
	mp(value?: string | SchemeNumber): string;
	empathy(value?: SchemeNumber): string;

	noxp(): SchemeNumber;
	xpToMp(amount: string): boolean;
	mpcostcalc(baseCost: string, negative?: boolean): string;
	mpcost(baseCost: string, deduct: boolean): boolean;
	resetXpDrain(time?: number): string;
	clicks: {
		(value?: SchemeNumber): string, 
		add(value: number): string
	};
}
interface MenuData extends Rhaboo {
	menu: Menu;
	active: boolean;
	script: string;
	state: MenuState;
}
interface MenuState {
	mode: string;
	lastMode: string;
}
interface MenuEntry {
	(element: JQuery): void;
	stateChanged(state: MenuState): void;
	draw(now: number): void;
	open(open: boolean): void;
}
interface Menu {
	(scriptname?: string, state?: MenuState): void;
	open(open?: boolean, force?: boolean): void;
	state(state?: MenuState): MenuState;
	restate(): void;
	script(newScript: string): void;
	[scriptname: string]: any; //  should be CutieClickerMenuEntry probably
}
interface CutieClicker {
	v: string;
	f: boolean;
	init: Init;
	getScript(url: string, callback?: () => void): JQueryXHR;
	util: Util;
	cuties: Cutie; // this doesn't look right -- it's some kind of augmented Cutie prototype cache
	loop: Loop;
	ls: Rhaboo;
	burstStart: boolean;
	burstReady: boolean | SchemeNumber; // TODO: Fix this
	burstEnd: number;
	stats: Stats;
	menu: Menu;
}
declare var cc: CutieClicker;
interface Init {
	(): void;
	once: boolean;
	addAction<T>(action: string, readableAction: string, runFunction: (remover: Action) => T): T;
	addScript(action: string, readableAction: string, script: string, library?: boolean): void;
}
interface Action extends JQueryPromiseCallback<any> {
	msg: string;
	internalMsg: string;
}
interface Util {
	rhanum(parent: Rhaboo, name: string, value?: string | number | SchemeNumber): string;
	cssrule<T>(selector: string): (name: string | Map<T>, value?: T) => void;
	l(url: string): string;
	getcss(url: string): JQuery;
	transferclicks(element: string): void;
	rhainc(parent: Rhaboo, name: string, inc?: string): void;
}

// Rhaboo
interface Rhaboo extends Map<any> {
	persistent(name: string): Rhaboo;
	write<T>(key: string, value: T): T;
	erase(s: string): void;
	d: any; // seems to need to be a subclass of Rhaboo
	v: number;
}
declare var Rhaboo: Rhaboo;
