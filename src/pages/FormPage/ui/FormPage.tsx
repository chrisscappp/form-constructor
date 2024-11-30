import { memo, useCallback, useEffect, useState } from "react"
import { useParams } from "react-router"
import { Page } from "widgets/Page"
import { useSelector } from "react-redux"
import { FormPageHeader } from "./FormPageHeader/FormPageHeader"
import cls from "./FormPage.module.scss"
import { DeleteFormModal } from "feautures/DeleteForm"
import { FormDetailCard } from "entities/Form"
import { getFormPageError, getFormPageForm, getFormPageIsLoading, getFormPageReadonly } from "../model/selectors/formPageSelectors"
import { DynamicModuleLoader, ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader"
import { formDetailActions, formDetailReducer } from "../model/slice/formPageSlice"
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch"
import { fetchFormDetail } from "../model/services/fetchFormDetail/fetchFormDetail"
import { VStack } from "shared/ui/Stack"
import { ReleaseForm } from "feautures/ReleaseForm"

const reducers: ReducersList = {
	formDetail: formDetailReducer
}

const FormPage = () => {

	const { id } = useParams<{id: string}>()
	const dispath = useAppDispatch()
	const form = useSelector(getFormPageForm)
	const isLoading = useSelector(getFormPageIsLoading)
	const error = useSelector(getFormPageError)
	const readonly = useSelector(getFormPageReadonly)
	const [ isOpenDeleteModal, setIsOpenDeleteModal ] = useState(false)
	const [ isOpenConfirmModal, setIsOpenConfirmModal ] = useState(false)
	
	useEffect(() => {
		dispath(fetchFormDetail({ id: id ?? "0" }))
	}, [])

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}, [readonly])

	const onOpenDeleteModal = useCallback(() => {
		setIsOpenDeleteModal(true)
	}, [])

	const onCloseDeleteModal = useCallback(() => {
		setIsOpenDeleteModal(false)
	}, [])

	const onStartReleaseForm = useCallback(() => {
		if (form) {
			setIsOpenConfirmModal(true)
		}
	}, [form])

	const onFinishRelease = useCallback(() => {
		setIsOpenConfirmModal(false)
	}, [])

	const onTestingForm = useCallback(() => {
		dispath(formDetailActions.setReadonly(!readonly))
	}, [form, readonly])

	return (
		<DynamicModuleLoader reducers={reducers} removeAfterUnmount>
			<Page className={cls.page}>
				<VStack gap="20">
					{!error && (
						<FormPageHeader
							form={form}
							readonly={readonly}
							onOpenModalDelete={onOpenDeleteModal}
						/>
					)}
					<FormDetailCard
						className={cls.form}
						form={form}
						isLoading={isLoading}
						error={error}
						readonly={readonly}
						onTestingForm={onTestingForm}
						onStartReleaseForm={onStartReleaseForm}
					/>
				</VStack>
				<ReleaseForm
					isOpen={isOpenConfirmModal}
					onClose={onFinishRelease}
					form={form}
				/>
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