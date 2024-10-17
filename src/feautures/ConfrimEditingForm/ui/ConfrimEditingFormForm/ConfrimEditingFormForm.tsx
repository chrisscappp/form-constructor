import { memo, useCallback, useEffect } from "react"
import cls from "./ConfrimEditingFormForm.module.scss"
import { classNames } from "shared/lib/classNames/classNames"
import { Text, TextSize, TextTheme } from "shared/ui/Text/Text"
import { Loader } from "shared/ui/Loader/Loader"
import { Button, ButtonTheme } from "shared/ui/Button/Button"
import { Form } from "shared/ui/Form/Form"

export interface ConfirmEditingFormFormProps {
	className?: string,
	onClose?: () => void,
	callback?: () => void,
	error?: string
}

const ConfirmEditingFormForm = (props: ConfirmEditingFormFormProps) => {

	const {
		className,
		onClose,
		callback,
		error
	} = props

	const onKeyDown = useCallback((e: KeyboardEvent) => {
		if (e.key === "Enter") {
			console.log('asd')
		}
	}, [])

	useEffect(() => {
		window.addEventListener("keydown", onKeyDown)
		return () => {
			removeEventListener("keydown", onKeyDown)
		}
	}, [onKeyDown])

	return (
		<Form className = {classNames(cls.ConfirmEditingForm, {}, [className])}>
			<Text
				className = {cls.formTitle}
				title = {"Подтвердите действие"}
				size={TextSize.L}
			/>
			{error && <Text text = {error} theme = {TextTheme.ERROR}/>}
			<div className={cls.btns}>
				<Button
					className = {cls.btn}
					theme = {ButtonTheme.APPROVE}
					onClick={callback}
				>
					ОК
				</Button>
				<Button
					className = {classNames(cls.btn, {}, [cls.undo])}
					theme = {ButtonTheme.ERROR}
					onClick = {onClose}
				>
					Отмена
				</Button>
			</div>
		</Form>
	)
}

export default memo(ConfirmEditingFormForm)