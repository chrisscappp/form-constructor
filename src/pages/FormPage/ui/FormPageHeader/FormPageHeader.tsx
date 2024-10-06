import { memo, useCallback } from "react"
import { classNames } from "shared/lib/classNames/classNames"
import cls from "./FormPageHeader.module.scss"
import { Button, ButtonTheme } from "shared/ui/Button/Button"
import GoBackArrow from "shared/assets/icons/go-back-arrow.svg"
import { useNavigate } from "react-router"
import { routerPath } from "shared/config/routeConfig/routeConfig"
import { FormInstrumentPanel } from "entities/Form"
import { Text, TextSize } from "shared/ui/Text/Text"

interface FormPageHeaderProps {
	className?: string,
	isReadonly?: boolean,
	formLink: string,
	onOpenModalDelete: () => void,
	onEditForm: () => void,
	onUndoChanges: () => void
}

export const FormPageHeader = memo((props: FormPageHeaderProps) => {

	const {
		className,
		isReadonly,
		formLink,
		onOpenModalDelete,
		onEditForm,
		onUndoChanges
	} = props

	const navigate = useNavigate()

	const onOpenFormsList = useCallback(() => {
		navigate(routerPath.main)
	}, [])

	if (!isReadonly) {
		return (
			<div className={classNames(cls.FormPageHeader, {}, [className, cls.editPanel])}>
				<Text
					title="Редактирование"
					size={TextSize.XL}
				/>
				<Button 
					theme={ButtonTheme.ERROR}
					className={cls.undoBtn}
					onClick={onUndoChanges}
				>
					Отменить изменения
				</Button>
			</div>
		)
	}

	return (
    	<div className={classNames(cls.FormPageHeader, {}, [className])}>
      		<Button
        		onClick={onOpenFormsList}
        		theme={ButtonTheme.CLEAR}
        		className={cls.backBtn}
      		>
        		<GoBackArrow className={cls.arrow}/>
      		</Button>
			<FormInstrumentPanel
				className={cls.panel}
				formLink={formLink}
				onOpenModalDelete={onOpenModalDelete}
				onEditForm={onEditForm}
			/>
    	</div>
  	)
})