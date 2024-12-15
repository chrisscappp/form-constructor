import { memo, useCallback, useEffect } from "react"
import cls from "./AddFormQuestionForm.module.scss"
import { classNames } from "shared/lib/classNames/classNames"
import { Text, TextSize } from "shared/ui/Text/Text"
import { Button, ButtonTheme } from "shared/ui/Button/Button"
import { Form } from "shared/ui/Form/Form"
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch"
import { useSelector } from "react-redux"
import { getAddFormQuestionCount, getAddFormQuestionFieldType, getAddFormQuestionValueType } from "../../modal/selectors/addFormSelectors"
import { addFormQuestionModalActions } from "../../modal/slice/addFormSlice"
import { FormQuestionType, FormQuestionValueType } from "entities/Form"
import { Input } from "shared/ui/Input/Input"
import { Listbox } from "shared/ui/Listbox/Listbox"

export interface AddFormQuestionFormProps {
	className?: string,
	onClose?: () => void
	onAddQuestion?: () => void
}

const selectCountOptions = [
	{ content: "1", value: "1", disabled: false },
	{ content: "2", value: "2", disabled: false },
	{ content: "3", value: "3", disabled: false }
]

const selectFieldTypeOptions = [
	{ content: "Один вариант ответа", value: "radio", disabled: false },
	{ content: "Несколько вариантов ответа", value: "checkbox", disabled: false },
	{ content: "Поле ввода", value: "input", disabled: false },
	{ content: "Большое поле ввода", value: "textarea", disabled: false },
	{ content: "Выпадающий список", value: "listbox", disabled: false }
]

const selectFieldValueTypeOptions = [
	{ content: "Строка", value: "string", disabled: false },
	{ content: "Число", value: "number", disabled: false }
]

const AddFormQuestionForm = (props: AddFormQuestionFormProps) => {

	const {
		className,
		onClose,
		onAddQuestion
	} = props

	const dispatch = useAppDispatch()
	const questionCount = useSelector(getAddFormQuestionCount)
	const questionFieldType = useSelector(getAddFormQuestionFieldType)
	const questionValueType = useSelector(getAddFormQuestionValueType)

	const onChangeQuestionCount = useCallback((value: string) => {
		dispatch(addFormQuestionModalActions.setQuestionsCount(Number(value)))
	}, [dispatch])

	const onChangeQuestionFieldType = useCallback((value: string) => {
		dispatch(addFormQuestionModalActions.setQuestionsFieldType(value as FormQuestionType))
	}, [dispatch])

	const onChangeQuestionValueType = useCallback((value: string) => {
		dispatch(addFormQuestionModalActions.setQuestionValueType(value as FormQuestionValueType))
	}, [dispatch])

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
		<Form className = {classNames('', {}, [className])}>
			<Text
				title = {"Новый вопрос"}
				size={TextSize.L}
			/>
			<div className={cls.body}>
				<Text
					text="Выберите количество вопросов:"
					className={cls.countTitle}
					size={TextSize.ML}
				/>
				<div className={cls.questionCount}>
					<Input
						value={questionCount}
						className={cls.countInput}
					/>
					<Listbox
						value={String(questionCount)}
						onChange={onChangeQuestionCount}
						items={selectCountOptions}
					/>
				</div>
			</div>
			<div className={cls.body}>
				<Text
					text="Выберите тип поля:"
					className={cls.countTitle}
					size={TextSize.ML}
				/>
				<div className={cls.questionCount}>
					<Input
						value={questionFieldType?.content}
						className={cls.countInput}
					/>
					<Listbox
						value={questionFieldType?.value}
						onChange={onChangeQuestionFieldType}
						items={selectFieldTypeOptions}
					/>
				</div>
			</div>
			{questionFieldType?.value === "input" || questionFieldType?.value === "textarea" ? (
				<div className={cls.body}>
					<Text
						text="Выберите тип содержимого:"
						className={cls.countTitle}
						size={TextSize.ML}
					/>
					<div className={cls.questionCount}>
						<Input
							value={questionValueType?.content}
							className={cls.countInput}
						/>
						<Listbox
							value={questionValueType?.value}
							onChange={onChangeQuestionValueType}
							items={selectFieldValueTypeOptions}
						/>
					</div>
				</div>	
			) : null}
			<div className={cls.btns}>
				<Button
					className = {cls.btn}
					theme = {ButtonTheme.BACKGROUND}
					onClick={onAddQuestion}
				>
					Добавить
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

export default memo(AddFormQuestionForm)