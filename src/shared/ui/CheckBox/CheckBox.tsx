import { classNames } from "shared/lib/classNames/classNames"
import cls from "./CheckBox.module.scss"
import { Text, TextSize } from "../Text/Text"
import { memo } from "react"

export interface CheckboxItem {
	id: number,
	content: string;
	value: string;
}

interface CheckboxProps {
	className?: string,
	onChange?: (value: string) => void,
	items?: CheckboxItem[],
	activeItems?: CheckboxItem[],
	name: string,
	readonly?: boolean
}

export const Checkbox = memo((props: CheckboxProps) => {

	const {
		className,
		items,
		onChange,
		name,
		activeItems,
		readonly = true
	} = props

	return (
		<div className = {classNames(cls.CheckboxWrap, {}, [className])}>
			{items?.map((item) => {
				const checked = activeItems?.find((i) => i.id === item.id)
				return (
					<div 
						className = {classNames(cls.wrap, {}, [])}
						key = {item.value}
						onClick = {() => onChange?.(item.value)}
					>
						<input 
							className = {cls.checkbox} 
							name = {name} 
							type = "checkbox" 
							value = {item.value}
							checked = {checked ? true : false}
							disabled = {readonly}
						/>
						<Text 
							text = {item.content} 
							className = {cls.checkboxText}
							size={TextSize.ML}
						/>
					</div>
				)
			})}
		</div>
	)
})