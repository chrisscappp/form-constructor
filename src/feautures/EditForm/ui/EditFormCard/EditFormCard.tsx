import { memo, useCallback } from "react"
import { classNames } from "shared/lib/classNames/classNames"
import cls from "./EditFormCard.module.scss"
import { FormDetail, FormQuestion } from "entities/Form"
import { EditFormCardInput } from "../EditFormCardInput/EditFormCardInput"
import { EditFormCardRadio } from "../EditFormCardRadio/EditFormCardRadio"
import { Card } from "shared/ui/Card/Card"
import { Text, TextSize, TextTheme } from "shared/ui/Text/Text"
import { Input } from "shared/ui/Input/Input"
import { 
	ChangeInputFieldActionPayload, 
	ChangeRadioFieldActionPayload, 
	ValidateErrors, 
	ValidateFormErrors
} from "../../model/types/editForm"
import CalendarIcon from "shared/assets/icons/calendar-icon.svg"
import EyeIcon from "shared/assets/icons/eye-icon.svg"
import AddFormIcon from "shared/assets/icons/add__to__list-icon.svg"
import { Button, ButtonTheme } from "shared/ui/Button/Button"
import { Loader } from "shared/ui/Loader/Loader"
import { HStack, VStack } from "shared/ui/Stack"

interface EditFormCardProps {
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

export const EditFormCard = memo((props: EditFormCardProps) => {
	
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
			case "listbox": 
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
			<Card className={classNames(cls.loaderWrap, {}, [className])}>
				<Loader/>
			</Card>
		)
	}

	return (
		<Card className={classNames(cls.EditForm, {}, [className])}>
			<HStack className={cls.header} align="start" justify="between">
				<VStack className={cls.headerInfo} max gap="12">
					<VStack max gap="4">
						<Text
							title={'Название формы:'}
							size={TextSize.L}
						/>
						{validateErrors?.title && (
							<Text 
								theme={TextTheme.ERROR} 
								text={validateErrorsTranslate[validateErrors.title]}
							/>
						)}
						<Input
							onChange={onChangeFormTitle}
							value={form?.title ?? ''}
							placeholder='Введите название формы...'
						/>
					</VStack>
					<VStack max gap="4">
						<Text
							title={'Короткое описание:'}
							size={TextSize.L}
						/>
						<Input
							onChange={onChangeFormDescription}
							value={form?.description ?? ''}
							placeholder='Введите короткое описание для формы...'
						/>
					</VStack>
				</VStack>
				<VStack className={cls.headerAdditional} gap="4">
					<HStack gap="4">
            			<CalendarIcon className={cls.calendar}/>
            			<Text text={form?.date}/>
          			</HStack>
          			<HStack gap="4">
            			<EyeIcon className={cls.eye} />
            			<Text text={String(form?.filled || 0)}/>
          			</HStack>
					<Text
						text={`Количество вопросов: ${form?.questionCount || 0}`}
						size={TextSize.M}
					/>
					<Text
						text={`ID: ${form?.id || 0}`}
						size={TextSize.M}
					/>
				</VStack>
			</HStack>
			<VStack className={cls.questions} gap="20">
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
			</VStack>
			{error && (
				<Text
					text={error}
					theme={TextTheme.ERROR}
				/>
			)}
		</Card>
	)
})