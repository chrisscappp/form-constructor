import { memo, useMemo } from "react"
import cls from "./FormDetailCardRadio.module.scss"
import { classNames } from "shared/lib/classNames/classNames"
import { Radio, RadioItem } from "shared/ui/Radio/Radio"
import { FormQuestion, FormQuestionAnswer } from "../../model/types/form"
import { Text, TextSize } from "shared/ui/Text/Text"

interface FormDetailCardRadioProps {
	className?: string,
	question?: FormQuestion
}

export const FormDetailCardRadio = memo((props: FormDetailCardRadioProps) => {
	
	const {
		className,
		question
	} = props

	//@ts-ignore
	const radioItems: RadioItem[] = useMemo(() => {
		return question?.answers?.map((item) => {
			return {
				id: item?.id,
				value: item?.value,
				content: item?.content
			}
		})
	}, [])

	const active = question?.activeAnswer as FormQuestionAnswer

	return (
		<div className={classNames(cls.FormDetailCardRadio, {}, [className])}>
			<Text
				title={question?.title}
				size={TextSize.ML}
			/>
			{question?.description && (
				<Text
					text={question.description}
				/>
			)}
			<Radio
				name={`form-radio-${question?.id}`}
				items={radioItems}
				className={cls.radios}
			/>
		</div>
	)
})