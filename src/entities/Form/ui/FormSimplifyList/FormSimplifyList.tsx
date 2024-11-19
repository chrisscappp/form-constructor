import { memo, useMemo } from "react"
import { classNames } from "shared/lib/classNames/classNames"
import cls from "./FormSimplifyList.module.scss"
import { FormSimplify } from "../../model/types/form"
import { FormSimplifyListItem } from "../FormSimplifyListItem/FormSimplifyListItem"
import { Loader } from "shared/ui/Loader/Loader"
import { FormInstrumentPanel } from "../FormInstrumentPanel/FormInstrumentPanel"
import { Text, TextAlign, TextSize, TextTheme } from "shared/ui/Text/Text"

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

	const list = useMemo(() => {
		return forms?.map((item) => (
			<div className={cls.listItem} key={item.id}>
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
			</div>
		))
	}, [forms])

	if (isLoading) {
		return (<div className={classNames(cls.loaderWrap, {}, [className])}>
			<Loader/>
		</div>)
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
		<div className={classNames(cls.FormSimplifyList, {}, [className])}>
			{list}
		</div>
	)
})