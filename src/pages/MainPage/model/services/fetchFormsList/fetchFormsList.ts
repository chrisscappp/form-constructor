import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from "app/providers/StoreProvider"
import { FormSimplify } from "entities/Form"

export const fetchFormsList = createAsyncThunk<
	FormSimplify[], 
	void, 
	ThunkConfig<string>
>(
  	'mainPage/fetchFormsList',
  	async (_, thunkAPI) => {
		const {
			extra,
			rejectWithValue,
		} = thunkAPI

		try {
    		const response = await extra.api.get<FormSimplify[]>("/forms")
			return response.data
		} catch (e) {
			console.error(e)
			return rejectWithValue("Произошла ошибка при загрузке списка форм. Попробуйте обновить страницу...")
		}	
  	},
)