import { memo, useCallback, useEffect, useMemo, useState } from "react"
import cls from "./EditableFormDetailCardRadio.module.scss"
import { classNames } from "shared/lib/classNames/classNames"
import { Radio, RadioItem } from "shared/ui/Radio/Radio"
import { FormQuestion, FormQuestionAnswer } from "../../model/types/form"
import { Text, TextSize, TextTheme } from "shared/ui/Text/Text"
import { Button, ButtonSize } from "shared/ui/Button/Button"
import UndoIcon from "shared/assets/icons/go-back-arrow.svg"
import RemoveIcon from "shared/assets/icons/trash-icon.svg"
import { Input } from "shared/ui/Input/Input"
import { useDebounce } from "shared/lib/hooks/useDebounce"
import { DEBOUNCE_EDIT_FORM } from "shared/consts/debounceTime"
import { ChangeRadioFieldActionPayload, ValidateErrors } from "feautures/EditableFormDetailCard"
import { InputRadioAnswer } from "./InputRadioAnswer"
import { QuestionError, ValidateFormErrors } from "feautures/EditableFormDetailCard/model/types/editableForm"

interface EditableFormDetailCardRadioProps {
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

export const EditableFormDetailCardRadio = memo((props: EditableFormDetailCardRadioProps) => {
	
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

	const [titleValue, setTitleValue] = useState(question?.title ?? "")
	const [descriptionValue, setDescriptionValue] = useState(question?.description ?? "")

	const debouncedChangeRadioField = useDebounce((data: ChangeRadioFieldActionPayload) => {
		onChangeRadioField?.(data)
	}, DEBOUNCE_EDIT_FORM)

	const onChangeTitle = useCallback((value: string) => {
		setTitleValue(value)
		debouncedChangeRadioField({
			newValue: value,
			qIndex,
			fieldType: "title",
			aIndex: -1
		})
	}, [qIndex])

	const onChangeDescription = useCallback((value: string) => {
		setDescriptionValue(value)
		debouncedChangeRadioField({
			newValue: value,
			qIndex,
			fieldType: "description",
			aIndex: -1
		})
	}, [qIndex])

	const onChangeContent = useCallback((value: string, aIndex: number) => {
		debouncedChangeRadioField({
			newValue: value,
			qIndex,
			fieldType: "radio",
			aIndex: aIndex
		})
	}, [qIndex])

	const onDelete = useCallback((aIndex: number) => {
		onDeleteAnswerField?.(qIndex, aIndex)
	}, [])

	return (
		<div className={classNames(cls.EditableFormDetailCardRadio, {}, [className])}>
			<hr className={cls.line}/>
			<div className={cls.questionHeader}>
				<Text title={`Вопрос №${qIndex + 1}`} size={TextSize.ML} />
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
        		value={titleValue}
        		placeholder="Введите название вопроса..."
        		className={cls.input}
        		onChange={onChangeTitle}
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
        		value={descriptionValue}
        		placeholder="Введите описание вопроса..."
        		className={cls.input}
        		onChange={onChangeDescription}
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