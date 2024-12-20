import { memo } from "react"
import cls from "./FormDetailCardInput.module.scss"
import { classNames } from "shared/lib/classNames/classNames"
import { Text, TextSize } from "shared/ui/Text/Text"
import { FormQuestion } from "../../model/types/form"
import { Input } from "shared/ui/Input/Input"
import { VStack } from "shared/ui/Stack"

interface FormDetailCardInputProps {
	className?: string,
	question?: FormQuestion,
	readonly?: boolean
}

export const FormDetailCardInput = memo((props: FormDetailCardInputProps) => {
	
	const {
		className,
		question,
		readonly
	} = props

	return (
		<VStack 
			className={classNames('', {}, [className])}
			max
			gap="4"
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
			<Input
				placeholder={question?.inputPlaceholder || "Введите ответ на вопрос..."}
				readonly={readonly}
				className={cls.inputField}
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