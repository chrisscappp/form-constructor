import { memo, useCallback } from "react"
import { classNames } from "shared/lib/classNames/classNames"
import cls from "./FormPageHeader.module.scss"
import { Button, ButtonTheme } from "shared/ui/Button/Button"
import GoBackArrow from "shared/assets/icons/go-back-arrow.svg"
import { useNavigate } from "react-router"
import { routerPath } from "shared/config/routeConfig/routeConfig"
import { FormInstrumentPanel } from "entities/Form"

interface FormPageHeaderProps {
	className?: string,
	formLink: string,
	formId: string,
	onOpenModalDelete: () => void
}

export const FormPageHeader = memo((props: FormPageHeaderProps) => {

	const {
		className,
		formLink,
		formId,
		onOpenModalDelete
	} = props

	const navigate = useNavigate()

	const onOpenFormsList = useCallback(() => {
		navigate(routerPath.main)
	}, [])

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
				formId={formId}
				onOpenModalDelete={onOpenModalDelete}
			/>
    	</div>
  	)
})