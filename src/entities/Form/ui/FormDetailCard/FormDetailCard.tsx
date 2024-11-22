import { Card } from "shared/ui/Card/Card"
import { FormDetail, FormQuestion } from "../../model/types/form"
import { memo, useCallback } from "react"
import { classNames } from "shared/lib/classNames/classNames"
import cls from "./FormDetailCard.module.scss"
import { Text, TextAlign, TextSize } from "shared/ui/Text/Text"
import CalendarIcon from "shared/assets/icons/calendar-icon.svg"
import EyeIcon from "shared/assets/icons/eye-icon.svg"
import { FormDetailCardInput } from "../FormDetailCardInput/FormDetailCardInput"
import { FormDetailCardTextarea } from "../FormDetailCardTextarea/FormDetailCardTextarea"
import { FormDetailCardRadio } from "../FormDetailCardRadio/FormDetailCardRadio"
import { FormDetailCardCheckbox } from "../FormDetailCardCheckbox/FormDetailCardCheckbox"
import { Loader } from "shared/ui/Loader/Loader"
import { FormDetailCardListbox } from "../FormDetailCardListbox/FormDetailCardListbox"
import { HStack, VStack } from "shared/ui/Stack"

interface FormDetailCardProps {
	form?: FormDetail,
	isLoading?: boolean,
	error?: string,
	className?: string,
}

export const FormDetailCard = memo((props: FormDetailCardProps) => {

	const {
		className,
		error,
		form,
		isLoading
	} = props

	const renderQuestionBlock = useCallback((question: FormQuestion) => {
		switch(question.type) {
			case "input": 
				return <FormDetailCardInput key={question.id} className={cls.question} question={question}/>
			case "textarea":
				return <FormDetailCardTextarea key={question.id} className={cls.question} question={question}/>
			case "radio": 
				return <FormDetailCardRadio key={question.id} className={cls.question} question={question}/>
			case "checkbox":
				return <FormDetailCardCheckbox key={question.id} className={cls.question} question={question}/>
			case "listbox":
				return <FormDetailCardListbox key={question.id} className={cls.question} question={question}/>
			default:
				return null
		}
	}, [])

	if (isLoading) {
		return (
			<Card className={classNames(cls.loaderWrap, {}, [className])}>
				<Loader/>
			</Card>
		)
	}

	if (error) {
		return (
			<HStack 
				className={cls.error}
				max
			>
				<Text
					title={error}
					align={TextAlign.CENTER}
					size={TextSize.L}
				/>
			</HStack>
		)
	}

	return (
		<Card className={classNames(cls.FormCard, {}, [className])}>
			<HStack 
				className={cls.header} 
				justify="between"
				gap="20"
			>
				<VStack gap="4">
					<Text title={form?.title} size={TextSize.XL} />
					{form?.description && (
          				<Text
            				text={form?.description}
            				size={TextSize.L}
          				/>
					)}
				</VStack>
				<VStack gap="4" className={cls.headerAdditional}>
					<HStack gap="4">
            			<CalendarIcon className={cls.calendar} />
            			<Text text={form?.date} />
          			</HStack>
          			<HStack gap="4">
            			<EyeIcon className={cls.eye} />
            			<Text text={String(form?.filled || 0)} />
          			</HStack>
					<Text
						text={`Количество вопросов: ${form?.questionCount || 0}`}
						size={TextSize.M}
					/>
					<Text
						text={`ID: ${form?.id || 0}`}
						size={TextSize.M}
					/>
				</VStack>
			</HStack>
			<VStack 
				max
				gap="20"
				className={cls.questions}
			>
				{form?.questions.map((question) => 
					renderQuestionBlock(question)
				)}	
			</VStack>
		</Card>
	)
})