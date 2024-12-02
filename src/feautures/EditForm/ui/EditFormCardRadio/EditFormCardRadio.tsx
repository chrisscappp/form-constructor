import { memo, useCallback, useState } from "react"
import cls from "./EditFormCardRadio.module.scss"
import { classNames } from "shared/lib/classNames/classNames"
import { FormQuestion } from "entities/Form"
import { Text, TextSize, TextTheme } from "shared/ui/Text/Text"
import { Button, ButtonSize, ButtonTheme } from "shared/ui/Button/Button"
import UndoIcon from "shared/assets/icons/go-back-arrow.svg"
import RemoveIcon from "shared/assets/icons/trash-icon.svg"
import { Input } from "shared/ui/Input/Input"
import { 
	ChangeRadioFieldActionPayload, 
	QuestionError, 
	ValidateFormErrors
} from "../../model/types/editForm"
import { InputRadioAnswer } from "./InputRadioAnswer"
import { fieldTypeTranslate } from "../../model/consts/fieldTypeTranslate"
import { HStack, VStack } from "shared/ui/Stack"
import { BindAnswerWithQuestionModal } from "feautures/BindAnswerWithQuestion"
import ConnectionArrowIcon from "shared/assets/icons/connection-arrow.svg"

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
	const [isShowBindModal, setIsShowBindModal] = useState(false)
	const [aIndexValue, setAIndexValue] = useState(-1)

	const onShowBindModal = useCallback((index: number) => {
		setIsShowBindModal(true)
		setAIndexValue(index)
	}, [aIndexValue])

	const onCloseBindModal = useCallback(() => {
		setIsShowBindModal(false)
		setAIndexValue(-1)
	}, [])

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
		<VStack 
			className={classNames(cls.EditableFormDetailCardRadio, {}, [className])}
			gap="8"
			max
		>
			<HStack justify="between" max>
				<Text title={`Вопрос №${qIndex + 1} | ${fieldTypeTranslate[question?.type || 'radio']}`} size={TextSize.ML} />
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
        			className={cls.input}
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
				<Text title={"Ответы:"} size={TextSize.M} />
				<VStack className={cls.answers} gap="8">
					{question?.answers?.length ? question.answers.map((answer, aIndex) => (
						<VStack key={String(answer.value) + answer.id}>
							{validateErrors?.answersErrors && (
								<Text
									theme={TextTheme.ERROR}
									text={validateErrorsTranslate[validateErrors.answersErrors[aIndex] || ValidateFormErrors.EMPTY_ERROR]}
								/>
							)}
							<HStack gap="8">
								<InputRadioAnswer
									answer={answer}
									onChangeContent={onChangeContent}
									aIndex={aIndex}
									onDelete={onDelete}
								/>
								<Button 
									className={cls.btn} 
									square 
									size={ButtonSize.L}
									theme={ButtonTheme.CLEAR}
									title="Привязать ответ к вопросу"
									onClick={() => onShowBindModal(aIndex)}
								>
									<ConnectionArrowIcon className={cls.connection}/>
								</Button>
							</HStack>
						</VStack>
					)) : (
						<Text
							text="Список ответов пуст. Нажмите +, чтобы добавить!"
						/>
					)}
					{validateErrors?.emptyAnswers && (
						<Text
							theme={TextTheme.ERROR} 
							text={validateErrorsTranslate[validateErrors.emptyAnswers]}
						/>
					)}
				</VStack>
			</VStack>
			<Button 
				size={ButtonSize.L} 
				square 
				className={classNames(cls.btn, {}, [cls.plusBtn])}
				title="Добавить ответ"
				onClick={() => onAddRadioField?.(qIndex)}
			>
				+
			</Button>
			{question && question.bindedAnswerIds?.length > 0 && (
				<Text
					text="*вопрос связан с одним из ответов"
					className={cls.bindHint}
				/>
			)}
			{isShowBindModal && (
				<BindAnswerWithQuestionModal
					isOpen={isShowBindModal}
					onClose={onCloseBindModal}
					excludeQuestionIndex={qIndex}
					bindAnswerIndex={aIndexValue}
					formId={question?.formId ?? ""}
				/>
			)}
		</VStack>
	)
})