import { memo } from "react"
import cls from "./FormDetailCardInput.module.scss"
import { classNames } from "shared/lib/classNames/classNames"
import { Text, TextSize } from "shared/ui/Text/Text"
import { FormQuestion, FormQuestionAnswer } from "../../model/types/form"
import { Input } from "shared/ui/Input/Input"
import { VStack } from "shared/ui/Stack"

interface FormDetailCardInputProps {
	className?: string
	question?: FormQuestion
}

export const FormDetailCardInput = memo((props: FormDetailCardInputProps) => {
	
	const {
		className,
		question
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
				readonly={true}
				className={cls.inputField}
			/>
		</VStack>
	)
})