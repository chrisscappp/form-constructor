import React, { ChangeEvent, CSSProperties, memo, TextareaHTMLAttributes, useMemo } from "react"
import cls from "./Textarea.module.scss"
import { classNames, Mods } from "shared/lib/classNames/classNames"

type TextAreaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange" | "value" | "readOnly">

interface AreaProps extends TextAreaProps {
	className?: string,
	value?: string,
	placeholder?: string,
	type?: string,
	onChange?: (value: string) => void,
	readonly?: boolean,
	autoFocus?: boolean,
	height?: number;
	width?: number;
}

export const TextArea = memo((props: AreaProps) => {
	
	const {
		className,
		value,
		readonly,
		onChange,
		placeholder,
		autoFocus,
		height,
		width,
		...otherProps
	} = props

	const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
		onChange?.(e.target.value)
	}

	const styles = useMemo<CSSProperties>(() => {
		return {
			height: height || 140,
			width: width || "100%"
		}
	}, [height, width])

	const mods: Mods = {
		[cls.readonly]: readonly
	}
	
	return (
		<textarea 
			{...otherProps}
			className = {classNames(cls.TextArea, mods, [className])}
			value = {value}
			onChange = {onChangeHandler}
			readOnly = {readonly}
			placeholder = {placeholder || "Текст"}
			autoFocus = {autoFocus}
			style = {styles}
		></textarea>
	)
})