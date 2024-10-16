import { memo, useCallback, useEffect, useState } from "react"
import cls from "./EditFormCardRadio.module.scss"
import { Button, ButtonSize } from "shared/ui/Button/Button"
import { classNames } from "shared/lib/classNames/classNames"
import { Input } from "shared/ui/Input/Input"
import { FormQuestionAnswer } from "entities/Form/model/types/form"

interface InputRadioAnswerProps {
	className?: string,
	onChangeContent: (value: string, aIndex: number) => void,
	answer: FormQuestionAnswer,
	aIndex: number,
	onDelete: (aIndex: number) => void
}

export const InputRadioAnswer = memo((props: InputRadioAnswerProps) => {
	
	const { 
		className, 
		onChangeContent, 
		answer,
		aIndex,
		onDelete
	} = props

	const [radioValue, setRadioValue] = useState(answer.content)

	useEffect(() => {
		setRadioValue(answer.content)
	}, [answer])

	const onChangeRadioValue = useCallback((value: string, aIndex: number) => {
		setRadioValue(value)
		onChangeContent(value, aIndex)
	}, [])
	
	return (
		<div className={classNames(cls.answer, {}, [className])}>
			<Button 
				size={ButtonSize.L} 
				square 
				className={classNames(cls.btn, {}, [cls.answerBtn])}
				title="Удалить"
				onClick={() => onDelete(aIndex)}
			>
				-
			</Button>
			<Input
				placeholder="Введите содержание вопроса..."
				className={cls.inputAnswer}
				value={radioValue}
				onChange={(value) => onChangeRadioValue(value, aIndex)}
			/>
		</div>
	)
})