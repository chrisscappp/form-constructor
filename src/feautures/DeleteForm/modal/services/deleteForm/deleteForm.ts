import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from "app/providers/StoreProvider"
import { FormDetail } from "entities/Form"

interface DeleteFormProps {
	id: string
}

export const deleteForm = createAsyncThunk<
	FormDetail, 
	DeleteFormProps, 
	ThunkConfig<string>
>(
  	'deleteFormModal/deleteForm',
  	async (props, thunkAPI) => {
		
		const { id } = props

		const {
			extra,
			rejectWithValue
		} = thunkAPI

		try {
    		const response = await extra.api.delete(`/deleteFormData/${id}`)
			return response.data
		} catch (e) {
			console.error(e)
			return rejectWithValue("Произошла ошибка при попытке удаления формы. Попробуйте ещё раз...")
		}	
  	}
)