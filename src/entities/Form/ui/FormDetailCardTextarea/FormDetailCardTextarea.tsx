import { memo } from "react"
import cls from "./FormDetailCardTextarea.module.scss"
import { classNames } from "shared/lib/classNames/classNames"
import { FormQuestion, FormQuestionAnswer } from "../../model/types/form"
import { Text, TextSize } from "shared/ui/Text/Text"
import { TextArea } from "shared/ui/Textarea/Textarea"
import { VStack } from "shared/ui/Stack"

interface FormDetailCardTextareaProps {
	className?: string,
	question?: FormQuestion,
	readonly?: boolean
}

export const FormDetailCardTextarea = memo((props: FormDetailCardTextareaProps) => {
	
	const {
		className,
		question,
		readonly
	} = props

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
			<TextArea
				placeholder={question?.inputPlaceholder || "Введите ответ на вопрос..."}
				readonly={readonly}
				className={cls.inputField}
			/>
		</VStack>
	)
})