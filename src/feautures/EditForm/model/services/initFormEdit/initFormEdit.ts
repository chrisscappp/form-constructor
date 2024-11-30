import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from "app/providers/StoreProvider"
import { fetchFormDetail } from "pages/FormPage"
import { editFormActions } from "../../slice/editFormSlice"
import { generateUniqueId } from "shared/lib/functions/generateUniqueId/generateUniqueId"
import { FORM_DETAIL_DATA } from "shared/consts/localStorageKeys"

interface InitFormEditPageProps {
	id: string
}

export const initFormEditFeauture = createAsyncThunk<void, InitFormEditPageProps, ThunkConfig<string>>(
  	"formEditPage/initFormEditFeauture",
  	async (props, thunkAPI) => {
		
		const { id } = props

		const {
			dispatch
		} = thunkAPI

		if (id === "0") {
			dispatch(editFormActions.initState({
				authorId: 1,
				date: new Date().toLocaleDateString(),
				filled: 0,
				formLink: "",
				questionCount: 0,
				questions: [],
				title: "",
				description: "",
				id: generateUniqueId()
			}))
		} else {
			const formDetail = localStorage.getItem(FORM_DETAIL_DATA)
			if (formDetail) {
				dispatch(editFormActions.initState(JSON.parse(formDetail)))
				localStorage.removeItem(FORM_DETAIL_DATA)
			} else {
				dispatch(fetchFormDetail({ id }))
			}
		}
  	}
)