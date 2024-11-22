import { classNames, Mods } from "shared/lib/classNames/classNames"
import { ButtonHTMLAttributes, ReactNode, memo } from "react"
import cls from "./Button.module.scss"

export enum ButtonTheme {
	CLEAR = "clear",
	CLEAR_INVERTED = "clearInverted",
	APPROVE = "approve",
	ERROR = "error",
	OUTLINE = "outline",
	OUTLINE_INVERTED = "outlineInverted",
	BACKGROUND = "background",
	BACKGROUND_INVERTED = "backgroundInverted",
	BACKGROUND_INVERTED_TEXT = "backgroundInvertedText",
}

export enum ButtonSize {
	S = "size_s",
	M = "size_m",
	ML = "size_ml",
	L = "size_l",
	XL = "size_xl"
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
	theme?: ButtonTheme;
	square?: boolean;
	size?: ButtonSize;
	disabled?: boolean;
	hoveredTheme?: ButtonTheme;
	hovered?: boolean;
	children?: ReactNode;
}

export const Button = memo((props: ButtonProps) => {

	const { 
		className, 
		theme = ButtonTheme.BACKGROUND,
		children, 
		square,
		disabled,
		hoveredTheme,
		hovered,
		size = ButtonSize.M,
		...otherProps
	} = props

	const mods: Mods = {
		[cls[theme]]: true,
		[cls.square]: square,
		[cls[size]]: true,
		[cls.disabled]: disabled,
		[cls.hovered]: hovered
	}

	return (
		<button 
			className = {classNames(cls.Button, mods, [className])}
			disabled = {disabled}
			{...otherProps}
		>
			{children}
		</button>
	)
})