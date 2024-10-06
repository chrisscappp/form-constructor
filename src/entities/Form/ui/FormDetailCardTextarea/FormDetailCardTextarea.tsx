import { memo } from "react"
import cls from "./FormDetailCardTextarea.module.scss"
import { classNames } from "shared/lib/classNames/classNames"
import { FormQuestion, FormQuestionAnswer } from "../../model/types/form"
import { Text, TextSize } from "shared/ui/Text/Text"
import { TextArea } from "shared/ui/Textarea/Textarea"

interface FormDetailCardTextareaProps {
	className?: string
	question?: FormQuestion
}

export const FormDetailCardTextarea = memo((props: FormDetailCardTextareaProps) => {
	
	const {
		className,
		question
	} = props

	//const active = question?.activeAnswer as FormQuestionAnswer

	return (
		<div className={classNames(cls.FormDetailCardTextarea, {}, [className])}>
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
			<TextArea
				placeholder={question?.inputPlaceholder || "Введите ответ на вопрос..."}
				readonly={true}
				className={cls.inputField}
			/>
		</div>
	)
})