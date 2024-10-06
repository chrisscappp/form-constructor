import { Mods, classNames } from "shared/lib/classNames/classNames"
import { MutableRefObject, ReactNode, useCallback, useEffect, useRef, useState } from "react"
import { Portal } from "../Portal/Portal"
import cls from "./Modal.module.scss"

interface ModalProps {
	className?: string;
	isOpen?: boolean;
	onClose?: () => void;
	lazy?: boolean;
	children?: ReactNode;
}

const CLOSE_DELAY = 300

export const Modal = (props: ModalProps) => {

	const { 
		className,
		isOpen,
		onClose,
		lazy,
		children
	} = props
	
	const [ isClosing, setIsClosing ] = useState<boolean>()
	const [ isMounted, setIsMounted ] = useState<boolean>()
	const timerRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>

	useEffect(() => {
		if (isOpen) {
			setIsMounted(true)
		}
	}, [isOpen])

	const handleClose = useCallback(() => {
		if (onClose) {
			setIsClosing(true)
			timerRef.current = setTimeout(() => {
				onClose()
				setIsClosing(false)
				setIsMounted(false)
			}, CLOSE_DELAY)
		}
	}, [onClose])

	const onClickContent = (e: React.MouseEvent) => {
		e.stopPropagation()
	}

	const onKeyDown = useCallback((e: KeyboardEvent) => {
		if (e.key === "Escape") {
			handleClose()
		}
	}, [handleClose])

	useEffect(() => {
		if (isOpen) {
			window.addEventListener("keydown", onKeyDown)
		}
		
		return () => {
			clearTimeout(timerRef.current)
			removeEventListener("keydown", onKeyDown)
			setIsMounted(false)
		}
	}, [isOpen, onKeyDown])

	const mods: Mods = {
		[cls.opened]: isOpen,
		[cls.isClosing]: isClosing,
		[cls.contentOpened]: isMounted
	}

	return (
		<Portal>
			<div 
				className = {classNames(cls.Modal, mods, [className, "app_modal"])}
			>
				<div className = {cls.overlay} onClick = {handleClose}>
					<div className = {classNames(cls.content, mods, [])} onClick = {onClickContent}>
						{children}
					</div>
				</div>
			</div>
		</Portal>
	)
}