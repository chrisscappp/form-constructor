import { memo, useMemo } from "react"
import { classNames } from "shared/lib/classNames/classNames"
import cls from "./FormDetailCardCheckbox.module.scss"
import { FormQuestion } from "../../model/types/form"
import { Text, TextSize } from "shared/ui/Text/Text"
import { Checkbox, CheckboxItem } from "shared/ui/CheckBox/CheckBox"
import { VStack } from "shared/ui/Stack"

interface FormDetailCardCheckboxProps {
	className?: string,
	question?: FormQuestion,
	readonly?: boolean
}

export const FormDetailCardCheckbox = memo((props: FormDetailCardCheckboxProps) => {
	
	const {
		className,
		question,
		readonly
	} = props

	const checkboxItems = useMemo(() => {
		return question?.answers?.map((item) => {
			return {
				id: item.id,
				value: item.value,
				content: item.content
			} as CheckboxItem
		})
	}, [])

	return (
		<VStack 
			max
			gap="4"
			className={classNames(cls.FormDetailCardCheckbox, {}, [className])}
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
			<Checkbox
				readonly={readonly}
				name={`form-checkbox-${question?.id}`}
				items={checkboxItems}
				className={cls.checkboxes}
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