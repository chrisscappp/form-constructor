import { memo, useMemo } from "react"
import { classNames } from "shared/lib/classNames/classNames"
import cls from "./EditableFormDetailCardCheckbox.module.scss"
import { FormQuestion, FormQuestionAnswer } from "../../model/types/form"
import { Text, TextSize } from "shared/ui/Text/Text"
import { Checkbox, CheckboxItem } from "shared/ui/CheckBox/CheckBox"

interface EditableFormDetailCardCheckboxProps {
	className?: string,
	question?: FormQuestion
}

export const EditableFormDetailCardCheckbox = memo((props: EditableFormDetailCardCheckboxProps) => {
	
	const {
		className,
		question
	} = props

	//@ts-ignore
	const checkboxItems: CheckboxItem[] = useMemo(() => {
		return question?.answers?.map((item) => {
			return {
				id: item.id,
				value: item.value,
				content: item.content
			}
		})
	}, [])

	return (
		<div className={classNames(cls.EditableFormDetailCardCheckbox, {}, [className])}>
			<hr className={cls.line}/>
			<Text
				title={question?.title}
				size={TextSize.ML}
			/>
			{question?.description && (
				<Text
					text={question.description}
				/>
			)}
			<Checkbox
				name={`form-checkbox-${question?.id}`}
				items={checkboxItems}
				className={cls.radios}
			/>
		</div>
	)
})