import { Fragment, memo, ReactNode, useState } from "react"
import { classNames } from "shared/lib/classNames/classNames"
import cls from "./Listbox.module.scss"
import { Listbox as HListbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react"
import { Button, ButtonTheme } from "../Button/Button"
import ArrowDownUpIcon from "shared/assets/icons/arrow-down-up.svg"

export interface ListboxItem {
	value: string,
	content: ReactNode,
	disabled?: boolean
}

type ListDirection = "top" | "bottom"

interface ListboxProps {
	items: ListboxItem[],
	value?: string,
	defaultValue?: string,
	onChange: <T extends string>(value: T) => void,
	readonly?: boolean,
	className?: string,
	direction?: ListDirection
}

const mapDirectionClasses: Record<ListDirection, string> = {
	bottom: cls.optionsBottom,
	top: cls.optionsTop
}

export function Listbox(props: ListboxProps) {
	
	const {
		onChange,
		defaultValue,
		items,
		readonly,
		value,
		className,
		direction = "bottom"
	} = props

	const optionsClasses = [mapDirectionClasses[direction]]
	
	return (
		<HListbox
			as={"div"}
			className={classNames(cls.Listbox, {}, [className])}
			value={value} 
			onChange={onChange} 
			disabled={readonly}
		>
			<ListboxButton className={cls.fragmentBtn}>
				<Button 
					theme={ButtonTheme.OUTLINE_INVERTED}
					className={cls.triggerBtn}
				>
					<>
						{value ?? defaultValue}
						<ArrowDownUpIcon className={cls.icon}/>
					</>
				</Button>
			</ListboxButton>
      		<ListboxOptions className={classNames(cls.options, {}, optionsClasses)}>
        		{items.map((item) => (
          			<ListboxOption disabled={item.disabled} key={item.value} value={item.value} as={Fragment}>
						{({ focus }) => (
              				<div className={classNames(cls.option, {
								[cls.focus]: focus,
								[cls.disabled]: item.disabled
							})
							}>
                				{item.content}
              				</div>
            			)}
          			</ListboxOption>
        		))}
      		</ListboxOptions>
    	</HListbox>
	)
}