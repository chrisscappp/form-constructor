import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from "app/providers/StoreProvider"
import { fetchFormDetail } from "pages/FormPage"
import { editFormPageActions } from "../../slice/editFormSlice"
import { generateUniqueId } from "shared/lib/functions/generateUniqueId/generateUniqueId"

interface InitFormEditPageProps {
	id: string
}

export const initFormEditPage = createAsyncThunk<void, InitFormEditPageProps, ThunkConfig<string>>(
  	"formEditPage/initFormEditPage",
  	async (props, thunkAPI) => {
		
		const { id } = props

		const {
			dispatch
		} = thunkAPI

		if (id === "0") {
			dispatch(editFormPageActions.initState({
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
			dispatch(fetchFormDetail({ id }))
		}
  	}
)