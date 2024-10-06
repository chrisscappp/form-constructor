import { classNames } from "shared/lib/classNames/classNames"
import cls from "./PageError.module.scss"
import { Button } from "shared/ui/Button/Button"

interface PageErrorProps {
	className?: string;
}

export const PageError = ({ className }: PageErrorProps) => {

	const reloadPage = () => {
		location.reload()
	}

	return (
		<div className = {classNames(cls.PageError, {}, [className])}>
			<div className = {cls.content}>
				<p>Непредвиденная ошибка</p>
				<div className = {cls.contentBtn}>
					<Button 
						onClick = {reloadPage}
					>
						Обновить страницу
					</Button>
				</div>
			</div>
    	</div>
	)
}