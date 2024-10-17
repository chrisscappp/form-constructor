import { ConfirmEditingFormModal } from "feautures/ConfrimEditingForm"
import { FormEditPageHeader } from "./FormEditPageHeader/FormEditPageHeader"
import { memo, useCallback, useEffect, useState } from "react"
import { Page } from "widgets/Page/Page"
import { useLocation, useNavigate, useParams } from "react-router"
import { routerPath } from "shared/config/routeConfig/routeConfig"
import { useSelector } from "react-redux"
import { deepEqualObject } from "shared/lib/functions/deepEqualObject/deepEqualObject"
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch"
import cls from "./FormEditPage.module.scss"
import { FormEditPageFooter } from "./FormEditPageFooter/FormEditPageFooter"
import { AddFormQuestionModal, getAddFormQuestionCount, getAddFormQuestionFieldType, getAddFormQuestionValueType } from "feautures/AddFormQuestion"
import { DynamicModuleLoader, ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader"
import { editFormPageReducer, editFormPageActions } from "../model/slice/editFormSlice"
import { EditForm } from "widgets/EditForm"
import { 
	getEditFormPageError, 
	getEditFormPageForm, 
	getEditFormPageFormData, 
	getEditFormPageIsDebounceActive, 
	getEditFormPageIsLoading,
	getEditFormPageValidateErrors 
} from "../model/selectors/editFormSelectors"
import { ChangeInputFieldActionPayload, ChangeRadioFieldActionPayload } from "../model/types/editPage"
import { createNewForm } from "../model/services/createNewForm/createNewForm"
import { initFormEditPage } from "../model/services/initFormEditPage/initFormEditPage"
import { fetchFormsList } from "pages/MainPage"
import { updateForm } from "../model/services/updateForm/updateForm"

const reducers: ReducersList = {
	editForm: editFormPageReducer
}

const FormEditPage = () => {
	const { id } = useParams<{ id: string }>()
	const navigate = useNavigate()
	const location = useLocation()
	const dispatch = useAppDispatch()
	const isDebounceActive = useSelector(getEditFormPageIsDebounceActive)
	const formDetail = useSelector(getEditFormPageForm)
	const formDetailData = useSelector(getEditFormPageFormData)
	const error = useSelector(getEditFormPageError)
	const isLoading = useSelector(getEditFormPageIsLoading)
	const validateErrors = useSelector(getEditFormPageValidateErrors)
	const addFormQuestionCount = useSelector(getAddFormQuestionCount)
	const addFormQuestionFieldType = useSelector(getAddFormQuestionFieldType)
	const addFormQuestionValueType = useSelector(getAddFormQuestionValueType)
	const [ isOpenConfirmModal, setIsOpenConfirmModal ] = useState(false)
	const [ isOpenAddForm, setIsOpenAddForm ] = useState(false)
	const isCreateFormRoute = location.pathname === "/form/create"

	useEffect(() => {
		dispatch(initFormEditPage(isCreateFormRoute ? { id: "0" } : { id: id ?? "0" }))
	}, [])

	const onOpenAddForm = useCallback(() => {
		setIsOpenAddForm(true)
	}, [isOpenAddForm])

	const onCloseAddForm = useCallback(() => {
		setIsOpenAddForm(false)
	}, [isOpenAddForm])

	const onChangeFormTitle = useCallback((value: string) => {
		dispatch(editFormPageActions.changeFormTitle(value))
	}, [dispatch])

	const onChangeFormDescription = useCallback((value: string) => {
		dispatch(editFormPageActions.changeFormDescription(value))
	}, [dispatch])

	const onChangeInputField = useCallback((data: ChangeInputFieldActionPayload) => {
		dispatch(editFormPageActions.changeInputField(data))
	}, [dispatch])

	const onAddRadioField = useCallback((qIndex: number) => {
		dispatch(editFormPageActions.onAddAnswerField({
			qIndex,
			fieldType: "radio"
		}))
	}, [dispatch])

	const onDeleteAnswerField = useCallback((qIndex: number, aIndex: number) => {
		dispatch(editFormPageActions.onDeleteAnswerField({
			aIndex,
			qIndex
		}))
	}, [dispatch])

	const onChangeRadioField = useCallback((data: ChangeRadioFieldActionPayload) => {
		dispatch(editFormPageActions.changeRadioField(data))
	}, [dispatch])

	const onUndoChangesForQuestion = useCallback((qId: number, qIndex: number) => {
		dispatch(editFormPageActions.undoChangesForQuestion({
			qId,
			qIndex
		}))
	}, [dispatch])

	const onAddQuestion = useCallback(() => {
		if (addFormQuestionCount && addFormQuestionFieldType && addFormQuestionValueType) {
			dispatch(editFormPageActions.addQuestion({
				questionFieldType: addFormQuestionFieldType.value,
				questionsCount: addFormQuestionCount,
				questionValueType: addFormQuestionValueType.value
			}))
			onCloseAddForm()
		}
	}, [dispatch, addFormQuestionCount, addFormQuestionFieldType, addFormQuestionValueType])

	const onDeleteQuestion = useCallback((qIndex: number) => {
		dispatch(editFormPageActions.deleteQuestion(qIndex))
	}, [dispatch])

	const onUndoChanges = useCallback(() => {
		if (isCreateFormRoute) {
			navigate("/")
		} else {
			navigate(routerPath.form + id)
		}
	}, [id, isCreateFormRoute])
	
	const onOpenConfirmModal = useCallback(() => {
		setIsOpenConfirmModal(true)
	}, [])

	const onCloseConfirmModal = useCallback(() => {
		setIsOpenConfirmModal(false)
	}, [])
	
	const onCheckIdentityForm = useCallback(() => {
		if (!isDebounceActive) {
			if (deepEqualObject(formDetail, formDetailData)) {
				navigate(routerPath.form + id)
			} else {
				onOpenConfirmModal()
			}
		}
	}, [dispatch, isDebounceActive, formDetail, formDetailData])

	const onUpdateForm = useCallback(async () => {
		const response = await dispatch(updateForm())
		if (response.meta.requestStatus === "fulfilled") {
			onCloseConfirmModal()
			navigate(routerPath.form + id)
		} else {
			onCloseConfirmModal()
		}
	}, [dispatch])

	const onCreateForm = useCallback(async () => {
		const response = await dispatch(createNewForm())
		if (response.meta.requestStatus === "fulfilled") {
			await dispatch(fetchFormsList())
			navigate("/")
		}
	}, [dispatch])
	
	return (
		<DynamicModuleLoader reducers={reducers} removeAfterUnmount>
			<Page className={cls.page}>
				<FormEditPageHeader
					isCreateFormRoute = {isCreateFormRoute}
					onUndoChanges={onUndoChanges}
				/>
				<EditForm
					className={cls.form}
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
				<FormEditPageFooter
					className={cls.footer}
					onUndoChanges={onUndoChanges}
					onFormAction={isCreateFormRoute ? onCreateForm : onCheckIdentityForm}
				/>
				{isOpenConfirmModal && (
					<ConfirmEditingFormModal
						isOpen={isOpenConfirmModal}
						onClose={onCloseConfirmModal}
						callback={onUpdateForm}
					/>
				)}
				{isOpenAddForm && (
					<AddFormQuestionModal
						isOpen={isOpenAddForm}
						onAddQuestion={onAddQuestion}
						onClose={onCloseAddForm}
					/>
				)}
			</Page>
		</DynamicModuleLoader>
	)
}

export default memo(FormEditPage)