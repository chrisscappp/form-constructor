import { memo } from "react"
import cls from "./Footer.module.scss"
import { classNames } from "shared/lib/classNames/classNames"

interface FooterProps {
	className?: string;
}

export const Footer = memo((props: FooterProps) => {

	const {
		className
	} = props
	
	return (
		<div className = {classNames(cls.Footer, {}, [className])}>
			
		</div>
	)
})
