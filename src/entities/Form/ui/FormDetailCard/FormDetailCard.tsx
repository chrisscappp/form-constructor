import { Card } from "shared/ui/Card/Card"
import { FormDetail, FormQuestion } from "../../model/types/form"
import { memo, useCallback } from "react"
import { classNames, Mods } from "shared/lib/classNames/classNames"
import cls from "./FormDetailCard.module.scss"
import { Text, TextAlign, TextSize, TextTheme } from "shared/ui/Text/Text"
import CalendarIcon from "shared/assets/icons/calendar-icon.svg"
import EyeIcon from "shared/assets/icons/eye-icon.svg"
import { FormDetailCardInput } from "../FormDetailCardInput/FormDetailCardInput"
import { FormDetailCardTextarea } from "../FormDetailCardTextarea/FormDetailCardTextarea"
import { FormDetailCardRadio } from "../FormDetailCardRadio/FormDetailCardRadio"
import { FormDetailCardCheckbox } from "../FormDetailCardCheckbox/FormDetailCardCheckbox"
import { Loader } from "shared/ui/Loader/Loader"
import { FormDetailCardListbox } from "../FormDetailCardListbox/FormDetailCardListbox"
import { HStack, VStack } from "shared/ui/Stack"
import { Button, ButtonTheme } from "shared/ui/Button/Button"

interface FormDetailCardProps {
	form?: FormDetail,
	isLoading?: boolean,
	error?: string,
	className?: string,
	readonly?: boolean,
	onTestingForm?: () => void,
	onStartReleaseForm?: () => void
}

export const FormDetailCard = memo((props: FormDetailCardProps) => {

	const {
		className,
		error,
		form,
		isLoading,
		onTestingForm,
		onStartReleaseForm,
		readonly
	} = props

	const renderQuestionBlock = useCallback((question: FormQuestion) => {
		const classes = classNames(cls.question, {[cls.binded]: question.bindedAnswerIds?.length > 0}, []) 
		switch(question.type) {
			case "input": 
				return <FormDetailCardInput key={question.id} className={classes} question={question} readonly={readonly}/>
			case "textarea":
				return <FormDetailCardTextarea key={question.id} className={classes} question={question} readonly={readonly}/>
			case "radio": 
				return <FormDetailCardRadio key={question.id} className={classes} question={question} readonly={readonly}/>
			case "checkbox":
				return <FormDetailCardCheckbox key={question.id} className={classes} question={question} readonly={readonly}/>
			case "listbox":
				return <FormDetailCardListbox key={question.id} className={classes} question={question} readonly={readonly}/>
			default:
				return null
		}
	}, [readonly])

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

	const mods: Mods = {
		[cls.releaseForm]: form?.isRealized ?? false
	}

	return (
		<Card className={classNames(cls.FormCard, mods, [className])}>
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
					{form?.isRealized && (
            			<Text
              				className={cls.release}
              				text="Форма доступна для прохождения!"
              				theme={TextTheme.SUCCESS}
              				size={TextSize.ML}
            			/>
          			)}
				</VStack>
				{readonly && (
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
				)}
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
			<HStack className={cls.btns} align="end" gap="12" justify="end">
				<Button
            		className={cls.realiseBtn}
            		onClick={onStartReleaseForm}
          		>
            		{form?.isRealized
              			? "Закрыть для прохождения"
              			: "Открыть для прохождения"}
          		</Button>
				<Button 
					className={cls.testBtn} 
					theme={readonly ? ButtonTheme.BACKGROUND : ButtonTheme.ERROR}
					onClick={onTestingForm}
				>
					{readonly ? "Тест формы" : "Завершить"}
				</Button>
			</HStack>
		</Card>
	)
})