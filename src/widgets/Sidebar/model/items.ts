import { SidebarItemType } from "./types";
import { routerPath } from "shared/config/routeConfig/routeConfig";
import ProfileIcon from "shared/assets/icons/profile-icon.svg"
import FormsIcon from "shared/assets/icons/forms-icon.svg";
import FormCreateIcon from "shared/assets/icons/create-form-icon.svg";
import LogoutIcon from "shared/assets/icons/logout-icon.svg";

export const sidebarItemList: SidebarItemType[] = [
  {
    Icon: ProfileIcon,
    path: routerPath.profile,
    text: "Профиль",
  },
  {
    Icon: FormsIcon,
    path: routerPath.main,
    text: "Мои формы",
  },
  {
    Icon: FormCreateIcon,
    path: routerPath.form_create,
    text: "Новая форма",
  },
  {
    Icon: LogoutIcon,
    path: "",
    text: "Выйти",
  },
];
