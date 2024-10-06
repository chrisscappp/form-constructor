import { classNames } from "shared/lib/classNames/classNames"
import cls from "./Radio.module.scss"
import { Text, TextSize } from "../Text/Text"
import { memo } from "react"

export interface RadioItem {
	id: number,
	content: string;
	value: string;
}

interface RadioProps {
	className?: string,
	onChange?: (value: string) => void,
	items?: RadioItem[],
	activeItem?: RadioItem,
	name: string,
	readonly?: boolean,
	editable?: boolean
}

export const Radio = memo((props: RadioProps) => {

	const {
		className,
		items,
		onChange,
		name,
		activeItem,
		readonly = true,
		editable = false
	} = props

	return (
		<div className = {classNames(cls.InputRadio, {}, [className])}>
			{items?.map((item) => {
				return (
					<div 
						className = {classNames(cls.wrap, {}, [])}
						key = {item.value}
						onClick = {() => onChange?.(item.value)}
					>
						<input 
							className = {cls.radio} 
							name = {name} 
							type = "radio" 
							value = {item.value}
							checked = {item.id === activeItem?.id}
							disabled = {readonly}
						/>
						<Text 
							text = {item.content} 
							className = {cls.radioText}
							size={TextSize.ML}
						/>
					</div>
				)
			})}
		</div>
	)
})