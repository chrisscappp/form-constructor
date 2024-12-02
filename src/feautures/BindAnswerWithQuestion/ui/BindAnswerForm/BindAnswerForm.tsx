import { memo, useCallback, useEffect } from "react"
import cls from "./BindAnswerForm.module.scss"
import { classNames } from "shared/lib/classNames/classNames"
import { Text, TextSize, TextTheme } from "shared/ui/Text/Text"
import { Form } from "shared/ui/Form/Form"
import { useSelector } from "react-redux"
import { editFormActions } from "feautures/EditForm"
import { Button } from "shared/ui/Button/Button"
import { HStack } from "shared/ui/Stack"
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch"
import { initBindAnswerForm } from "../../model/services/initBindAnswerForm/initBindAnswerForm"
import { getBindAnswerFormBindedAnswer, getBindAnswerFormError, getBindAnswerFormQuestions } from "../../model/selectors/bindAnswerSelectors"
import { bindAnswerActions } from "feautures/BindAnswerWithQuestion/model/slices/bindAnswerSlice"
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
	const answer = useSelector(getBindAnswerFormBindedAnswer)
	const isHasNeedProps = excludeQuestionIndex !== undefined && bindAnswerIndex !== undefined

	useEffect(() => {
		if (isHasNeedProps) {
			dispatch(initBindAnswerForm({ 
				excludeQIndex: excludeQuestionIndex,
				bindAIndex: bindAnswerIndex
			}))
		}
		return () => {
			dispatch(bindAnswerActions.clearState())
		}
	}, [isHasNeedProps, formId, answer])

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

	const onBindAnswerWithQuestion = useCallback((qId: string) => {
		if (isHasNeedProps) {
			dispatch(bindAnswerActions.addBindQuestionId(qId))
			dispatch(editFormActions.bindAnswerWithQuestion({
				qBindId: qId,
				aBindId: String(answer?.id),
				qOriginIndex: excludeQuestionIndex,
				qAnswerIndex: bindAnswerIndex
			}))
		}
	}, [isHasNeedProps, answer])

	const onUnbindAnswerWithQuestion = useCallback((qId: string) => {
		if (isHasNeedProps) {
			dispatch(bindAnswerActions.removeBindQuestionId(qId))
			dispatch(editFormActions.unbindAnswerWithQuestion({
				qBindId: qId,
				aBindId: String(answer?.id),
				qOriginIndex: excludeQuestionIndex,
				qAnswerIndex: bindAnswerIndex
			}))
		}
	}, [isHasNeedProps, answer])

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
			<div className={cls.list}>
				{questions?.map((question) => (
					<InstrumentPanel
						className={cls.question}
						key={question.id}
						answer={answer}
						question={question}
						onBind={onBindAnswerWithQuestion}
						onUnbind={onUnbindAnswerWithQuestion}
					/>
				))}
			</div>
			<HStack className={cls.btns} justify="start" gap="12">
				<Button onClick={onClose} className={cls.doneBtn}>Готово</Button>
			</HStack>
		</Form>
	)
}

export default memo(BindAnswerForm)