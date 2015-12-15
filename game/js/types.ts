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
	selections: Map<CutieArray<number>>
}
interface CutieProto {
	tick: any;
	love: any;
	burstPoints: any;
	targetxp: any;
	targetbp: any;
	lv: any;
	bp: any;
	loveup: any;
	targetBpMet: any;
	targetXpMet: any;
	xpDrain(): string;
	preBurstPause: any;
	burstSuccess: any;
	burstFailure: any;
	rarity: any;
	renderCutieCard(element: string, defaultClass: string): void;
	renderCutieClasses: any;
	index(): number;
	slot: any;
	selected(name: string): number; 
	select(name: string, mode: boolean): void;
}
// note: the concept of Cutie vs Cuties is pretty blurry here
interface Cutie extends CutieProto {
	(dataIndex: number, callback: CutieCallback): void;
	cutie: string; // this is some kind of id I think
	proto: CutieProto;
	glyph: string; // not sure why this isn't on CutieProto

	selections: () => Map<CutieArray<number>>;
	list: () => CutieArray<Cutie>;
	current: () => CutieArray<number>;
	l(index: number | CutieCallback, callback?: CutieCallback): number;
	m(index: number | CutieCallback, callback?: CutieCallback): number;
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
	selection(name: string, reset?: any): number[];
	listTime: number;
	add(cutie: Cutie, options?: Cutie): number;
	remove(index: number): boolean;
	construct(data: Cutie): void;
}
interface CutieClickerLoop {
	task(func: Function): void;
	tick(func: Function): void;
	draw(func: Function): void;
	taskInterval: number,
	tickInterval: number,
	drawInterval: number
}
interface CutieClickerStats {
	xp(value?: string | SchemeNumber): string;
	excitement(value?: string | SchemeNumber): string;
	mp(value?: string | SchemeNumber): string;
	empathy(value?: SchemeNumber): string;

	noxp(): SchemeNumber;
	xpToMp(amount: string): boolean;
	mpcostcalc(baseCost: string, negative?: boolean): string;
	mpcost(baseCost: string, deduct: boolean): boolean;resetXpDrain(time?: number): string;
	clicks: {
		(value?: SchemeNumber): string, 
		add(value: number): string
	};
}
interface CutieClickerMenuData extends Rhaboo {
	menu: CutieClickerMenu;
	active: boolean;
	script: string;
	state: CutieClickerMenuState;
}
interface CutieClickerMenuState {
}
interface CutieClickerMenu {
	(scriptname?: string, state?: CutieClickerMenuState): void;
	open(open?: boolean, force?: boolean): void;
	state(state: CutieClickerMenuState): CutieClickerMenuState;
	restate(): void;
	script(newScript: string): void;
	// [scriptname: string]: CutieClickerMenu;  NOPE. Not gonna work.
}
interface CutieClicker {
	v: string;
	f: boolean;
	init: CutieClickerInit;
	getScript(url: string, callback?: () => void): JQueryXHR;
	util: Util;
	cuties: Cutie; // this doesn't look right -- it's some kind of augmented Cutie prototype cache
	loop: CutieClickerLoop;
	ls: Rhaboo;
	burstStart: boolean;
	burstReady: boolean;
	burstEnd: number;
	stats: CutieClickerStats;
	menu: CutieClickerMenu;
}
declare var cc: CutieClicker;
interface CutieClickerInit {
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
type SchemeOperator = (...args: (string | SchemeNumber | number)[]) => SchemeNumber;
interface SchemeFn extends Map<SchemeOperator> {
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

interface Rhaboo {
	persistent(name: string): Rhaboo;
	write<T>(key: string, value: T): T;
	erase(s: string): void;
	d: any; // seems to need to be a subclass of Rhaboo
	v: number;
}
declare var Rhaboo: Rhaboo;
