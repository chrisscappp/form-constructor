import { ReactNode } from "react"
import { classNames, Mods } from "shared/lib/classNames/classNames"
import cls from "./Flex.module.scss"

export type FlexAlignItems = "center" | "start" | "end"
export type FlexJustyfyContent = "between" | "around" | "evenly" | "start" | "center" | "end"
export type FlexDirection = "row" | "column"
export type FlexGap = "4" | "8" | "12" | "16" | "20"

const alignClasses: Record<FlexAlignItems, string> = {
	center: cls.flexAlignCenter,
	end: cls.flexAlignEnd,
	start: cls.flexAlignStart
}

const justifyClasses: Record<FlexJustyfyContent, string> = {
	around: cls.flexJustifyAround,
	between: cls.flexJustifyBetween,
	center: cls.flexJustifyCenter,
	end: cls.flexJustifyEnd,
	evenly: cls.flexJustifyEvenly,
	start: cls.flexJustifyStart
}

const directionClasses: Record<FlexDirection, string> = {
	column: cls.flexDirectionColumn,
	row: cls.flexDirectionRow
}

const gapClasses: Record<FlexGap, string> = {
	"4": cls.gap4,
	"8": cls.gap8,
	"12": cls.gap12,
	"16": cls.gap16,
	"20": cls.gap20
}

export interface FlexProps {
	className?: string,
	children: ReactNode,
	align?: FlexAlignItems,
	justify?: FlexJustyfyContent,
	direction?: FlexDirection,
	gap?: FlexGap,
	max?: boolean
}

export const Flex = (props: FlexProps) => {
	
	const {
		children,
		className,
		align = "center",
		direction = "column",
		justify = "center",
		gap,
		max
	} = props

	const mods: Mods = {
		[cls.max]: max
	}

	const classes = [
		className,
		alignClasses[align],
		justifyClasses[justify],
		directionClasses[direction],
		gap && gapClasses[gap],
	]
	
	return (
		<div className={classNames(cls.Flex, mods, classes)}>
			{children}
		</div>
	)
}