import { memo, useMemo } from "react"
import { classNames } from "shared/lib/classNames/classNames"
import cls from "./FormDetailCardListbox.module.scss"
import { FormQuestion } from "../../model/types/form"
import { Listbox, ListboxItem } from "shared/ui/Listbox/Listbox"
import { Text, TextSize } from "shared/ui/Text/Text"
import { VStack } from "shared/ui/Stack"

interface FormDetailCardListboxProps {
	className?: string,
	question?: FormQuestion
}

export const FormDetailCardListbox = memo((props: FormDetailCardListboxProps) => {
	
	const {
		className,
		question
	} = props

	//@ts-ignore
	const listboxItems: ListboxItem[] = useMemo(() => {
		return question?.answers?.map((answer) => {
			return {
				value: answer.value,
				content: answer.content,
				disabled: true
			}
		})
	}) 
	
	return (
		<VStack 
			max
			gap="4"
			className={classNames(cls.FormDetailCardListbox, {}, [className])}
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
			<Listbox
				className={cls.list}
				items={listboxItems}
				onChange={() => {}}
				defaultValue={"Выберите значение"}
			/>
		</VStack>
	)
})