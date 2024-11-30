import { memo, useCallback } from "react"
import { classNames, Mods } from "shared/lib/classNames/classNames"
import cls from "./FormSimplifyListItem.module.scss"
import { FormSimplify } from "../../model/types/form"
import { Text, TextSize, TextTheme } from "shared/ui/Text/Text"
import CalendarIcon from "shared/assets/icons/calendar-icon.svg"
import EyeIcon from "shared/assets/icons/eye-icon.svg"
import { Card } from "shared/ui/Card/Card"
import { Button, ButtonSize } from "shared/ui/Button/Button"
import { useNavigate } from "react-router"
import { routerPath } from "shared/config/routeConfig/routeConfig"
import { HStack, VStack } from "shared/ui/Stack"

interface FormSimplifyListItemProps {
	className?: string,
	form?: FormSimplify,
  onStartRelease?: (form?: FormSimplify) => void
}

export const FormSimplifyListItem = memo((props: FormSimplifyListItemProps) => {
	
	const {
		form,
		className,
    onStartRelease
	} = props

  const navigate = useNavigate()

  const onOpenForm = useCallback(() => {
    navigate(routerPath.form + form?.id)
  }, [])

  const mods: Mods = {
    [cls.releaseForm]: form?.isRealized ?? false
  }

	return (
    <Card className={classNames(cls.FormSimplifyListItem, mods, [className])}>
      <VStack gap="4">
        <Text title={form?.title} size={TextSize.XL} />
        {form?.description && (
          <Text text={form?.description} size={TextSize.L} />
        )}
      </VStack>
      <HStack className={cls.footer} justify="between" align="end">
        <VStack gap="4">
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
          {form?.isRealized && (
            <Text
              className={cls.release}
              text="Форма доступна для прохождения!"
              theme={TextTheme.SUCCESS}
              size={TextSize.ML}
            />
          )}
        </VStack>
        <HStack className={cls.btns} gap="12" justify="end">
          <Button
            className={cls.realiseBtn}
            onClick={() => onStartRelease?.(form)}
          >
            {form?.isRealized
              ? "Закрыть для прохождения"
              : "Открыть для прохождения"}
          </Button>
          <Button
            className={cls.button}
            size={ButtonSize.ML}
            onClick={onOpenForm}
          >
            Подробнее...
          </Button>
        </HStack>
      </HStack>
    </Card>
  );
})