import { memo, useCallback } from "react"
import cls from "./EditableFormDetailCardInput.module.scss"
import { classNames } from "shared/lib/classNames/classNames"
import { Text, TextSize } from "shared/ui/Text/Text"
import { FormQuestion } from "../../model/types/form"
import { Input } from "shared/ui/Input/Input"
import { ChangeInputFieldActionPayload } from "feautures/EditableFormDetailCard"
import { Button, ButtonSize } from "shared/ui/Button/Button"
import UndoIcon from "shared/assets/icons/go-back-arrow.svg"
import RemoveIcon from "shared/assets/icons/trash-icon.svg"
import { TextArea } from "shared/ui/Textarea/Textarea"
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch"

interface EditableFormDetailCardInputProps {
	className?: string,
	question?: FormQuestion,
	qIndex?: number,
	onChangeInputField?: (data: ChangeInputFieldActionPayload) => void,
	onUndoChangesForQuestion?: (qId: number, qIndex: number) => void,
	onDeleteQuestion?: (qIndex: number) => void
}

export const EditableFormDetailCardInput = memo((props: EditableFormDetailCardInputProps) => {
	
	const {
		className,
		question,
		qIndex = 0,
		onChangeInputField,
		onUndoChangesForQuestion,
		onDeleteQuestion
	} = props

	const onChangeTitle = useCallback((value: string) => {
		onChangeInputField?.({
      newValue: value,
      qIndex,
      fieldType: "title"
    })
	}, [])

	const onChangeDescription = useCallback((value: string) => {
		onChangeInputField?.({
			newValue: value,
			qIndex,
			fieldType: "description"
		})
	}, [])

	const onChangePlaceholder = useCallback((value: string) => {
		onChangeInputField?.({
			newValue: value,
			qIndex,
			fieldType: "placeholder"
		})
	}, [])

	return (
    <div
      className={classNames(cls.EditableFormDetailCardInput, {}, [className])}
    >
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
        value={question?.title}
        placeholder="Введите название вопроса..."
        className={cls.input}
        onChange={onChangeTitle}
      />
      <Text title={"Описание:"} size={TextSize.M} className={cls.hint} />
      <Input
        value={question?.description}
        placeholder="Введите описание вопроса..."
        className={cls.input}
        onChange={onChangeDescription}
      />
      <Text title={"Текст подсказка:"} size={TextSize.M} className={cls.hint} />
      {question?.type === "input" ? (
        <Input
          value={question.inputPlaceholder}
          placeholder={"Введите текст подсказку..."}
          className={cls.input}
          onChange={onChangePlaceholder}
        />
      ) : (
        <TextArea
          value={question?.inputPlaceholder}
          placeholder={"Введите текст подсказку..."}
          className={cls.input}
          onChange={onChangePlaceholder}
        />
      )}
    </div>
  )
})