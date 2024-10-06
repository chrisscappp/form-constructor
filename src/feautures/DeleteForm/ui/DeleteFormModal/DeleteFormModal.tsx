import { classNames } from "shared/lib/classNames/classNames"
import { Suspense } from "react"
import { Modal } from "shared/ui/Modal/Modal"
import { DeleteFormFormAsync } from "../DeleteFormForm/DeleteFormForm.async"
import { Loader } from "shared/ui/Loader/Loader"
import { DynamicModuleLoader, ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader"
import { deleteFormModalReducer } from "../../modal/slice/deleteModalFormSlice"

interface DeleteFormModalProps {
	className?: string;
	isOpen: boolean;
	onClose: () => void;
}

const initialReducers: ReducersList = {
	deleteForm: deleteFormModalReducer
}

export const DeleteFormModal = ({ className, isOpen, onClose }: DeleteFormModalProps) => {

	return (
		<DynamicModuleLoader reducers={initialReducers} removeAfterUnmount>
			<Modal 
				className = {classNames("", {}, [className])}
				isOpen = {isOpen}
				onClose = {onClose}
			>
				<Suspense fallback = {<Loader/>}>
					<DeleteFormFormAsync
						onClose = {onClose}
					/>
				</Suspense>
			</Modal>
		</DynamicModuleLoader>
	)
}