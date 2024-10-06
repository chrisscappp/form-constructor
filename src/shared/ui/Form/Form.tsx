import { classNames } from "shared/lib/classNames/classNames"
import cls from "./Form.module.scss"
import { ReactNode } from "react"

interface FormProps {
	className?: string;
	children: ReactNode
}

export const Form = (props: FormProps) => {

	const {
		className,
		children
	} = props

	return (
		<div className = {classNames(cls.Form, {}, [className])}>
			{children}
		</div>
	)
}