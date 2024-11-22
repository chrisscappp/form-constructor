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
import { fieldTypeTranslate } from "../../model/consts/fieldTypeTranslate"
import { HStack, VStack } from "shared/ui/Stack"

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
    	<VStack
      		className={classNames(cls.EditableFormDetailCardInput, {}, [className])}
			gap="8"
			max
    	>
      		<HStack justify="between" max>
        		<Text title={`Вопрос №${qIndex + 1} | ${fieldTypeTranslate[question?.type || 'input']}`} size={TextSize.ML} />
        		<HStack gap="4">
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
            			className={cls.btn}
            			onClick={() => onDeleteQuestion?.(qIndex)}
          			>
            			<RemoveIcon className={cls.icon} />
          			</Button>
        		</HStack>
      		</HStack>
			<VStack max gap="4">
				<Text title={"Заголовок:"} size={TextSize.M} />
				{validateErrors?.title && (
					<Text
						theme={TextTheme.ERROR} 
						text={validateErrorsTranslate[validateErrors.title]}
					/>
				)}
      			<Input
        			value={title}
        			placeholder="Введите название вопроса..."
					onChange={onChangeTitle}
					onBlur={onChangeField}
					id={`input-question-title-${qIndex}`}
      			/>
			</VStack>
			<VStack max gap="4">
				<Text title={"Описание:"} size={TextSize.M} />
      			<Input
        			value={description}
        			placeholder="Введите описание вопроса..."
        			onChange={onChangeDescription}
					onBlur={onChangeField}
					id={`input-question-description-${qIndex}`}
      			/>
			</VStack>
			<VStack max gap="4">
				<Text title={"Текст подсказка:"} size={TextSize.M} />
      			{question?.type === "input" ? (
        			<Input
          				value={placeholder}
          				placeholder={"Введите текст подсказку..."}
          				onChange={onChangePlaceholder}
						onBlur={onChangeField}
						id={`input-question-hint-${qIndex}`}
        			/>
      			) : (
        			<TextArea
          				value={placeholder}
          				placeholder={"Введите текст подсказку..."}
          				onChange={onChangePlaceholder}
						onBlur={onChangeField}
						id={`input-question-hint-${qIndex}`}
        			/>
      			)}
			</VStack>
    </VStack>
  )
})