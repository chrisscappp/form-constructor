import { memo, useCallback } from "react"
import cls from "./FormPageHeader.module.scss"
import { Button, ButtonTheme } from "shared/ui/Button/Button"
import GoBackArrow from "shared/assets/icons/go-back-arrow.svg"
import { useNavigate } from "react-router"
import { FormDetail, FormInstrumentPanel } from "entities/Form"
import { HStack } from "shared/ui/Stack"
import { Text, TextSize } from "shared/ui/Text/Text"
import { routerPath } from "shared/config/routeConfig/routeConfig"

interface FormPageHeaderProps {
	className?: string,
	form?: FormDetail,
	readonly?: boolean,
	onOpenModalDelete: () => void
}

export const FormPageHeader = memo((props: FormPageHeaderProps) => {

	const {
		className,
		form,
		readonly,
		onOpenModalDelete
	} = props

	const navigate = useNavigate()

	const onGoToMain = useCallback(() => {
		navigate(routerPath.main)
	}, [])

	return (
    	<HStack 
			className={className}
			justify="between"
			max
		>
      		<Button
        		onClick={onGoToMain}
        		theme={ButtonTheme.CLEAR}
        		className={cls.backBtn}
      		>
        		<GoBackArrow className={cls.arrow}/>
      		</Button>
			{readonly ? (
				<FormInstrumentPanel
					className={cls.panel}
					formDetail={form}
					onOpenModalDelete={onOpenModalDelete}
				/>
			)
			: (
				<Text
					title="Так будет выглядеть Ваша форма в момент прохождения"
					size={TextSize.L}
				/>
			)}
    	</HStack>
  	)
})