import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from "app/providers/StoreProvider"
import { getFormsListInited } from "../../selectors/mainPageSelectors"
import { formsListActions } from "../../slice/formsListSlice"
import { fetchFormsList } from "../fetchFormsList/fetchFormsList"

export const initMainPage = createAsyncThunk<void, void, ThunkConfig<string>>(
  	"mainPage/initMainPage",
  	async (_, thunkAPI) => {
		const {
			getState,
			dispatch
		} = thunkAPI

		const inited = getFormsListInited(getState())

		// впоследствии к запросу добавится параметром id пользователя
		if (!inited) {
			dispatch(formsListActions.initState())
			dispatch(fetchFormsList())
		}
  	}
)