import { FormSimplifyList } from "entities/Form"
import { memo, useCallback, useEffect, useState } from "react"
import { DynamicModuleLoader, ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader"
import { Page } from "widgets/Page/Page"
import { formsListActions, formsListReducer } from "../model/slice/formsListSlice"
import { useSelector } from "react-redux"
import { getFormsListError, getFormsListForms, getFormsListInited, getFormsListIsLoading } from "../model/selectors/mainPageSelectors"
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch"
import { DeleteFormModal, getDeleteFormModalDeleteConfirmed } from "feautures/DeleteForm"
import { getEditableFormDetailReadonly } from "feautures/EditableFormDetailCard/model/selectors/editableFormSelectors"

const reducers: ReducersList = {
	forms: formsListReducer
}

const MainPage = () => {
	const dispatch = useAppDispatch()
	const forms = useSelector(getFormsListForms)
	const isLoading = useSelector(getFormsListIsLoading)
	const error = useSelector(getFormsListError)
	const inited = useSelector(getFormsListInited)
	const isDeleteConfirmed = useSelector(getDeleteFormModalDeleteConfirmed)
	const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)

	useEffect(() => {
		if (!inited) {
			dispatch(formsListActions.initState())
			// затем вызвать здесь сервис получения форм
		}
		if (isDeleteConfirmed) {
			// подгружаем новый список форм
		}
	}, [isDeleteConfirmed])

	const onOpenDeleteModal = useCallback(() => {
		setIsOpenDeleteModal(true)
	}, [isOpenDeleteModal])

	const onCloseDeleteModal = useCallback(() => {
		setIsOpenDeleteModal(false)
	}, [isOpenDeleteModal])

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
					/>
				)}
			</Page>
		</DynamicModuleLoader>
	)
}

export default memo(MainPage)