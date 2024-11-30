import { FormSimplifyList } from "entities/Form"
import { memo, useCallback, useEffect, useState } from "react"
import { DynamicModuleLoader, ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader"
import { Page } from "widgets/Page"
import { formsListReducer } from "../model/slice/formsListSlice"
import { useSelector } from "react-redux"
import { getFormsListError, getFormsListForms, getFormsListIsLoading } from "../model/selectors/mainPageSelectors"
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch"
import { DeleteFormModal } from "feautures/DeleteForm"
import { initMainPage } from "../model/services/initMainPage/initMainPage"

const reducers: ReducersList = {
	forms: formsListReducer
}

const MainPage = () => {
	const dispatch = useAppDispatch()
	const forms = useSelector(getFormsListForms)
	const isLoading = useSelector(getFormsListIsLoading)
	const error = useSelector(getFormsListError)
	const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
	const [deleteFormId, setDeleteFormId] = useState("")

	useEffect(() => {
		dispatch(initMainPage())
	}, [])

	const onOpenDeleteModal = useCallback((formId?: string) => {
		if (formId) {
			setIsOpenDeleteModal(true)
			setDeleteFormId(formId)
		}
	}, [])

	const onCloseDeleteModal = useCallback(() => {
		setIsOpenDeleteModal(false)
		setDeleteFormId("")
	}, [])

	return (
		<DynamicModuleLoader reducers={reducers}>
			<Page>
				<FormSimplifyList
					forms={forms}
					isLoading={isLoading}
					error={error}
					onOpenModalDelete={onOpenDeleteModal}
				/>
				{isOpenDeleteModal && (
					<DeleteFormModal
						isOpen={isOpenDeleteModal}
						onClose={onCloseDeleteModal}
						deleteFormId={deleteFormId}
					/>
				)}
			</Page>
		</DynamicModuleLoader>
	)
}

export default memo(MainPage)