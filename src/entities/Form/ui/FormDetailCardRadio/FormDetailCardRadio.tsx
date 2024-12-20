import { memo, useMemo } from "react"
import { classNames } from "shared/lib/classNames/classNames"
import { Radio, RadioItem } from "shared/ui/Radio/Radio"
import { FormQuestion } from "../../model/types/form"
import { Text, TextSize } from "shared/ui/Text/Text"
import { VStack } from "shared/ui/Stack"
import cls from "./FormDetailCardRadio.module.scss"

interface FormDetailCardRadioProps {
	className?: string,
	question?: FormQuestion,
	readonly?: boolean
}

export const FormDetailCardRadio = memo((props: FormDetailCardRadioProps) => {
	
	const {
		className,
		question,
		readonly
	} = props

	const radioItems = useMemo(() => {
		return question?.answers?.map((item) => {
			return {
				id: item?.id,
				value: item?.value,
				content: item?.content
			} as RadioItem
		})
	}, [])

	return (
		<VStack 
			max
			gap="4"
			className={classNames('', {}, [className])}
		>
			<Text
				title={question?.title}
				size={TextSize.L}
			/>
			{question?.description && (
				<Text
					text={question.description}
				/>
			)}
			<Radio
				readonly={readonly}
				name={`form-radio-${question?.id}`}
				items={radioItems}
				className={cls.radios}
			/>
			{question && question.bindedAnswerIds?.length > 0 && (
				<Text
					text="*вопрос связан с одним из ответов"
					className={cls.bindHint}
				/>
			)}
		</VStack>
	)
})