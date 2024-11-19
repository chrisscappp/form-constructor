import { memo, useCallback, useState } from "react"
import cls from "./EditFormCardInput.module.scss"
import { classNames } from "shared/lib/classNames/classNames"
import { Text, TextSize, TextTheme } from "shared/ui/Text/Text"
import { FormQuestion } from "entities/Form"
import { Input } from "shared/ui/Input/Input"
import { ChangeInputFieldActionPayload, QuestionError, ValidateFormErrors } from "../../model/types/editForm"
import { Button, ButtonSize } from "shared/ui/Button/Button"
import UndoIcon from "shared/assets/icons/go-back-arrow.svg"
import RemoveIcon from "shared/assets/icons/trash-icon.svg"
import { TextArea } from "shared/ui/Textarea/Textarea"

interface EditFormCardInputProps {
	className?: string,
	question?: FormQuestion,
	qIndex?: number,
    validateErrors?: QuestionError,
	onChangeInputField?: (data: ChangeInputFieldActionPayload) => void,
	onUndoChangesForQuestion?: (qId: number, qIndex: number) => void,
	onDeleteQuestion?: (qIndex: number) => void
}

const validateErrorsTranslate = {
	[ValidateFormErrors.EMPTY_QUESTION_TITLE]: "У вопроса должно быть название!"
}

export const EditFormCardInput = memo((props: EditFormCardInputProps) => {
	
	const {
		className,
		question,
		qIndex = 0,
    	validateErrors,
		onChangeInputField,
		onUndoChangesForQuestion,
		onDeleteQuestion
	} = props

	const [title, setTitle] = useState(question?.title ?? "")
	const [description, setDescription] = useState(question?.description ?? "")
	const [placeholder, setPlaceholder] = useState(question?.inputPlaceholder ?? "")

	const onChangeTitle = useCallback((value: string) => {
		setTitle(value)
	}, [])

	const onChangeDescription = useCallback((value: string) => {
		setDescription(value)
	}, [])

	const onChangePlaceholder = useCallback((value: string) => {
		setPlaceholder(value)
	}, [])

	const onChangeField = useCallback((e: any) => {
		const id = e.target.id
		switch(id) {
			case `input-question-title-${qIndex}`: {
				title !== question?.title && (onChangeInputField?.({
      				newValue: title,
      				qIndex,
      				fieldType: "title"
    			}))
				break
			}
			case `input-question-description-${qIndex}`: {
				description !== question?.description && (onChangeInputField?.({
      				newValue: description,
      				qIndex,
      				fieldType: "description"
    			}))
				break
			}
			case `input-question-hint-${qIndex}`: {
				placeholder !== question?.inputPlaceholder && (onChangeInputField?.({
      				newValue: placeholder,
      				qIndex,
      				fieldType: "placeholder"
    			}))
				break
			}
			default: console.log('asd')
		}
	}, [title, description, placeholder, qIndex, onChangeInputField])

	return (
    	<div
      		className={classNames(cls.EditableFormDetailCardInput, {}, [className])}
    	>
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
      		<Text title={"Текст подсказка:"} size={TextSize.M} className={cls.hint} />
      		{question?.type === "input" ? (
        		<Input
          			value={placeholder}
          			placeholder={"Введите текст подсказку..."}
          			className={cls.input}
          			onChange={onChangePlaceholder}
					onBlur={onChangeField}
					id={`input-question-hint-${qIndex}`}
        		/>
      		) : (
        		<TextArea
          			value={placeholder}
          			placeholder={"Введите текст подсказку..."}
          			className={cls.input}
          			onChange={onChangePlaceholder}
					onBlur={onChangeField}
					id={`input-question-hint-${qIndex}`}
        		/>
      		)}
    </div>
  )
})