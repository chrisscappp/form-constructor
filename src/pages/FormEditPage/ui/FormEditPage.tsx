import { ConfirmActionModal } from "feautures/ConfirmAction"
import { FormEditPageHeader } from "./FormEditPageHeader/FormEditPageHeader"
import { memo, useCallback, useEffect, useState } from "react"
import { Page } from "widgets/Page"
import { useLocation, useNavigate, useParams } from "react-router"
import { routerPath } from "shared/config/routeConfig/routeConfig"
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch"
import cls from "./FormEditPage.module.scss"
import { EditForm, initFormEditFeauture, updateForm } from "feautures/EditForm"
import { VStack } from "shared/ui/Stack"
import { useStore } from "react-redux"
import { ReduxStoreWithManager } from "app/providers/StoreProvider/config/types"

const FormEditPage = () => {
	const { id } = useParams<{ id: string }>()
	const navigate = useNavigate()
	const location = useLocation()
	const dispatch = useAppDispatch()
	const store = useStore() as unknown as ReduxStoreWithManager
	const [ isOpenConfirmModal, setIsOpenConfirmModal ] = useState(false)
	const isCreateFormRoute = location.pathname === "/form/create"

	useEffect(() => {
		dispatch(initFormEditFeauture(isCreateFormRoute ? { id: "0" } : { id: id ?? "0" }))
		return () => {
			store.reducerManager.remove("bindAnswerForm")
      		dispatch({ type: "@REMOVE bindAnswerForm Reducer" })
		}
	}, [isCreateFormRoute])

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

	const onUpdateForm = useCallback(async () => {
		const response = await dispatch(updateForm())
		if (response.meta.requestStatus === "fulfilled") {
			onCloseConfirmModal()
			navigate(routerPath.form + id)
		} else {
			onCloseConfirmModal()
		}
	}, [dispatch])
	
	return (
		<Page className={cls.page}>
			<VStack 
				max
				gap="20"
			>
				<FormEditPageHeader
					isCreateFormRoute = {isCreateFormRoute}
					onUndoChanges={onUndoChanges}
				/>
				<EditForm
					formId={id}
					isCreateFormRoute={isCreateFormRoute}
					onOpenConfirmModal={onOpenConfirmModal}
					onUndoChanges={onUndoChanges}
				/>
			</VStack>
			{isOpenConfirmModal && (
				<ConfirmActionModal
					isOpen={isOpenConfirmModal}
					onClose={onCloseConfirmModal}
					callback={onUpdateForm}
				/>
			)}
		</Page>
	)
}

export default memo(FormEditPage)