import { classNames } from "shared/lib/classNames/classNames"
import cls from "./Page.module.scss"
import { memo, ReactNode } from "react"

interface PageProps {
	className?: string,
	children: ReactNode,
	onScrollEnd?: () => void,
	saveScroll?: boolean
}

export const Page = memo((props: PageProps) => {
	
	const { 
		className,
		children,
	} = props
	
	return (
		<section 
			className = {classNames(cls.Page, {}, [className])}
		>
			{children}
		</section>
	)
})