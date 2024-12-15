import { classNames } from "shared/lib/classNames/classNames"
import { Suspense } from "react"
import { Modal } from "shared/ui/Modal/Modal"
import { BindAnswerFormAsync } from "../BindAnswerForm/BindAnswerForm.async"
import { Loader } from "shared/ui/Loader/Loader"
import { DynamicModuleLoader, ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader"
import { bindAnswerReducer } from "../../model/slices/bindAnswerSlice"

interface BindAnswerModalProps {
	className?: string,
	isOpen: boolean,
	onClose: () => void,
	excludeQuestionIndex: number,
	bindAnswerIndex: number,
	formId: string
}

const reducers: ReducersList = {
	bindAnswerForm: bindAnswerReducer
}

export const BindAnswerModal = (props: BindAnswerModalProps) => {
	
	const { 
		className, 
		isOpen, 
		onClose, 
		excludeQuestionIndex, 
		bindAnswerIndex,
		formId
	} = props
	
	return (
		<DynamicModuleLoader reducers={reducers}>
			<Modal 
				className={classNames("", {}, [className])}
				isOpen={isOpen}
				onClose={onClose}
			>
				<Suspense fallback = {<Loader/>}>
					<BindAnswerFormAsync
						onClose = {onClose}
						excludeQuestionIndex={excludeQuestionIndex}
						bindAnswerIndex={bindAnswerIndex}
						formId={formId}
					/>
				</Suspense>
			</Modal>
		</DynamicModuleLoader>
	)
}