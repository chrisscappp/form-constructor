import { memo, useMemo } from "react"
import { classNames } from "shared/lib/classNames/classNames"
import cls from "./FormSimplifyList.module.scss"
import { FormSimplify } from "../../model/types/form"
import { FormSimplifyListItem } from "../FormSimplifyListItem/FormSimplifyListItem"
import { Loader } from "shared/ui/Loader/Loader"
import { FormInstrumentPanel } from "../FormInstrumentPanel/FormInstrumentPanel"
import { Text, TextAlign, TextSize, TextTheme } from "shared/ui/Text/Text"
import { Button } from "shared/ui/Button/Button"
import { useNavigate } from "react-router"
import { routerPath } from "shared/config/routeConfig/routeConfig"
import { HStack, VStack } from "shared/ui/Stack"

interface FormSimplifyListProps {
	className?: string,
	forms?: FormSimplify[],
	isLoading?: boolean,
	error?: string,
	onOpenModalDelete: (formId: string) => void
}

export const FormSimplifyList = memo((props: FormSimplifyListProps) => {
	
	const {
		forms,
		className,
		error,
		isLoading,
		onOpenModalDelete
	} = props

	const navigate = useNavigate()

	const list = useMemo(() => {
		return forms?.map((item) => (
			<HStack 
				max 
				align="start" 
				gap="20" 
				key={item.id} 
				className={cls.listItem}
			>
				<FormSimplifyListItem
					form={item}
					className={cls.form}
				/>
				<FormInstrumentPanel
					formId={item.id}
					formLink={item.formLink}
					onOpenModalDelete={onOpenModalDelete}
					className={cls.panel}
				/>
			</HStack>
		))
	}, [forms])

	if (isLoading) {
		return (
			<HStack 
				className={classNames(cls.loaderWrap, {}, [className])}
			>
				<Loader/>
			</HStack>
		)
	}

	if (error) {
		return (<div className={classNames('', {}, [className])}>
			<Text
				title={error}
				size={TextSize.L}
				align={TextAlign.CENTER}
			/>
		</div>)
	}

	return (
		<VStack gap="20" max className={classNames(cls.FormSimplifyList, {}, [className])}>
			{list}
			{forms?.length === 0 && (
				<VStack 
					align="center"
					className={cls.emptyForms}
					max
					gap="12"
				>
					<Text
						title="Список ваших форм пуст. Создайте новую форму!"
						size={TextSize.L}
					/>
					<Button onClick={() => navigate(routerPath.form_create)}>
						Создать форму
					</Button>					
				</VStack>
			)}
		</VStack>
	)
})