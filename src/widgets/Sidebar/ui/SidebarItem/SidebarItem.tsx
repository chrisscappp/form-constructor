import cls from "./SidebarItem.module.scss"
import { memo } from "react"
import { SidebarItemType } from "widgets/Sidebar/model/types"
import { classNames } from "shared/lib/classNames/classNames"
import { AppLink } from "shared/ui/AppLink/AppLink"
import { Text, TextSize } from "shared/ui/Text/Text"
import { HStack } from "shared/ui/Stack"

interface SidebarItemProps {
  className?: string;
  item: SidebarItemType;
}

export const SidebarItem = memo((props: SidebarItemProps) => {
	const { className, item } = props
	const loggedUserId = 1

	return (
		<AppLink to={item.path === "/profile/" ? item.path + loggedUserId : item.path} className={classNames(cls.SidebarItem, {}, [className])}> 
			<HStack gap="16" align="center" justify="start">
				<item.Icon className={cls.icon}/>
				<Text
					text={item.text}
					className={cls.text}
					size={TextSize.M}
				/>
			</HStack>
		</AppLink>
	)
})
