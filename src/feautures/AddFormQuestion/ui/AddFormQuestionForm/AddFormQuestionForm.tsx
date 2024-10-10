import { memo, useCallback, useEffect } from "react"
import cls from "./AddFormQuestionForm.module.scss"
import { classNames } from "shared/lib/classNames/classNames"
import { Text, TextSize, TextTheme } from "shared/ui/Text/Text"
import { Loader } from "shared/ui/Loader/Loader"
import { Button, ButtonTheme } from "shared/ui/Button/Button"
import { Form } from "shared/ui/Form/Form"
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch"
import { useSelector } from "react-redux"
import { getAddFormQuestionCount, getAddFormQuestionFieldType, getAddFormQuestionValueType } from "../../modal/selectors/addFormSelectors"
import { addFormQuestionModalActions } from "../../modal/slice/addFormSlice"
import { FormQuestionType, FormQuestionValueType } from "entities/Form"
import { Select, SelectOption } from "shared/ui/Select/Select"
import { Input } from "shared/ui/Input/Input"

export interface AddFormQuestionFormProps {
	className?: string,
	onClose?: () => void
	onAddQuestion?: () => void
}

const selectCountOptions: SelectOption[] = [
	{ content: "1", value: 1 },
	{ content: "2", value: 2 },
	{ content: "3", value: 3 }
]

const selectFieldTypeOptions: SelectOption[] = [
	{ content: "Радио", value: "radio" },
	{ content: "Чекбоск", value: "checkbox" },
	{ content: "Поле ввода", value: "input" },
	{ content: "Большое поле ввода", value: "textarea" }
]

const selectFieldValueTypeOptions: SelectOption[] = [
	{ content: "Строка", value: "string" },
	{ content: "Число", value: "number" }
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

	const onChangeQuestionFieldType = useCallback((value: FormQuestionType) => {
		dispatch(addFormQuestionModalActions.setQuestionsFieldType(value))
	}, [dispatch])

	const onChangeQuestionValueType = useCallback((value: FormQuestionValueType) => {
		dispatch(addFormQuestionModalActions.setQuestionValueType(value))
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
		<Form className = {classNames(cls.AddFormQuestionForm, {}, [className])}>
			<Text
				className = {cls.formTitle}
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
						value={String(questionCount)}
						className={cls.countInput}
					/>
					<Select
						value={String(questionCount)}
						onChange={onChangeQuestionCount}
						options={selectCountOptions}
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
						value={String(questionFieldType?.content)}
						className={cls.countInput}
					/>
					<Select
						value={String(questionFieldType?.value)}
						onChange={onChangeQuestionFieldType}
						options={selectFieldTypeOptions}
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
							value={String(questionValueType?.content)}
							className={cls.countInput}
						/>
						<Select
							value={String(questionValueType?.value)}
							onChange={onChangeQuestionValueType}
							options={selectFieldValueTypeOptions}
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