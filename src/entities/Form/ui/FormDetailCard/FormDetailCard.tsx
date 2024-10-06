import { Card } from "shared/ui/Card/Card"
import { FormDetail, FormQuestion } from "../../model/types/form"
import { memo, useCallback } from "react"
import { classNames } from "shared/lib/classNames/classNames"
import cls from "./FormDetailCard.module.scss"
import { Text, TextSize } from "shared/ui/Text/Text"
import CalendarIcon from "shared/assets/icons/calendar-icon.svg"
import EyeIcon from "shared/assets/icons/eye-icon.svg"
import { FormDetailCardInput } from "../FormDetailCardInput/FormDetailCardInput"
import { FormDetailCardTextarea } from "../FormDetailCardTextarea/FormDetailCardTextarea"
import { FormDetailCardRadio } from "../FormDetailCardRadio/FormDetailCardRadio"
import { FormDetailCardCheckbox } from "../FormDetailCardCheckbox/FormDetailCardCheckbox"
import { EditableFormDetailCardInput } from "../EditableFormDetailCardInput/EditableFormDetailCardInput"
import { EditableFormDetailCardRadio } from "../EditableFormDetailCardRadio/EditableFormDetailCardRadio"
import { ChangeInputFieldActionPayload, ChangeRadioFieldActionPayload } from "feautures/EditableFormDetailCard"
import { Button, ButtonTheme } from "shared/ui/Button/Button"
import { Input } from "shared/ui/Input/Input"
import AddFormIcon from "shared/assets/icons/add__to__list-icon.svg"

interface FormDetailCardProps {
	form?: FormDetail,
	isLoading?: boolean,
	error?: string,
	className?: string,
	isReadonly?: boolean,
	onOpenAddForm?: () => void,
	onChangeFormTitle?: (value: string) => void,
	onChangeFormDescription?: (value: string) => void,
	onChangeInputField?: (data: ChangeInputFieldActionPayload) => void,
	onAddRadioField?: (qIndex: number) => void,
	onAddCheckboxField?: (qIndex: number) => void,
	onDeleteAnswerField?: (qIndex: number, aIndex: number) => void,
	onChangeRadioField?: (data: ChangeRadioFieldActionPayload) => void,
	onUndoChangesForQuestion?: (qId: number, qIndex: number) => void,
	onDeleteQuestion?: (qIndex: number) => void
}

export const FormDetailCard = memo((props: FormDetailCardProps) => {

	const {
		className,
		error,
		form,
		isLoading,
		isReadonly,
		onOpenAddForm,
		onChangeFormTitle,
		onChangeFormDescription,
		onChangeInputField,
		onAddRadioField,
		onDeleteAnswerField,
		onChangeRadioField,
		onUndoChangesForQuestion,
		onDeleteQuestion
	} = props

	const renderReadonlyBlock = useCallback((question: FormQuestion) => {
		switch(question.type) {
			case "input": 
				return <FormDetailCardInput key={question.id} className={cls.question} question={question}/>
			case "textarea":
				return <FormDetailCardTextarea key={question.id} className={cls.question} question={question}/>
			case "radio": 
				return <FormDetailCardRadio key={question.id} className={cls.question} question={question}/>
			case "checkbox":
				return <FormDetailCardCheckbox key={question.id} className={cls.question} question={question}/>
			default:
				return null
		}
	}, [])

	const renderEditableBlock = useCallback((question: FormQuestion, qIndex: number) => {
		switch(question.type) {
			case "input": 
				return <EditableFormDetailCardInput 
					key={question.id}
					className={cls.editableQuestion} 
					question={question}
					qIndex={qIndex}
					onChangeInputField={onChangeInputField}
					onUndoChangesForQuestion={onUndoChangesForQuestion}
					onDeleteQuestion={onDeleteQuestion}
				/>
			case "textarea": 
				return <EditableFormDetailCardInput 
					key={question.id}
					className={cls.editableQuestion} 
					question={question}
					qIndex={qIndex}
					onChangeInputField={onChangeInputField}
					onUndoChangesForQuestion={onUndoChangesForQuestion}
					onDeleteQuestion={onDeleteQuestion}
				/>
			case "radio": 
				return <EditableFormDetailCardRadio 
					key={question.id}
					className={cls.editableQuestion} 
					question={question}
					qIndex={qIndex}
					onAddRadioField={onAddRadioField}
					onDeleteAnswerField={onDeleteAnswerField}
					onChangeRadioField={onChangeRadioField}
					onUndoChangesForQuestion={onUndoChangesForQuestion}
					onDeleteQuestion={onDeleteQuestion}
				/>
			case "checkbox":
				return <EditableFormDetailCardRadio 
					key={question.id}
					className={cls.editableQuestion} 
					question={question}
					qIndex={qIndex}
					onAddRadioField={onAddRadioField}
					onDeleteAnswerField={onDeleteAnswerField}
					onChangeRadioField={onChangeRadioField}
					onUndoChangesForQuestion={onUndoChangesForQuestion}
					onDeleteQuestion={onDeleteQuestion}
				/>
			default:
				return null
		}
	}, [])

	if (isLoading) {
		<Card className={classNames(cls.FormCard, {}, [className])}>
			<div>loading</div>
		</Card>
	}

	if (error) {
		<Card className={classNames(cls.FormCard, {}, [className])}>
			{error}
		</Card>
	}

	return (
		<Card className={classNames(cls.FormCard, {}, [className])}>
			<div className={cls.header}>
				<div className={cls.headerInfo}>
					{isReadonly ? <Text title={form?.title} size={TextSize.XL} /> : (
						<>
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
						</>
					)}
					{form?.description && isReadonly ? (
          				<Text
            				text={form?.description}
            				size={TextSize.L}
            				className={cls.description}
          				/>
        			) : (
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
					)}
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
					isReadonly ? renderReadonlyBlock(question) : renderEditableBlock(question, index)
				)}
				{!isReadonly && (
					<Button 
						onClick={onOpenAddForm} 
						theme={ButtonTheme.CLEAR}
						className={cls.addForm}
						title="Добавить вопрос"
					>
						<AddFormIcon className={cls.addFormIcon}/>
					</Button>
				)}	
			</div>
		</Card>
	)
})