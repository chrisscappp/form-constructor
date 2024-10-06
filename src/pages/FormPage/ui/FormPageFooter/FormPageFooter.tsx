import { memo } from "react"
import { classNames } from "shared/lib/classNames/classNames"
import cls from "./FormPageFooter.module.scss"
import { Button, ButtonTheme } from "shared/ui/Button/Button"

interface FormPageFooterProps {
	className?: string,
	onUndoChanges?: () => void,
	onCheckIdentityForm?: () => void,
	isReadonly?: boolean
}

export const FormPageFooter = memo((props: FormPageFooterProps) => {
	
	const { 
		className,
		onCheckIdentityForm,
		onUndoChanges,
		isReadonly
	} = props
	
	return (
		<div className={classNames(cls.FormPageFooter, {}, [className])}>
			{!isReadonly && (
				<div className={cls.saveEdit}>
					<Button
						theme={ButtonTheme.APPROVE} 
						onClick={onCheckIdentityForm}
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
			)}
		</div>
	)
})