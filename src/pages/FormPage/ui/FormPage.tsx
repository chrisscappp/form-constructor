import { memo, useCallback, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { Page } from "widgets/Page/Page"
import { useSelector } from "react-redux"
import { FormPageHeader } from "./FormPageHeader/FormPageHeader"
import cls from "./FormPage.module.scss"
import { DeleteFormModal, getDeleteFormModalDeleteConfirmed } from "feautures/DeleteForm"
import { 
	EditableFormDetailCard, 
	getEditableFormDetailForm, 
	getEditableFormDetailFormData,
	editableFormDetailActions,
	getEditableFormDetailReadonly,
	getEditableFormDetailIsDebounceActive
} from "feautures/EditableFormDetailCard"
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch"
import { ConfirmEditingFormModal } from "feautures/ConfrimEditingForm"
import { deepEqualObject } from "shared/lib/functions/deepEqualObject/deepEqualObject"
import { FormPageFooter } from "./FormPageFooter/FormPageFooter"
import { validateFormCard } from "feautures/EditableFormDetailCard"

const FormPage = () => {

	const { id } = useParams<{id: string}>()
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const formDetail = useSelector(getEditableFormDetailForm)
	const formDetailData = useSelector(getEditableFormDetailFormData)
	const isDeleteConfirmed = useSelector(getDeleteFormModalDeleteConfirmed)
	const isReadonly = useSelector(getEditableFormDetailReadonly)
	const isDebounceActive = useSelector(getEditableFormDetailIsDebounceActive)
	const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
	const [isOpenCofirmModal, setIsOpenConfirmModal] = useState(false)
	
	useEffect(() => {
		if (isDeleteConfirmed) {
			navigate("/")
		}
	}, [isDeleteConfirmed])

	const onOpenDeleteModal = useCallback(() => {
		setIsOpenDeleteModal(true)
	}, [isOpenDeleteModal])

	const onCloseDeleteModal = useCallback(() => {
		setIsOpenDeleteModal(false)
	}, [isOpenDeleteModal])

	const onOpenConfirmModal = useCallback(() => {
		setIsOpenConfirmModal(true)
	}, [isOpenDeleteModal])

	const onCloseConfirmModal = useCallback(() => {
		setIsOpenConfirmModal(false)
	}, [isOpenDeleteModal])

	const onEditFormDetailCard = useCallback(() => {
		dispatch(editableFormDetailActions.setReadonly(false))
	}, [dispatch])

	const onUndoChangesForForm = useCallback(() => {
		dispatch(editableFormDetailActions.undoChangesForForm())
	}, [dispatch])

	const onCheckIdentityForm = useCallback(() => {
		if (!isDebounceActive) {
			if (deepEqualObject(formDetail, formDetailData)) {
				dispatch(editableFormDetailActions.setReadonly(true))
			} else {
				onOpenConfirmModal()
			}
		}
	}, [dispatch, isDebounceActive, formDetail, formDetailData])

	const onUpdateForm = useCallback(() => {
		// временная мера
		const approveValue = "[\"\",\"\",{}]"
		const validateErrors = validateFormCard(formDetail)
		dispatch(editableFormDetailActions.validateFormCard(formDetail))
		const values = JSON.stringify(Object.values(validateErrors))
		if (formDetail && values === approveValue) {
			alert('Улетает запрос на сервак...')
			dispatch(editableFormDetailActions.setReadonly(true))
			onCloseConfirmModal()
		} else {
			onCloseConfirmModal()
		}
	}, [dispatch, formDetail])
	
	return (
			<Page className={cls.page}>
				<FormPageHeader
					isReadonly={isReadonly}
					formLink={formDetail?.formLink || ""}
					onOpenModalDelete={onOpenDeleteModal}
					onEditForm={onEditFormDetailCard}
					onUndoChanges={onUndoChangesForForm}
				/>
				<EditableFormDetailCard
					className={cls.form}
				/>
				<FormPageFooter
					className={cls.footer}
					onUndoChanges={onUndoChangesForForm}
					onCheckIdentityForm={onCheckIdentityForm}
					isReadonly={isReadonly}
				/>
				{isOpenDeleteModal && (
					<DeleteFormModal
						isOpen={isOpenDeleteModal}
						onClose={onCloseDeleteModal}
					/>
				)}
				{isOpenCofirmModal && (
					<ConfirmEditingFormModal
						isOpen={isOpenCofirmModal}
						onClose={onCloseConfirmModal}
						callback={onUpdateForm}
					/>
				)}
			</Page>
	)
}

export default memo(FormPage)