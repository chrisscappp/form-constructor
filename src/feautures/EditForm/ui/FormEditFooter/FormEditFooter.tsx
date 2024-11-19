import { memo } from "react"
import { classNames } from "shared/lib/classNames/classNames"
import cls from "./FormEditFooter.module.scss"
import { Button, ButtonTheme } from "shared/ui/Button/Button"

interface FormFooterProps {
	className?: string,
	onUndoChanges?: () => void,
	onFormAction?: () => void
}

export const FormEditFooter = memo((props: FormFooterProps) => {
	
	const { 
		className,
		onFormAction,
		onUndoChanges
	} = props
	
	return (
		<div className={classNames(cls.FormEditFooter, {}, [className])}>
			<div className={cls.saveEdit}>
				<Button
					theme={ButtonTheme.APPROVE} 
					onClick={onFormAction}
				>
					Сохранить изменения
				</Button>
				<Button 
					theme={ButtonTheme.ERROR}
					className={cls.undoBtn}
					onClick={onUndoChanges}
				>
					Отменить изменения
				</Button>
			</div>
		</div>
	)
})