import { memo, useCallback, useEffect } from "react"
import cls from "./DeleteFormForm.module.scss"
import { classNames } from "shared/lib/classNames/classNames"
import { Text, TextSize, TextTheme } from "shared/ui/Text/Text"
import { useSelector } from "react-redux"
import { Loader } from "shared/ui/Loader/Loader"
import { Button, ButtonTheme } from "shared/ui/Button/Button"
import { Form } from "shared/ui/Form/Form"
import { getDeleteFormModalError, getDeleteFormModalIsLoading } from "../../modal/selectors/getDeleteFormModal"
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch"
import { deleteForm } from "../../modal/services/deleteForm/deleteForm"
import { useNavigate } from "react-router"
import { fetchFormsList } from "pages/MainPage/model/services/fetchFormsList/fetchFormsList"

export interface DeleteFormFormProps {
	className?: string,
	onClose?: () => void,
	deleteFormId?: string
}

const DeleteFormForm = (props: DeleteFormFormProps) => {

	const {
		className,
		onClose,
		deleteFormId
	} = props

	const dispatch = useAppDispatch()
	const isLoading = useSelector(getDeleteFormModalIsLoading)
	const error = useSelector(getDeleteFormModalError)
	const navigate = useNavigate()

	const onDeleteForm = useCallback(async () => {
		if (deleteFormId) {
			const response = await dispatch(deleteForm({ id: String(deleteFormId) }))
			if (response.meta.requestStatus === "fulfilled") {
				dispatch(fetchFormsList())
				onClose?.()
				navigate("/")
			}
		}
	}, [dispatch])

	const onKeyDown = useCallback((e: KeyboardEvent) => {
		if (e.key === "Enter") {
			onDeleteForm()
		}
	}, [])

	useEffect(() => {
		window.addEventListener("keydown", onKeyDown)
		return () => {
			removeEventListener("keydown", onKeyDown)
		}
	}, [onKeyDown])

	if (isLoading) {
		return (
			<Form className={classNames(cls.DeleteFormForm, {}, [className])}>
				<Loader/>
			</Form>
		)
	}

	return (
		<Form className={classNames(cls.DeleteFormForm, {}, [className])}>
			<Text
				className={cls.formTitle}
				title={"Удаление формы"}
				size={TextSize.L}
			/>
			<Text
				className={cls.subtitle}
				text={"Подтвердите действие. Восстановить форму будет невозможно!"}
			/>
			{error && <Text text={error} theme={TextTheme.ERROR}/>}
			<div className={cls.btns}>
				<Button
					className={cls.btn}
					theme={ButtonTheme.ERROR}
					onClick={onDeleteForm}
				>
					Удалить форму
				</Button>
				<Button
					className={classNames(cls.btn, {}, [cls.undo])}
					theme={ButtonTheme.OUTLINE_INVERTED}
					onClick={onClose}
				>
					Отмена
				</Button>
			</div>
		</Form>
	)
}

export default memo(DeleteFormForm)