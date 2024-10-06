import { memo, useCallback } from "react"
import { classNames } from "shared/lib/classNames/classNames"
import cls from "./FormSimplifyListItem.module.scss"
import { FormSimplify } from "../../model/types/form"
import { Text, TextSize } from "shared/ui/Text/Text"
import CalendarIcon from "shared/assets/icons/calendar-icon.svg"
import EyeIcon from "shared/assets/icons/eye-icon.svg"
import { Card } from "shared/ui/Card/Card"
import { Button, ButtonSize } from "shared/ui/Button/Button"
import { useNavigate } from "react-router"
import { routerPath } from "shared/config/routeConfig/routeConfig"

interface FormSimplifyListItemProps {
	className?: string,
	form?: FormSimplify,
}

export const FormSimplifyListItem = memo((props: FormSimplifyListItemProps) => {
	
	const {
		form,
		className,
	} = props

  const navigate = useNavigate()

  const onOpenForm = useCallback(() => {
    navigate(routerPath.form + form?.id)
  }, [])

	return (
    <Card className={classNames(cls.FormSimplifyListItem, {}, [className])}>
      <div className={cls.info}>
        <Text title={form?.title} size={TextSize.XL} />
        {form?.description && (
          <Text
            text={form?.description}
            size={TextSize.L}
            className={cls.description}
          />
        )}
      </div>
      <div className={cls.footer}>
        <div className={cls.footerInfo}>
          <div className={cls.dateWrapper}>
            <CalendarIcon className={cls.calendar} />
            <Text text={form?.date} className={cls.date} size={TextSize.ML} />
          </div>
          <div className={cls.filledWrapper}>
            <EyeIcon className={cls.eye} />
            <Text
              text={String(form?.filled || 0)}
              className={cls.filled}
              size={TextSize.ML}
            />
          </div>
        </div>
        <Button
          className={cls.button}
          size={ButtonSize.ML}
          onClick={onOpenForm}
        >
          Подробнее...
        </Button>
      </div>
    </Card>
  );
})