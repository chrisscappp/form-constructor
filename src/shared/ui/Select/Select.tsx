import { classNames, Mods } from "shared/lib/classNames/classNames"
import cls from "./Select.module.scss"
import { ChangeEvent, memo, useMemo }  from "react"

export interface SelectOption {
	value: any,
	content: string
}

interface SelectProps {
	className?: string,
	label?: string,
	options?: SelectOption[],
	value?: string,
	onChange?: (value: any) => void,
	readonly?: boolean
}

export const Select = memo((props: SelectProps) => {

	const { 
		className, 
		label, 
		options,
		onChange,
		value,
		readonly
	} = props

	const mods: Mods = {}

	const optionList = useMemo(() => {
		return options?.map((item) => {
			return (
				<option
					key = {item.value}
					value = {item.value}
					className = {cls.option}
				>
					{item.content}
				</option>
			)
		})
	}, [options])

	const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
		onChange?.(e.target.value)
	}

	return (
		<div className = {classNames(cls.SelectWrapper, mods, [className])}>
			{
				label &&
				(<span className = {cls.label}>
					{label}
				</span>)
			}
			<select
				className = {cls.select}
				value = {value}
				onChange = {onChangeHandler}
				disabled = {readonly}
			>
				{optionList}
			</select>
		</div>
	)
})