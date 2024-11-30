import { classNames } from "shared/lib/classNames/classNames"
import { Suspense } from "react"
import { Modal } from "shared/ui/Modal/Modal"
import { ConfirmActionFormAsync } from "../ConfirmActionForm/ConfirmActionForm.async"
import { Loader } from "shared/ui/Loader/Loader"

interface ConfirmActionModalProps {
	className?: string,
	isOpen: boolean;
	onClose: () => void,
	callback: () => void,
	hint?: string
}

export const ConfirmActionModal = (props: ConfirmActionModalProps) => {

	const {
		callback,
		isOpen,
		onClose,
		className,
		hint
	} = props

	return (
		<Modal 
			className={classNames("", {}, [className])}
			isOpen={isOpen}
			onClose={onClose}
		>
			<Suspense fallback={<Loader/>}>
				<ConfirmActionFormAsync
					onClose={onClose}
					callback={callback}
					hint={hint}
				/>
			</Suspense>
		</Modal>
	)
}