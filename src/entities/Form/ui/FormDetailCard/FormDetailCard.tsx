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
			default:
				return null
		}
	}, [])

	if (isLoading) {
		return (<Card className={classNames(cls.FormCard, {}, [className])}>
			<div>loading</div>
		</Card>)
	}

	if (error) {
		return (<div className={classNames(cls.error, {}, [className])}>
			<Text
				title={error}
				align={TextAlign.CENTER}
				size={TextSize.L}
			/>
		</div>)
	}

	return (
		<Card className={classNames(cls.FormCard, {}, [className])}>
			<div className={cls.header}>
				<div className={cls.headerInfo}>
					<Text title={form?.title} size={TextSize.XL} />
					{form?.description && (
          				<Text
            				text={form?.description}
            				size={TextSize.L}
            				className={cls.description}
          				/>
					)}
				</div>
				<div className={cls.headerAdditional}>
					<div className={cls.dateWrapper}>
            			<CalendarIcon className={cls.calendar} />
            			<Text text={form?.date} className={cls.date} />
          			</div>
          			<div className={cls.filledWrapper}>
            			<EyeIcon className={cls.eye} />
            			<Text text={String(form?.filled || 0)} className={cls.filled} />
          			</div>
					<Text
						className={cls.count}
						text={`Количество вопросов: ${form?.questionCount || 0}`}
						size={TextSize.M}
					/>
					<Text
						className={cls.count}
						text={`ID: ${form?.id || 0}`}
						size={TextSize.M}
					/>
				</div>
			</div>
			<div className={cls.body}>
				{form?.questions.map((question) => 
					renderQuestionBlock(question)
				)}	
			</div>
		</Card>
	)
})