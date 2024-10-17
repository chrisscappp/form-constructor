import { memo, useCallback } from "react"
import { classNames } from "shared/lib/classNames/classNames"
import cls from "./EditForm.module.scss"
import { FormDetail, FormQuestion } from "entities/Form"
import { EditFormCardInput } from "feautures/EditFormCardInput"
import { EditFormCardRadio } from "feautures/EditFormCardRadio"
import { Card } from "shared/ui/Card/Card"
import { Text, TextSize, TextTheme } from "shared/ui/Text/Text"
import { Input } from "shared/ui/Input/Input"
import { 
	ChangeInputFieldActionPayload, 
	ChangeRadioFieldActionPayload, 
	ValidateErrors, 
	ValidateFormErrors
} from "pages/FormEditPage"
import CalendarIcon from "shared/assets/icons/calendar-icon.svg"
import EyeIcon from "shared/assets/icons/eye-icon.svg"
import AddFormIcon from "shared/assets/icons/add__to__list-icon.svg"
import { Button, ButtonTheme } from "shared/ui/Button/Button"
import { Loader } from "shared/ui/Loader/Loader"

interface EditFormProps {
	form?: FormDetail,
	isLoading?: boolean,
	error?: string,
	validateErrors?: ValidateErrors,
	className?: string,
	onOpenAddForm?: () => void,
	onChangeFormTitle?: (value: string) => void,
	onChangeFormDescription?: (value: string) => void,
	onChangeInputField?: (data: ChangeInputFieldActionPayload) => void,
	onAddRadioField?: (qIndex: number) => void,
	onDeleteAnswerField?: (qIndex: number, aIndex: number) => void,
	onChangeRadioField?: (data: ChangeRadioFieldActionPayload) => void,
	onUndoChangesForQuestion?: (qId: number, qIndex: number) => void,
	onDeleteQuestion?: (qIndex: number) => void
}

const validateErrorsTranslate = {
	[ValidateFormErrors.EMPTY_TITLE]: "Название формы должно быть заполнено!",
	[ValidateFormErrors.NO_QUESTIONS]: "У формы должен быть хотя бы один вопрос!"
}

export const EditForm = memo((props: EditFormProps) => {
	
	const {
		className,
		error,
		form,
		isLoading,
		validateErrors,
		onAddRadioField,
		onChangeFormDescription,
		onChangeFormTitle,
		onChangeInputField,
		onChangeRadioField,
		onDeleteAnswerField,
		onDeleteQuestion,
		onOpenAddForm,
		onUndoChangesForQuestion
	} = props

	const renderEditableBlock = useCallback((question: FormQuestion, qIndex: number) => {
		//@ts-ignore
		const errors: QuestionError = validateErrors?.questions[qIndex]
		switch(question.type) {
			case "input": 
				return <EditFormCardInput 
					key={question.id}
					className={cls.editableQuestion} 
					question={question}
					qIndex={qIndex}
					validateErrors={errors}
					onChangeInputField={onChangeInputField}
					onUndoChangesForQuestion={onUndoChangesForQuestion}
					onDeleteQuestion={onDeleteQuestion}
				/>
			case "textarea": 
				return <EditFormCardInput 
					key={question.id}
					className={cls.editableQuestion} 
					question={question}
					qIndex={qIndex}
					validateErrors={errors}
					onChangeInputField={onChangeInputField}
					onUndoChangesForQuestion={onUndoChangesForQuestion}
					onDeleteQuestion={onDeleteQuestion}
				/>
			case "radio": 
				return <EditFormCardRadio 
					key={question.id}
					className={cls.editableQuestion} 
					question={question}
					qIndex={qIndex}
					validateErrors={errors}
					onAddRadioField={onAddRadioField}
					onDeleteAnswerField={onDeleteAnswerField}
					onChangeRadioField={onChangeRadioField}
					onUndoChangesForQuestion={onUndoChangesForQuestion}
					onDeleteQuestion={onDeleteQuestion}
				/>
			case "checkbox":
				return <EditFormCardRadio 
					key={question.id}
					className={cls.editableQuestion} 
					question={question}
					qIndex={qIndex}
					validateErrors={errors}
					onAddRadioField={onAddRadioField}
					onDeleteAnswerField={onDeleteAnswerField}
					onChangeRadioField={onChangeRadioField}
					onUndoChangesForQuestion={onUndoChangesForQuestion}
					onDeleteQuestion={onDeleteQuestion}
				/>
			default:
				return null
		}
	}, [validateErrors])

	if (isLoading) {
		return (
			<Card className={classNames(cls.EditForm, {}, [className])}>
				<Loader/>
			</Card>
		)
	}

	return (
		<Card className={classNames(cls.EditForm, {}, [className])}>
			<div className={cls.header}>
				<div className={cls.headerInfo}>
					<Text
						title={'Название формы:'}
						size={TextSize.L}
					/>
					<Input
						className={cls.inputTitle}
						onChange={onChangeFormTitle}
						value={form?.title ?? ''}
						placeholder='Введите название формы...'
					/>
					{validateErrors?.title && (
						<Text 
							theme={TextTheme.ERROR} 
							text={validateErrorsTranslate[validateErrors.title]}
							className={cls.error}
						/>
					)}
					<div className={cls.changeDescription}>
						<Text
							title={'Короткое описание:'}
							size={TextSize.L}
						/>
						<Input
							className={cls.inputDescription}
							onChange={onChangeFormDescription}
							value={form?.description ?? ''}
							placeholder='Введите короткое описание для формы...'
						/>
					</div>
				</div>
				<div className={cls.headerAdditional}>
					<div className={cls.dateWrapper}>
            			<CalendarIcon className={cls.calendar} />
            			<Text text={form?.date} className={cls.date} />
          			</div>
          			<div className={cls.filledWrapper}>
            			<EyeIcon className={cls.eye} />
            			<Text text={String(form?.filled || 0)} className={cls.filled} />
          			</div>
					<Text
						className={cls.count}
						text={`Количество вопросов: ${form?.questionCount || 0}`}
						size={TextSize.M}
					/>
					<Text
						className={cls.count}
						text={`ID: ${form?.id || 0}`}
						size={TextSize.M}
					/>
				</div>
			</div>
			<div className={cls.body}>
				{form?.questions.map((question, index) => 
					renderEditableBlock(question, index)
				)}
				{validateErrors?.emptyQuestions && (
					<Text
						text={validateErrorsTranslate[validateErrors.emptyQuestions]}
						theme={TextTheme.ERROR}
					/>
				)}
				<Button 
					onClick={onOpenAddForm} 
					theme={ButtonTheme.CLEAR}
					className={cls.addForm}
					title="Добавить вопрос"
				>
					<AddFormIcon className={cls.addFormIcon}/>
				</Button>	
			</div>
			{error && (
				<Text
					text={error}
					theme={TextTheme.ERROR}
				/>
			)}
		</Card>
	)
})