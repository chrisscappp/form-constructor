import { memo, useCallback, useEffect } from "react"
import cls from "./ConfirmActionForm.module.scss"
import { classNames } from "shared/lib/classNames/classNames"
import { Text, TextSize, TextTheme } from "shared/ui/Text/Text"
import { Button, ButtonTheme } from "shared/ui/Button/Button"
import { Form } from "shared/ui/Form/Form"

export interface ConfirmActionFormProps {
	className?: string,
	onClose?: () => void,
	callback?: () => void,
	hint?: string
}

const ConfirmActionForm = (props: ConfirmActionFormProps) => {

	const {
		className,
		onClose,
		callback,
		hint
	} = props

	const onKeyDown = useCallback((e: KeyboardEvent) => {
		if (e.key === "Enter") {
			callback?.()
		}
	}, [callback])

	useEffect(() => {
		window.addEventListener("keydown", onKeyDown)
		return () => {
			removeEventListener("keydown", onKeyDown)
		}
	}, [onKeyDown])

	return (
		<Form className={classNames(cls.ConfirmEditingForm, {}, [className])}>
			<Text
				className={cls.formTitle}
				title={"Подтвердите действие"}
				size={TextSize.L}
			/>
			{hint && <Text className={cls.hint} text={hint}/>}
			<div className={cls.btns}>
				<Button
					className={cls.btn}
					theme={ButtonTheme.APPROVE}
					onClick={callback}
				>
					ОК
				</Button>
				<Button
					className={classNames(cls.btn, {}, [cls.undo])}
					theme={ButtonTheme.ERROR}
					onClick={onClose}
				>
					Отмена
				</Button>
			</div>
		</Form>
	)
}

export default memo(ConfirmActionForm)