import { memo, useCallback, useState } from "react"
import { DynamicModuleLoader, ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader"
import { editableFormDetailActions, editableFormDetailReducer } from "../model/slice/editableFormSlice"
import { FormDetailCard } from "entities/Form"
import { useSelector } from "react-redux"
import { getEditableFormDetailError, getEditableFormDetailForm, getEditableFormDetailIsLoading, getEditableFormDetailReadonly } from "../model/selectors/editableFormSelectors"
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch"
import { ChangeInputFieldActionPayload, ChangeRadioFieldActionPayload } from "../model/types/editableForm"
import { Button, ButtonTheme } from "shared/ui/Button/Button"
import cls from "./EditableFormDetailCard.module.scss"
import { AddFormQuestionModal, getAddFormQuestionCount, getAddFormQuestionFieldType, getAddFormQuestionValueType } from "feautures/AddFormQuestion"

const reducers: ReducersList = {
	formDetail: editableFormDetailReducer
} 

interface EditableFormDetailCardProps {
	className?: string,
}

export const EditableFormDetailCard = memo((props: EditableFormDetailCardProps) => {
	
	const { className } = props

	const dispatch = useAppDispatch()
	const formDetail = useSelector(getEditableFormDetailForm)
	const isLoading = useSelector(getEditableFormDetailIsLoading)
	const error = useSelector(getEditableFormDetailError)
	const isReadonly = useSelector(getEditableFormDetailReadonly)
	const addFormQuestionCount = useSelector(getAddFormQuestionCount)
	const addFormQuestionFieldType = useSelector(getAddFormQuestionFieldType)
	const addFormQuestionValueType = useSelector(getAddFormQuestionValueType)
	const [isOpenAddForm, setIsOpenAddForm] = useState(false)

	const onOpenAddForm = useCallback(() => {
		setIsOpenAddForm(true)
	}, [isOpenAddForm])

	const onCloseAddForm = useCallback(() => {
		setIsOpenAddForm(false)
	}, [isOpenAddForm])

	const onChangeFormTitle = useCallback((value: string) => {
		dispatch(editableFormDetailActions.changeFormTitle(value))
	}, [dispatch])

	const onChangeFormDescription = useCallback((value: string) => {
		dispatch(editableFormDetailActions.changeFormDescription(value))
	}, [dispatch])

	const onChangeInputField = useCallback((data: ChangeInputFieldActionPayload) => {
		dispatch(editableFormDetailActions.changeInputField(data))
	}, [dispatch])

	const onAddRadioField = useCallback((qIndex: number) => {
		dispatch(editableFormDetailActions.onAddAnswerField({
			qIndex,
			fieldType: "radio"
		}))
	}, [dispatch])

	const onAddCheckboxField = useCallback((qIndex: number) => {
		dispatch(editableFormDetailActions.onAddAnswerField({
			qIndex,
			fieldType: "checkbox"
		}))
	}, [dispatch])

	const onDeleteAnswerField = useCallback((qIndex: number, aIndex: number) => {
		dispatch(editableFormDetailActions.onDeleteAnswerField({
			aIndex,
			qIndex
		}))
	}, [dispatch])

	const onChangeRadioField = useCallback((data: ChangeRadioFieldActionPayload) => {
		dispatch(editableFormDetailActions.changeRadioField(data))
	}, [dispatch])

	const onUndoChangesForQuestion = useCallback((qId: number, qIndex: number) => {
		dispatch(editableFormDetailActions.undoChangesForQuestion({
			qId,
			qIndex
		}))
	}, [dispatch])

	const onAddQuestion = useCallback(() => {
		if (addFormQuestionCount && addFormQuestionFieldType && addFormQuestionValueType) {
			dispatch(editableFormDetailActions.addQuestion({
				questionFieldType: addFormQuestionFieldType.value,
				questionsCount: addFormQuestionCount,
				questionValueType: addFormQuestionValueType.value
			}))
			onCloseAddForm()
		}
	}, [dispatch, addFormQuestionCount, addFormQuestionFieldType, addFormQuestionValueType])

	const onDeleteQuestion = useCallback((qIndex: number) => {
		dispatch(editableFormDetailActions.deleteQuestion(qIndex))
	}, [dispatch])

	return (
		<DynamicModuleLoader reducers={reducers} removeAfterUnmount>
			<FormDetailCard
				form={formDetail}
				isLoading={isLoading}
				error={error}
				isReadonly={isReadonly}
				className={className}
				onOpenAddForm={onOpenAddForm}
				onChangeFormTitle={onChangeFormTitle}
				onChangeFormDescription={onChangeFormDescription}
				onChangeInputField={onChangeInputField}
				onAddRadioField={onAddRadioField}
				onAddCheckboxField={onAddCheckboxField}
				onDeleteAnswerField={onDeleteAnswerField}
				onChangeRadioField={onChangeRadioField}
				onUndoChangesForQuestion={onUndoChangesForQuestion}
				onDeleteQuestion={onDeleteQuestion}
			/>
			{isOpenAddForm && (
				<AddFormQuestionModal
					isOpen={isOpenAddForm}
					onClose={onCloseAddForm}
					onAddQuestion={onAddQuestion}
				/>
			)}
		</DynamicModuleLoader>
	)
})