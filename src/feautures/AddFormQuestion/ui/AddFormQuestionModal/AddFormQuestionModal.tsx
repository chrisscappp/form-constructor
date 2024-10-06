import { classNames } from "shared/lib/classNames/classNames"
import { Suspense } from "react"
import { Modal } from "shared/ui/Modal/Modal"
import { AddFormQuestionFormAsync } from "../AddFormQuestionForm/AddFormQuestionForm.async"
import { Loader } from "shared/ui/Loader/Loader"
import { DynamicModuleLoader, ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader"
import { addFormQuestionModalReducer } from "../../modal/slice/addFormSlice"

interface AddFormQuestionModalProps {
	className?: string,
	isOpen: boolean,
	onClose: () => void,
	onAddQuestion: () => void
}

const reducers: ReducersList = {
	addQuestionForm: addFormQuestionModalReducer
}

export const AddFormQuestionModal = ({ className, isOpen, onClose, onAddQuestion }: AddFormQuestionModalProps) => {
	return (
		<DynamicModuleLoader reducers={reducers} removeAfterUnmount>
			<Modal 
				className = {classNames("", {}, [className])}
				isOpen = {isOpen}
				onClose = {onClose}
			>
				<Suspense fallback = {<Loader/>}>
					<AddFormQuestionFormAsync
						onClose = {onClose}
						onAddQuestion = {onAddQuestion}
					/>
				</Suspense>
			</Modal>
		</DynamicModuleLoader>
	)
}