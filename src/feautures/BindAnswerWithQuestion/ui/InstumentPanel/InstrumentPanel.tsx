import { memo } from "react"
import { classNames } from "shared/lib/classNames/classNames"
import { HStack } from "shared/ui/Stack"
import cls from "./InstrumentPanel.module.scss"
import { Button } from "shared/ui/Button/Button"

interface InstrumentPanelProps {
	className?: string
}

export const InstrumentPanel = memo((props: InstrumentPanelProps) => {
	
	const {
		className
	} = props
	
	return (
		<HStack className={classNames(cls.panel, {}, [className])}>
			<Button>
				К вопросу
			</Button>
		</HStack>
	)
})