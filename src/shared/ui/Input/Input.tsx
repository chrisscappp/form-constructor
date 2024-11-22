import { classNames, Mods } from "shared/lib/classNames/classNames"
import { ChangeEvent, CSSProperties, InputHTMLAttributes, memo, useEffect, useRef, useState } from "react"
import cls from "./Input.module.scss"

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value" | "readOnly" | "onBlur">

interface InputProps extends HTMLInputProps {
	className?: string,
	value?: string | number,
	placeholder?: string,
	type?: string,
	onChange?: (value: string) => void,
	onBlur?: (e: any) => void,
	readonly?: boolean,
	autoFocus?: boolean
}

export const Input = memo((props: InputProps) => {

	const { 
		className,
		value,
		placeholder,
		autoFocus,
		type,
		onChange,
		onBlur,
		readonly,
		...otherProps
	} = props

	const [styles, setStyles] = useState<CSSProperties>()
	const ref = useRef<HTMLInputElement>(null)

	useEffect(() => {
		if (autoFocus) {
			ref.current?.focus()
		}
	}, [autoFocus])

	const mods: Mods = {
		[cls.readonly]: readonly
	}

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		onChange?.(e.target.value)
	}

	const onFocus = () => {
		setStyles({
		 	border: "2px solid var(--input-focus-border)"
		})
	}

	const onBlurDefault = (e: any) => {
		setStyles({})
		onBlur?.(e)
	}

	return (
		<input 
			ref = {ref}
			className = {classNames(cls.Input, mods, [className])}
			style = {styles}
			value = {value}
			placeholder = {placeholder || "Текст"}
			onChange = {onChangeHandler}
			readOnly = {readonly}
			type = {type || "text"}
			onBlur = {onBlurDefault}
			onFocus = {onFocus}
			{...otherProps}
		></input>
	)
})