import { memo } from "react"
import { classNames } from "shared/lib/classNames/classNames"
import { Button, ButtonTheme } from "shared/ui/Button/Button"
import { Text, TextSize } from "shared/ui/Text/Text"
import cls from "./FormEditPageHeader.module.scss"
import { HStack } from "shared/ui/Stack"

interface FormEditPageHeaderProps {
	className?: string,
	onUndoChanges?: () => void,
	isCreateFormRoute?: boolean
}

export const FormEditPageHeader = memo((props: FormEditPageHeaderProps) => {
	
	const {
		className,
		onUndoChanges,
		isCreateFormRoute
	} = props

	return (
		<HStack 
			className={classNames(cls.FormPageHeader, {}, [className])}
			justify="between"
			max
		>
			<Text
				title={isCreateFormRoute ? "Новая форма" : "Редактирование"}
				size={TextSize.XL}
			/>
			<Button 
				theme={ButtonTheme.ERROR}
				className={cls.undoBtn}
				onClick={onUndoChanges}
			>
				{isCreateFormRoute ? "Отменить" : "Отменить изменения"}
			</Button>
		</HStack>
	)
})