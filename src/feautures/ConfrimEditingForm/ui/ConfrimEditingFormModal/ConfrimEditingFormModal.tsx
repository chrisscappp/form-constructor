import { classNames } from "shared/lib/classNames/classNames"
import { Suspense } from "react"
import { Modal } from "shared/ui/Modal/Modal"
import { ConfirmEditingFormFormAsync } from "../ConfrimEditingFormForm/ConfrimEditingFormForm.async"
import { Loader } from "shared/ui/Loader/Loader"

interface ConfirmEditingFormModalProps {
	className?: string,
	isOpen: boolean;
	onClose: () => void,
	callback: () => void
}

export const ConfirmEditingFormModal = ({ className, isOpen, onClose, callback }: ConfirmEditingFormModalProps) => {

	return (
		<Modal 
			className = {classNames("", {}, [className])}
			isOpen = {isOpen}
			onClose = {onClose}
		>
			<Suspense fallback = {<Loader/>}>
				<ConfirmEditingFormFormAsync
					onClose = {onClose}
					callback={callback}
				/>
			</Suspense>
		</Modal>
	)
}