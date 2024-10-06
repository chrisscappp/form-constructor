import { memo, useCallback, useEffect } from "react"
import cls from "./DeleteFormForm.module.scss"
import { classNames } from "shared/lib/classNames/classNames"
import { Text, TextSize, TextTheme } from "shared/ui/Text/Text"
import { useSelector } from "react-redux"
import { Loader } from "shared/ui/Loader/Loader"
import { Button, ButtonTheme } from "shared/ui/Button/Button"
import { Form } from "shared/ui/Form/Form"
import { getDeleteFormModalDeleteConfirmed, getDeleteFormModalError, getDeleteFormModalIsLoading } from "../../modal/selectors/getDeleteFormModal"

export interface DeleteFormFormProps {
	className?: string,
	onClose?: () => void
}

const DeleteFormForm = (props: DeleteFormFormProps) => {

	const {
		className,
		onClose
	} = props

	const isLoading = useSelector(getDeleteFormModalIsLoading)
	const error = useSelector(getDeleteFormModalError)
	const isDeleteConfirmed = useSelector(getDeleteFormModalDeleteConfirmed)

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

	if (isLoading) {
		return <Loader/>
	}

	return (
		<Form className = {classNames(cls.DeleteFormForm, {}, [className])}>
			<Text
				className = {cls.formTitle}
				title = {"Удаление формы"}
				size={TextSize.L}
			/>
			<Text
				className = {cls.subtitle}
				text = {"Подтвердите действие. Восстановить форму будет невозможно!"}

			/>
			{error && <Text text = {error} theme = {TextTheme.ERROR}/>}
			<div className={cls.btns}>
				<Button
					className = {cls.btn}
					theme = {ButtonTheme.ERROR}
				>
					Удалить форму
				</Button>
				<Button
					className = {classNames(cls.btn, {}, [cls.undo])}
					theme = {ButtonTheme.OUTLINE_INVERTED}
					onClick = {onClose}
				>
					Отмена
				</Button>
			</div>
		</Form>
	)
}

export default memo(DeleteFormForm)