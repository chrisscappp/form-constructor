import { memo, useCallback, useEffect, useState } from "react"
import { useParams } from "react-router"
import { Page } from "widgets/Page/Page"
import { useSelector } from "react-redux"
import { FormPageHeader } from "./FormPageHeader/FormPageHeader"
import cls from "./FormPage.module.scss"
import { DeleteFormModal } from "feautures/DeleteForm"
import { FormDetailCard } from "entities/Form"
import { getFormPageError, getFormPageForm, getFormPageIsLoading } from "../model/selectors/formPageSelectors"
import { DynamicModuleLoader, ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader"
import { formDetailReducer } from "../model/slice/formPageSlice"
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch"
import { fetchFormDetail } from "../model/services/fetchFormDetail/fetchFormDetail"
import { VStack } from "shared/ui/Stack"

const reducers: ReducersList = {
	formDetail: formDetailReducer
}

const FormPage = () => {

	const { id } = useParams<{id: string}>()
	const dispath = useAppDispatch()
	const form = useSelector(getFormPageForm)
	const isLoading = useSelector(getFormPageIsLoading)
	const error = useSelector(getFormPageError)
	const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
	
	useEffect(() => {
		dispath(fetchFormDetail({ id: id ?? "0" }))
	}, [])

	const onOpenDeleteModal = useCallback(() => {
		setIsOpenDeleteModal(true)
	}, [])

	const onCloseDeleteModal = useCallback(() => {
		setIsOpenDeleteModal(false)
	}, [])

	return (
		<DynamicModuleLoader reducers={reducers} removeAfterUnmount>
			<Page className={cls.page}>
				<VStack gap="20">
					{!error && (
						<FormPageHeader
							formLink={form?.formLink || ""}
							formId={form?.id ?? ""}
							onOpenModalDelete={onOpenDeleteModal}
						/>
					)}
					<FormDetailCard
						className={cls.form}
						form={form}
						isLoading={isLoading}
						error={error}
					/>
				</VStack>
				{isOpenDeleteModal && (
					<DeleteFormModal
						isOpen={isOpenDeleteModal}
						onClose={onCloseDeleteModal}
						deleteFormId={form?.id ?? ""}
					/>
				)}
			</Page>
		</DynamicModuleLoader>
	)
}

export default memo(FormPage)