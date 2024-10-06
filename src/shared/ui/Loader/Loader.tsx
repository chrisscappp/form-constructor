import { memo } from "react"
import { classNames } from "shared/lib/classNames/classNames"
import "./Loader.scss"

interface LoaderProps {
	className?: string;
}

export const Loader = memo(({ className }: LoaderProps) => {
	return (
		<div className = {classNames("loader", {}, [className])}></div>
	)
})