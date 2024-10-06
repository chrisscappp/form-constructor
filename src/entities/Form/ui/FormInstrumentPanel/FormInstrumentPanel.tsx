import { memo, useCallback } from "react"
import cls from "./FormInstrumentPanel.module.scss"
import { classNames } from "shared/lib/classNames/classNames"
import { Card } from "shared/ui/Card/Card"
import FormEditIcon from "shared/assets/icons/edit-form-icon.svg"
import TrashIcon from "shared/assets/icons/trash-icon.svg"
import LinkIcon from "shared/assets/icons/link-icon.svg"
import { Button, ButtonTheme } from "shared/ui/Button/Button"

interface FormInstrumentPanelProps {
	className?: string,
  formLink: string,
	onOpenModalDelete: () => void,
  onEditForm?: () => void
}

export const FormInstrumentPanel = memo((props: FormInstrumentPanelProps) => {
	
	const {
		className,
    formLink,
		onOpenModalDelete,
    onEditForm
	} = props

  const onCopyFormLink = useCallback(() => {
    if (formLink) {
      navigator.clipboard.writeText(formLink)
    }
  }, [])
	
	return (
    <Card className={classNames(cls.FormInstrumentPanel, {}, [className])}>
      {onEditForm && (
        <Button
          title="Редактировать"
          theme={ButtonTheme.CLEAR}
          className={cls.iconWrap}
          onClick={onEditForm}
        >
          <FormEditIcon className={cls.icon} />
        </Button>
      )}
      <Button
        title="Копировать ссылку на форму"
        theme={ButtonTheme.CLEAR}
        className={cls.iconWrap}
        onClick={onCopyFormLink}
      >
        <LinkIcon className={cls.icon} />
      </Button>
      <Button
        title="Удалить"
        theme={ButtonTheme.CLEAR}
        className={cls.iconWrap}
        onClick={onOpenModalDelete}
      >
        <TrashIcon className={cls.icon} />
      </Button>
    </Card>
  );
})