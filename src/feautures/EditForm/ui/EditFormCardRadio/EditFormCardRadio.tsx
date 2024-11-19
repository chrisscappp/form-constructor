import { memo, useCallback, useState } from "react"
import cls from "./EditFormCardRadio.module.scss"
import { classNames } from "shared/lib/classNames/classNames"
import { FormQuestion } from "entities/Form"
import { Text, TextSize, TextTheme } from "shared/ui/Text/Text"
import { Button, ButtonSize } from "shared/ui/Button/Button"
import UndoIcon from "shared/assets/icons/go-back-arrow.svg"
import RemoveIcon from "shared/assets/icons/trash-icon.svg"
import { Input } from "shared/ui/Input/Input"
import { 
	ChangeRadioFieldActionPayload, 
	QuestionError, 
	ValidateFormErrors
} from "../../model/types/editForm"
import { InputRadioAnswer } from "./InputRadioAnswer"

interface EditFormCardRadioProps {
	className?: string,
	question?: FormQuestion,
	qIndex?: number,
	validateErrors?: QuestionError,
	onAddRadioField?: (qIndex: number) => void,
	onDeleteAnswerField?: (qIndex: number, aIndex: number) => void,
	onChangeRadioField?: (data: ChangeRadioFieldActionPayload) => void,
	onUndoChangesForQuestion?: (qId: number, qIndex: number) => void,
	onDeleteQuestion?: (qIndex: number) => void
}

const validateErrorsTranslate = {
	[ValidateFormErrors.EMPTY_QUESTION_TITLE]: "У вопроса должно быть название!",
	[ValidateFormErrors.EMPTY_QUESTION_ANSEWRS]: "Должен быть хотя бы один ответ на вопрос!",
	[ValidateFormErrors.EMPTY_QUESTION_ANSEWRS_TITLE]: "Это поле должно быть заполнено!",
	[ValidateFormErrors.EMPTY_ERROR]: ""
}

export const EditFormCardRadio = memo((props: EditFormCardRadioProps) => {
	
	const {
		className,
		question,
		validateErrors,
		onAddRadioField,
		onDeleteAnswerField,
		onChangeRadioField,
		onDeleteQuestion,
		onUndoChangesForQuestion,
		qIndex = 0
	} = props

	const [title, setTitle] = useState(question?.title ?? "")
	const [description, setDescription] = useState(question?.description ?? "")

	const onChangeTitle = useCallback((value: string) => {
		setTitle(value)
	}, [qIndex])

	const onChangeDescription = useCallback((value: string) => {
		setDescription(value)
	}, [qIndex])

	const onChangeContent = useCallback((value: string, aIndex: number) => {
		onChangeRadioField?.({
			newValue: value,
			qIndex,
			fieldType: "radio",
			aIndex: aIndex
		})
	}, [qIndex])

	const onChangeField = useCallback((e: any) => {
		const id = e.target.id
		switch(id) {
			case `input-question-title-${qIndex}`: {
				title !== question?.title && (onChangeRadioField?.({
      				newValue: title,
					qIndex,
					fieldType: "title",
					aIndex: -1
    			}))
				break
			}
			case `input-question-description-${qIndex}`: {
				description !== question?.description && (onChangeRadioField?.({
      				newValue: description,
					qIndex,
					fieldType: "description",
					aIndex: -1
    			}))
				break
			}
			default: console.log('asd')
		}
	}, [title, description, qIndex])

	const onDelete = useCallback((aIndex: number) => {
		onDeleteAnswerField?.(qIndex, aIndex)
	}, [])

	return (
		<div className={classNames(cls.Edi, {}, [className])}>
			<hr className={cls.line}/>
			<div className={cls.questionHeader}>
				<Text title={`Вопрос №${qIndex + 1} | ${question?.type}`} size={TextSize.ML} />
				<div className={cls.questionPanel}>
          			<Button
            			title="Отменить изменения"
            			size={ButtonSize.L}
            			square
            			className={cls.btn}
            			onClick={() => onUndoChangesForQuestion?.(question?.id ?? 0, qIndex)}
          			>
            			<UndoIcon className={cls.icon} />
          			</Button>
          			<Button
            			title="Удалить вопрос"
            			size={ButtonSize.L}
            			square
            			className={classNames(cls.btn, {}, [cls.removeBtn])}
            			onClick={() => onDeleteQuestion?.(qIndex)}
          			>
            			<RemoveIcon className={cls.icon} />
          			</Button>
        		</div>
			</div>
			<Text title={"Заголовок:"} size={TextSize.M} className={cls.hint} />
			<Input
        		value={title}
        		placeholder="Введите название вопроса..."
        		className={cls.input}
        		onChange={onChangeTitle}
				onBlur={onChangeField}
				id={`input-question-title-${qIndex}`}
      		/>
			{validateErrors?.title && (
				<Text
					theme={TextTheme.ERROR} 
					text={validateErrorsTranslate[validateErrors.title]}
					className={cls.error}
				/>
			)}
      		<Text title={"Описание:"} size={TextSize.M} className={cls.hint} />
      		<Input
        		value={description}
        		placeholder="Введите описание вопроса..."
        		className={cls.input}
        		onChange={onChangeDescription}
				onBlur={onChangeField}
				id={`input-question-description-${qIndex}`}
      		/>
			<Text title={"Ответы:"} size={TextSize.M} className={cls.hint} />
			<div className={cls.answers}>
				{question?.answers?.length ? question.answers.map((answer, aIndex) => (
					<>
						<InputRadioAnswer
							key={String(answer.value) + answer.id}
							answer={answer}
							onChangeContent={onChangeContent}
							aIndex={aIndex}
							onDelete={onDelete}
						/>
						{validateErrors?.answersErrors && (
							<Text
								theme={TextTheme.ERROR}
								text={validateErrorsTranslate[validateErrors.answersErrors[aIndex] || ValidateFormErrors.EMPTY_ERROR]}
								className={cls.error}
							/>
						)}
					</>
				)) : (
					<Text
						text="Список ответов пуст. Нажмите +, чтобы добавить!"
						className={cls.hint}
					/>
				)}
				{validateErrors?.emptyAnswers && (
					<Text
						theme={TextTheme.ERROR} 
						text={validateErrorsTranslate[validateErrors.emptyAnswers]}
						className={cls.error}
					/>
				)}
			</div>
			<Button 
				size={ButtonSize.L} 
				square 
				className={classNames(cls.btn, {}, [cls.plusBtn])}
				title="Добавить вопрос"
				onClick={() => onAddRadioField?.(qIndex)}
			>
				+
			</Button>
		</div>
	)
})