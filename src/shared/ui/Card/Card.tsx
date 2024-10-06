import { memo, ReactNode } from "react"
import { classNames } from "shared/lib/classNames/classNames"
import cls from "./Card.module.scss"

interface CardProps {
	className?: string,
	hovered?: boolean,
	children: ReactNode
}

export const Card = memo((props: CardProps) => {
	
	const {
		className,
		hovered = false,
		children
	} = props
	
	return (
		<div className={classNames(cls.Card, {[cls.hovered]: hovered}, [className])}>
			{children}
		</div>
	)
})