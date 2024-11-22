import { memo } from "react"
import { classNames } from "shared/lib/classNames/classNames"
import cls from "./FormEditFooter.module.scss"
import { Button, ButtonTheme } from "shared/ui/Button/Button"
import { HStack } from "shared/ui/Stack"

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
		<HStack className={classNames('', {}, [className])}>
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
		</HStack>
	)
})