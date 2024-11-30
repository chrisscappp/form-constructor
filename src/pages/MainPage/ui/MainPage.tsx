import { FormSimplify, FormSimplifyList } from "entities/Form"
import { memo, useCallback, useEffect, useState } from "react"
import { DynamicModuleLoader, ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader"
import { Page } from "widgets/Page"
import { formsListReducer } from "../model/slice/formsListSlice"
import { useSelector } from "react-redux"
import { getFormsListError, getFormsListForms, getFormsListIsLoading } from "../model/selectors/mainPageSelectors"
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch"
import { DeleteFormModal } from "feautures/DeleteForm"
import { initMainPage } from "../model/services/initMainPage/initMainPage"
import { ReleaseForm } from "feautures/ReleaseForm"

const reducers: ReducersList = {
	forms: formsListReducer
}

const MainPage = () => {
	const dispatch = useAppDispatch()
	const forms = useSelector(getFormsListForms)
	const isLoading = useSelector(getFormsListIsLoading)
	const error = useSelector(getFormsListError)
	const [ isOpenDeleteModal, setIsOpenDeleteModal ] = useState(false)
	const [ isOpenConfirmModal, setIsOpenConfirmModal ] = useState(false)
	const [ formId, setFormId ] = useState("")
	const [ form, setForm ] = useState<FormSimplify>()

	useEffect(() => {
		dispatch(initMainPage())
	}, [])

	const onOpenDeleteModal = useCallback((formId?: string) => {
		if (formId) {
			setIsOpenDeleteModal(true)
			setFormId(formId)
		}
	}, [])

	const onCloseDeleteModal = useCallback(() => {
		setIsOpenDeleteModal(false)
		setFormId("")
	}, [])

	const onStartRelease = useCallback((form?: FormSimplify) => {
		if (form) {
			setIsOpenConfirmModal(true)
			setForm(form)
		}
	}, [])

	const onFinishRelease = useCallback(() => {
		setIsOpenConfirmModal(false)
		setForm(undefined)
	}, [])

	return (
		<DynamicModuleLoader reducers={reducers}>
			<Page>
				<FormSimplifyList
					forms={forms}
					isLoading={isLoading}
					error={error}
					onOpenModalDelete={onOpenDeleteModal}
					onStartRelease={onStartRelease}
				/>
				<ReleaseForm
					isOpen={isOpenConfirmModal}
					onClose={onFinishRelease}
					form={form}
				/>
				{isOpenDeleteModal && (
					<DeleteFormModal
						isOpen={isOpenDeleteModal}
						onClose={onCloseDeleteModal}
						deleteFormId={formId}
					/>
				)}
			</Page>
		</DynamicModuleLoader>
	)
}

export default memo(MainPage)