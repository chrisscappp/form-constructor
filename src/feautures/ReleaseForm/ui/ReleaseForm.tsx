import { FormSimplify } from "entities/Form"
import { ConfirmActionModal } from "feautures/ConfirmAction"
import { memo, useCallback } from "react"
import { releaseForm } from "../model/services/realiseForm/releaseForm"

interface ReleaseFormProps {
	className?: string,
	isOpen: boolean,
	onClose: () => void,
	form?: FormSimplify
}

export const ReleaseForm = memo((props: ReleaseFormProps) => {
	
	const {
		className,
		form,
		isOpen,
		onClose
	} = props

	const hint = form?.isRealized 
	? "После подтверждения форма перестанет быть доступна для прохождения!" 
	: "После подтверждения форма станет доступной для прохождения!"

	const onRealiseForm = useCallback(async () => {
		if (form) {
			const response = await releaseForm(form)
			if (response) {
				onClose?.()
				window.location.reload()
			}
		}
	}, [form])
	
	return (
		<>
			{isOpen && (
				<ConfirmActionModal
					className={className}
					isOpen={isOpen}
					onClose={onClose}
					callback={onRealiseForm}
					hint={hint}
				/>
			)}
		</>
	)
})