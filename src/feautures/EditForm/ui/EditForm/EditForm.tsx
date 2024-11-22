import { memo, useCallback, useState } from "react"
import { EditFormCard } from "../EditFormCard/EditFormCard"
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch"
import { ChangeInputFieldActionPayload, ChangeRadioFieldActionPayload } from "../../model/types/editForm"
import { editFormActions, editFormReducer } from "../../model/slice/editFormSlice"
import { useSelector } from "react-redux"
import { AddFormQuestionModal, getAddFormQuestionCount, getAddFormQuestionFieldType, getAddFormQuestionValueType } from "feautures/AddFormQuestion"
import { DynamicModuleLoader, ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader"
import { FormEditFooter } from "../FormEditFooter/FormEditFooter"
import { deepEqualObject } from "shared/lib/functions/deepEqualObject/deepEqualObject"
import { createNewForm } from "../../model/services/createNewForm/createNewForm"
import { fetchFormsList } from "pages/MainPage"
import { 
	getEditFormCardError, 
	getEditFormCardForm, 
	getEditFormCardFormData,
	getEditFormCardIsDebounceActive, 
	getEditFormCardIsLoading, 
	getEditFormCardValidateErrors
} from "../../model/selectors/editFormSelectors"
import { useNavigate } from "react-router"
import { routerPath } from "shared/config/routeConfig/routeConfig"

const reducers: ReducersList = {
	editForm: editFormReducer
}

interface EditFromProps {
	formId?: string,
	onOpenConfirmModal?: () => void,
	onUndoChanges?: () => void,
	isCreateFormRoute?: boolean
}

const EditForm = ({ formId, isCreateFormRoute, onOpenConfirmModal, onUndoChanges }: EditFromProps) => {

	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const [isOpenAddForm, setIsOpenAddForm] = useState(false)
	const addFormQuestionCount = useSelector(getAddFormQuestionCount)
	const addFormQuestionFieldType = useSelector(getAddFormQuestionFieldType)
	const addFormQuestionValueType = useSelector(getAddFormQuestionValueType)
	const isDebounceActive = useSelector(getEditFormCardIsDebounceActive)
	const formDetail = useSelector(getEditFormCardForm)
	const formDetailData = useSelector(getEditFormCardFormData)
	const error = useSelector(getEditFormCardError)
	const isLoading = useSelector(getEditFormCardIsLoading)
	const validateErrors = useSelector(getEditFormCardValidateErrors)
	
	const onOpenAddForm = useCallback(() => {
		setIsOpenAddForm(true)
	}, [isOpenAddForm])

	const onCloseAddForm = useCallback(() => {
		setIsOpenAddForm(false)
	}, [isOpenAddForm])

	const onChangeFormTitle = useCallback((value: string) => {
		dispatch(editFormActions.changeFormTitle(value))
	}, [dispatch])

	const onChangeFormDescription = useCallback((value: string) => {
		dispatch(editFormActions.changeFormDescription(value))
	}, [dispatch])

	const onChangeInputField = useCallback((data: ChangeInputFieldActionPayload) => {
		dispatch(editFormActions.changeInputField(data))
	}, [dispatch])

	const onAddRadioField = useCallback((qIndex: number) => {
		dispatch(editFormActions.onAddAnswerField({
			qIndex,
			fieldType: "radio"
		}))
	}, [dispatch])

	const onDeleteAnswerField = useCallback((qIndex: number, aIndex: number) => {
		dispatch(editFormActions.onDeleteAnswerField({
			aIndex,
			qIndex
		}))
	}, [dispatch])

	const onChangeRadioField = useCallback((data: ChangeRadioFieldActionPayload) => {
		dispatch(editFormActions.changeRadioField(data))
	}, [dispatch])

	const onUndoChangesForQuestion = useCallback((qId: number, qIndex: number) => {
		dispatch(editFormActions.undoChangesForQuestion({
			qId,
			qIndex
		}))
	}, [dispatch])

	const onAddQuestion = useCallback(() => {
		if (addFormQuestionCount && addFormQuestionFieldType && addFormQuestionValueType) {
			dispatch(editFormActions.addQuestion({
				questionFieldType: addFormQuestionFieldType.value,
				questionsCount: addFormQuestionCount,
				questionValueType: addFormQuestionValueType.value
			}))
			onCloseAddForm()
		}
	}, [dispatch, addFormQuestionCount, addFormQuestionFieldType, addFormQuestionValueType])

	const onDeleteQuestion = useCallback((qIndex: number) => {
		dispatch(editFormActions.deleteQuestion(qIndex))
	}, [dispatch])

	const onCheckIdentityForm = useCallback(() => {
		if (!isDebounceActive) {
			if (deepEqualObject(formDetail, formDetailData)) {
				navigate(routerPath.form + formId)
			} else {
				onOpenConfirmModal?.()
			}
		}
	}, [dispatch, isDebounceActive, formDetail, formDetailData])

	const onCreateForm = useCallback(async () => {
		const response = await dispatch(createNewForm())
		if (response.meta.requestStatus === "fulfilled") {
			await dispatch(fetchFormsList())
			navigate("/")
		}
	}, [dispatch])
	
	return (
		<DynamicModuleLoader reducers={reducers} removeAfterUnmount>
			<EditFormCard
				form={formDetail}
				error={error}
				isLoading={isLoading}
				onAddRadioField={onAddRadioField}
				onChangeFormDescription={onChangeFormDescription}
				onChangeFormTitle={onChangeFormTitle}
				onChangeInputField={onChangeInputField}
				onChangeRadioField={onChangeRadioField}
				onDeleteAnswerField={onDeleteAnswerField}
				onDeleteQuestion={onDeleteQuestion}
				onOpenAddForm={onOpenAddForm}
				onUndoChangesForQuestion={onUndoChangesForQuestion}
				validateErrors={validateErrors}
			/>
			<FormEditFooter
				onUndoChanges={onUndoChanges}
				onFormAction={isCreateFormRoute ? onCreateForm : onCheckIdentityForm}
			/>
			{isOpenAddForm && (
				<AddFormQuestionModal
					isOpen={isOpenAddForm}
					onAddQuestion={onAddQuestion}
					onClose={onCloseAddForm}
				/>
			)}
		</DynamicModuleLoader>
	)
}

export default memo(EditForm)