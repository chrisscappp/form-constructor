import { memo, useMemo } from "react"
import { classNames } from "shared/lib/classNames/classNames"
import cls from "./FormSimplifyList.module.scss"
import { FormSimplify } from "../../model/types/form"
import { FormSimplifyListItem } from "../FormSimplifyListItem/FormSimplifyListItem"
import { Loader } from "shared/ui/Loader/Loader"
import { FormInstrumentPanel } from "../FormInstrumentPanel/FormInstrumentPanel"

interface FormSimplifyListProps {
	className?: string,
	forms?: FormSimplify[],
	isLoading?: boolean,
	error?: string,
	onOpenModalDelete: () => void
}

export const FormSimplifyList = memo((props: FormSimplifyListProps) => {
	
	const {
		forms,
		className,
		error,
		isLoading,
		onOpenModalDelete
	} = props

	const list = useMemo(() => {
		return forms?.map((item) => (
			<div className={cls.listItem}>
				<FormSimplifyListItem
					key={item.id}
					form={item}
					className={cls.form}
				/>
				<FormInstrumentPanel
					formLink={item.formLink}
					onOpenModalDelete={onOpenModalDelete}
					className={cls.panel}
				/>
			</div>
		))
	}, [forms])

	if (isLoading) {
		<div className={classNames(cls.FormSimplifyList, {}, [className])}>
			<Loader/>
		</div>
	}

	if (error) {
		<div className={classNames(cls.FormSimplifyList, {}, [className])}>
			{error}
		</div>
	}

	return (
		<div className={classNames(cls.FormSimplifyList, {}, [className])}>
			{list}
		</div>
	)
})