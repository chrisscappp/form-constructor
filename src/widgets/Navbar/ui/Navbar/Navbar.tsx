import { classNames } from "shared/lib/classNames/classNames"
import cls from "./Navbar.module.scss"
import Menu from "shared/assets/icons/header-burger-menu.svg"
import { Button, ButtonTheme } from "shared/ui/Button/Button"

interface NavbarProps {
	className?: string;
	onCollapsed: () => void
}

export const Navbar = (props: NavbarProps) => {

	const {
		className,
		onCollapsed
	} = props

	return (
		<div className={classNames(cls.Navbar, {}, [className])}>
			<Button theme={ButtonTheme.CLEAR} onClick={onCollapsed}>
				<Menu className={cls.menu} />
			</Button>
		</div>
	)
}