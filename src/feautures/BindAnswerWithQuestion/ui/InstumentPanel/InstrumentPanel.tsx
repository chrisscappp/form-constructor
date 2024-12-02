import { memo } from "react"
import { classNames } from "shared/lib/classNames/classNames"
import { HStack } from "shared/ui/Stack"
import cls from "./InstrumentPanel.module.scss"
import { Button, ButtonSize, ButtonTheme } from "shared/ui/Button/Button"
import { FormQuestion, FormQuestionAnswer } from "entities/Form"
import { Text, TextSize } from "shared/ui/Text/Text"
import { fieldTypeTranslate } from "feautures/EditForm"

interface InstrumentPanelProps {
	className?: string,
	answer?: FormQuestionAnswer,
	question: FormQuestion,
	onBind?: (qId: string) => void,
	onUnbind?: (qId: string) => void
}

export const InstrumentPanel = memo((props: InstrumentPanelProps) => {
	
	const {
		className,
		answer,
		onBind,
		onUnbind,
		question
	} = props

	const { id, title, type } = question
	const isBinded = answer?.bindedQuestionIds.find(aId => aId === String(id))

	let button = (
		<Button
			className={cls.bindBtn}
			onClick={() => onBind?.(String(id))}
			theme={ButtonTheme.OUTLINE_INVERTED}
		>
			Привязать
		</Button>
	)

	if (isBinded) {
		button = (
			<Button
				className={cls.bindBtn}
				onClick={() => onUnbind?.(String(id))}
				theme={ButtonTheme.ERROR}
			>
				Отвязать
			</Button>
		)
	}
	
	return (
		<HStack 
			className={classNames(cls.question, {}, [className])} 
			gap="8" 
			justify="start" 
		>
			<Text size={TextSize.ML} text={`${title} | ${fieldTypeTranslate[type]}`}/>
			{button}
			<Button className={cls.questionBtn}>
				Перейти
			</Button>
		</HStack>
	)
})