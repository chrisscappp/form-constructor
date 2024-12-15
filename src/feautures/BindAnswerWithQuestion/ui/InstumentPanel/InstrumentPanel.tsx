import { memo } from "react"
import { classNames } from "shared/lib/classNames/classNames"
import { HStack, VStack } from "shared/ui/Stack"
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
	
	return (
		<VStack 
			className={classNames(cls.question, {}, [className])} 
			gap="8" 
			justify="start" 
		>
			<Text size={TextSize.ML} text={`${title} | ${fieldTypeTranslate[type]}`}/>
			<HStack gap="8">
				<Button
					className={cls.bindBtn}
					onClick={() => onUnbind?.(String(id))}
					theme={isBinded ? ButtonTheme.ERROR : ButtonTheme.OUTLINE_INVERTED}
				>
					{isBinded ? 'Отвязать' : 'Привязать'}
				</Button>
				<Button className={cls.questionBtn}>
					Перейти
				</Button>
			</HStack>
		</VStack>
	)
})