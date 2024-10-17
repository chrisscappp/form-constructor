import { classNames } from "shared/lib/classNames/classNames"
import { Suspense } from "react"
import { Modal } from "shared/ui/Modal/Modal"
import { ConfirmEditingFormFormAsync } from "../ConfrimEditingFormForm/ConfrimEditingFormForm.async"
import { Loader } from "shared/ui/Loader/Loader"

interface ConfirmEditingFormModalProps {
	className?: string,
	isOpen: boolean;
	onClose: () => void,
	callback: () => void,
	error?: string
}

export const ConfirmEditingFormModal = (props: ConfirmEditingFormModalProps) => {

	const {
		callback,
		isOpen,
		onClose,
		className,
		error
	} = props

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