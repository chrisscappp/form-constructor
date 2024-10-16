declare module "*.scss" {
	interface IClassNames {
		[className: string]: string
	}
	const classNames: IClassNames
	export = classNames
}

declare module "*.svg" {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>
  export default content
}

declare module "*.png"
declare module "*.jpg"
declare module "*.jpeg"

// from webpack

declare const __IS_DEV__: boolean
declare const __API__: string

type DeepPartial<T> = T extends object ? {
    [P in keyof T]?: DeepPartial<T[P]>;
} : T;

declare const $CombinedState: unique symbol
type CombinedState<S> = { readonly [$CombinedState]?: undefined } & S

// custom types

type OptionalRecord<K extends keyof any, T> = {
    [P in K]?: T
}