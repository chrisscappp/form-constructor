import { memo } from "react"
import cls from "./FormDetailCardInput.module.scss"
import { classNames } from "shared/lib/classNames/classNames"
import { Text, TextSize } from "shared/ui/Text/Text"
import { FormQuestion, FormQuestionAnswer } from "../../model/types/form"
import { Input } from "shared/ui/Input/Input"

interface FormDetailCardInputProps {
	className?: string
	question?: FormQuestion
}

export const FormDetailCardInput = memo((props: FormDetailCardInputProps) => {
	
	const {
		className,
		question
	} = props

	//const active = question?.activeAnswer as FormQuestionAnswer

	return (
		<div className={classNames(cls.FormDetailCardInput, {}, [className])}>
			<Text
				title={question?.title}
				size={TextSize.ML}
			/>
			{question?.description && (
				<Text
					text={question.description}
					className={cls.description}
				/>
			)}
			<Input
				placeholder={question?.inputPlaceholder || "Введите ответ на вопрос..."}
				readonly={true}
				className={cls.inputField}
			/>
		</div>
	)
})