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

		// впоследствии будет 1 роут, который удалит все данные о форме где это необходимо
		try {
    		const response1 = await extra.api.delete(`/formDetail/${id}`)
			const response2 = await extra.api.delete(`/forms/${id}`)
			return response2.data
		} catch (e) {
			console.error(e)
			return rejectWithValue("Произошла ошибка при попытке удаления формы. Попробуйте ещё раз...")
		}	
  	}
)