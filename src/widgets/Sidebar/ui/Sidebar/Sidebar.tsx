import { classNames } from "shared/lib/classNames/classNames"
import cls from "./Sidebar.module.scss"
import { memo, useMemo } from "react"
import { sidebarItemList } from "widgets/Sidebar/model/items"
import { SidebarItem } from "../SidebarItem/SidebarItem"
import { Portal } from "shared/ui/Portal/Portal"

interface SidebarProps {
  className?: string;
  onCollapsed: () => void;
}

export const Sidebar = memo((props: SidebarProps) => {
	const { className, onCollapsed } = props

	const routes = useMemo(() => {
		return sidebarItemList.map((route) => (
			<SidebarItem
				key={route.path}
				item={route}
			/>
		))
	}, [])

	return (
		<Portal>
			<div className={classNames(cls.SidebarWrapper, {}, [className])} onClick={onCollapsed}>
				<div
					className={cls.SidebarContent}
				>
					{routes}
				</div>
			</div>
		</Portal>
	)
})
