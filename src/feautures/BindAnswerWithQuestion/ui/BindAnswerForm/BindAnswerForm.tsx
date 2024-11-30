import { memo, useCallback, useEffect, useState } from "react"
import cls from "./BindAnswerForm.module.scss"
import { classNames } from "shared/lib/classNames/classNames"
import { Text, TextSize, TextTheme } from "shared/ui/Text/Text"
import { Form } from "shared/ui/Form/Form"
import { useSelector } from "react-redux"
import { editFormActions, fieldTypeTranslate } from "feautures/EditForm"
import { Button, ButtonTheme } from "shared/ui/Button/Button"
import { HStack } from "shared/ui/Stack"
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch"
import { initBindAnswerForm } from "../../model/services/initBindAnswerForm/initBindAnswerForm"
import { getBindAnswerFormBindedAnswer, getBindAnswerFormError, getBindAnswerFormQuestions } from "../../model/selectors/bindAnswerSelectors"
import { Checkbox, CheckboxItem } from "shared/ui/CheckBox/CheckBox"
import { InstrumentPanel } from "../InstumentPanel/InstrumentPanel"

export interface BindAnswerFormProps {
	className?: string,
	onClose?: () => void,
	excludeQuestionIndex?: number,
	bindAnswerIndex?: number,
	formId?: string
}

const BindAnswerForm = (props: BindAnswerFormProps) => {

	const {
		className,
		onClose,
		excludeQuestionIndex,
		bindAnswerIndex,
		formId = ""
	} = props

	const dispatch = useAppDispatch()
	const questions = useSelector(getBindAnswerFormQuestions)
	const error = useSelector(getBindAnswerFormError)
	const bindedAnswer = useSelector(getBindAnswerFormBindedAnswer)
	const [questionBindIds, setQuestionBindIds] = useState<string[]>([])
	const [activeCheckboxItems, setActiveCheckboxItems] = useState<CheckboxItem[]>([])
	const isHasNeedProps = excludeQuestionIndex !== undefined && bindAnswerIndex !== undefined

	// global TODO - вынести бизнес логику в стор

	useEffect(() => {
		if (isHasNeedProps) {
			dispatch(initBindAnswerForm({ 
				excludeQIndex: excludeQuestionIndex,
				bindAIndex: bindAnswerIndex
			}))
		}
	}, [isHasNeedProps, formId, bindedAnswer])

	useEffect(() => {
		if (questions && bindedAnswer) {
			const activeItems = questions.map((question) => {
				const findId = bindedAnswer.bindedQuestionIds?.find(id => id === String(question.id)) 
				if (findId) {
					return {
						id: question.id,
						value: question.id,
						title: question.title
					} as unknown as CheckboxItem
				}
			}).filter(item => item !== undefined)
			//@ts-ignore
			setActiveCheckboxItems(activeItems)
			setQuestionBindIds(bindedAnswer.bindedQuestionIds ?? [])
		}
	}, [questions, bindedAnswer])

	const onKeyDown = useCallback((e: KeyboardEvent) => {
		if (e.key === "esc") {
			onClose?.()
		}
	}, [onClose])

	useEffect(() => {
		window.addEventListener("keydown", onKeyDown)
		return () => {
			removeEventListener("keydown", onKeyDown)
		}
	}, [onKeyDown])

	const onBuildBindedQuestions = useCallback((bindItem: CheckboxItem) => {
		const bindItemId = String(bindItem.id)
		const findItemIndex = questionBindIds.indexOf(bindItemId)
		if (findItemIndex === -1) {
			setQuestionBindIds([...questionBindIds, bindItemId])
			setActiveCheckboxItems([...activeCheckboxItems, bindItem])
		} else {
			const copyIds = [...questionBindIds]
			copyIds.splice(findItemIndex, 1)
			setQuestionBindIds([...copyIds])
			const copyActive = [...activeCheckboxItems]
			copyActive.splice(findItemIndex, 1)
			setActiveCheckboxItems([...copyActive])
			// todo - оптимизировать
		}
	}, [questionBindIds, activeCheckboxItems])

	const onBindAnswerWithQuestion = useCallback(() => {
		if (isHasNeedProps) {
			dispatch(editFormActions.bindAnswerWithQuestion({
				questionBindIds,
				questionOriginIndex: excludeQuestionIndex,
				questionAnswerIndex: bindAnswerIndex
			}))
			onClose?.()
		}
	}, [questionBindIds, isHasNeedProps])

	const checkboxItems = questions?.map((question) => {
		return {
			id: question.id,
			content: `${question.title} | ${fieldTypeTranslate[question.type]}`,
			value: question.id
		} as unknown as CheckboxItem
	})

	console.log('active', activeCheckboxItems)
	console.log('bind ids', questionBindIds)

	return (
		<Form className = {classNames('', {}, [className])}>
			<Text
				title={"Привязать ответ к вопросу"}
				size={TextSize.XL}
			/>
			{error && (
				<Text
					subTitle={error}
					size={TextSize.L}
					theme={TextTheme.ERROR}
					className={cls.error}
				/>
			)}
			<Text
				className={cls.hint}
				text={"Это означает, что при выбранном варианте ответа, далее будет показан конкретный вопрос, или несколько вопросов"}
				size={TextSize.M}
			/>
			<Checkbox
				className={cls.list}
				name="binded-questions"
				items={checkboxItems}
				activeItems={activeCheckboxItems}
				readonly={false}
				onChange={onBuildBindedQuestions}
				additionalContent={<InstrumentPanel/>}
			/>
			<HStack className={cls.btns} justify="start" gap="12">
				<Button onClick={onBindAnswerWithQuestion}>Привязать</Button>
				<Button theme={ButtonTheme.ERROR} onClick={onClose}>Отмена</Button>
			</HStack>
		</Form>
	)
}

export default memo(BindAnswerForm)