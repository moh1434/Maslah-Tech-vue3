type GlobalSvgAttributesI = Record<
	'focusable' | 'data-prefix' | 'role' | 'xmlns',
	string
> & { 'aria-hidden': boolean };
type GlobalPathAttributesI = {
	fill?: string;
};
export type svgI = {
	svgAttributes: {
		'data-icon': string;
		viewBox: string;
	} & { [k in string]: string };
	pathAttributes: { d: string } & { [k in string]: string };
};
// export type socialIconsI<T extends svgI> = {
//   GlobalSvgAttributes: GlobalSvgAttributesI;
//   GlobalPathAttributes: GlobalPathAttributesI;
//   icons: T[];
// };
