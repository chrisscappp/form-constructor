import { memo, useCallback, useEffect, useState } from "react"
import cls from "./EditFormCardRadio.module.scss"
import { Button, ButtonSize } from "shared/ui/Button/Button"
import { classNames } from "shared/lib/classNames/classNames"
import { Input } from "shared/ui/Input/Input"
import { FormQuestionAnswer } from "entities/Form/model/types/form"
import { HStack } from "shared/ui/Stack"

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

	const onChangeValue = useCallback((value: string) => {
		setRadioValue(value)
	}, [])
	
	return (
		<HStack 
			className={classNames('', {}, [className])}
			gap="8"
			max
		>
			<Button 
				size={ButtonSize.L} 
				square 
				className={classNames(cls.btn, {}, [cls.answerBtn])}
				title="Удалить ответ"
				onClick={() => onDelete(aIndex)}
			>
				-
			</Button>
			<Input
				placeholder="Введите содержание ответа..."
				value={radioValue}
				onChange={onChangeValue}
				onBlur={() => onChangeContent(radioValue, aIndex)}
			/>
		</HStack>
	)
})