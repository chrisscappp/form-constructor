import { RouteProps } from "react-router"
import { MainPage } from "pages/MainPage"
import { FormPage } from "pages/FormPage"
import { NotFoundPage } from "pages/NotFoundPage"
import { ProfilePage } from "pages/ProfilePage"
import { FormCreatePage } from "pages/FormCreatePage"
import FormEditPage from "pages/FormEditPage/ui/FormEditPage"

export enum AppRoutes {
	MAIN = "main",
	FORM = "form",
	FORM_CREATE = "form_create",
	FORM_EDIT = "form_edit",
	PROFILE = "profile",
	NOT_FOUND = "not_found"
}

export const routerPath: Record<AppRoutes, string> = {
	[AppRoutes.MAIN]: "/",
	[AppRoutes.PROFILE]: "/profile/", // + :id
	[AppRoutes.FORM]: "/form/", // + :id
	[AppRoutes.FORM_CREATE]: "/form/create",
	[AppRoutes.FORM_EDIT]: "/form/edit/", // + :id
	//last
	[AppRoutes.NOT_FOUND]: "*"
}

export const routeConfig: Record<AppRoutes, RouteProps> = {
	[AppRoutes.MAIN]: {
		path: routerPath.main,
		element: <MainPage />,
	},
	[AppRoutes.PROFILE]: {
		path: `${routerPath.profile}:id`,
		element: <ProfilePage />,
	},
	[AppRoutes.FORM]: {
		path: `${routerPath.form}:id`,
		element: <FormPage />,
	},
	[AppRoutes.FORM_CREATE]: {
		path: routerPath.form_create,
		element: <FormCreatePage />,
	},
	[AppRoutes.FORM_EDIT]: {
		path: `${routerPath.form_edit}:id`,
		element: <FormEditPage />,
	},
	//last
	[AppRoutes.NOT_FOUND]: {
		path: routerPath.not_found,
		element: <NotFoundPage />,
	},
}