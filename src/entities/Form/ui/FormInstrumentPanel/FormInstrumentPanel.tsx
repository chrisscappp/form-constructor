import { memo, useCallback } from "react"
import cls from "./FormInstrumentPanel.module.scss"
import { classNames } from "shared/lib/classNames/classNames"
import { Card } from "shared/ui/Card/Card"
import FormEditIcon from "shared/assets/icons/edit-form-icon.svg"
import TrashIcon from "shared/assets/icons/trash-icon.svg"
import LinkIcon from "shared/assets/icons/link-icon.svg"
import { Button, ButtonTheme } from "shared/ui/Button/Button"
import { useLocation, useNavigate } from "react-router"
import { routerPath } from "shared/config/routeConfig/routeConfig"
import { HStack } from "shared/ui/Stack"
import { FORM_DETAIL_DATA } from "shared/consts/localStorageKeys"
import { FormDetail } from "../../model/types/form"

interface FormInstrumentPanelProps {
	className?: string,
  formId?: string,
  formLink?: string,
  formDetail?: FormDetail,
  formIsRelease?: boolean,
	onOpenModalDelete: (formId?: string) => void,
}

export const FormInstrumentPanel = memo((props: FormInstrumentPanelProps) => {
	
	const {
		className,
    formDetail,
    formId,
    formLink,
    formIsRelease,
		onOpenModalDelete
	} = props

  const navigate = useNavigate()
  const location = useLocation()
  const isRelease = formDetail ? formDetail.isRealized : formIsRelease ? formIsRelease : false

  const onFollowToEditForm = useCallback(() => {
    if (formDetail && location.pathname === routerPath.form + formDetail.id) {
      localStorage.setItem(FORM_DETAIL_DATA, JSON.stringify(formDetail))
      navigate(routerPath.form_edit + formDetail.id)
    } else {
      navigate(routerPath.form_edit + formId)
    }
  }, [formDetail, location])

  const onCopyFormLink = useCallback(() => {
    if (formDetail?.formLink) {
      navigator.clipboard.writeText(formDetail.formLink)
    } else if (formLink) {
      navigator.clipboard.writeText(formLink)
    }
  }, [formDetail])
	
	return (
    <Card className={classNames(cls.FormInstrumentPanel, {}, [className])}>
      <HStack justify="around" className={cls.panel}>
        <Button
          title="Копировать ссылку на форму"
          theme={ButtonTheme.CLEAR}
          className={cls.iconWrap}
          onClick={onCopyFormLink}
        >
          <LinkIcon className={cls.icon} />
        </Button>
        <Button
          title="Редактировать"
          theme={ButtonTheme.CLEAR}
          className={cls.iconWrap}
          disabled={isRelease}
          onClick={onFollowToEditForm}
        >
          <FormEditIcon className={cls.icon} />
        </Button>
        <Button
          title="Удалить"
          theme={ButtonTheme.CLEAR}
          className={cls.iconWrap}
          disabled={isRelease}
          onClick={() => onOpenModalDelete(formId)}
        >
          <TrashIcon className={cls.icon} />
        </Button>
      </HStack>
    </Card>
  );
})