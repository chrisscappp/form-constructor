import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from "app/providers/StoreProvider"
import { FormDetail } from "entities/Form"
import { validateFormCard } from "../validateFormCard/validateFormCard"
import { getEditFormCardForm } from "../../selectors/editFormSelectors"
import { ValidateErrors } from "../../types/editForm"

export const updateForm = createAsyncThunk<
	FormDetail, 
	void, 
	ThunkConfig<string | ValidateErrors>
>(
  	'formEditPage/updateForm',
  	async (_, thunkAPI) => {

		const {
			extra,
			rejectWithValue,
			getState
		} = thunkAPI

		const approveValue = "[\"\",\"\",\"\",{}]"
		const form = getEditFormCardForm(getState())
		const validateErrors = validateFormCard(form)
		const values = JSON.stringify(Object.values(validateErrors))

		if (values !== approveValue) {
			return rejectWithValue(validateErrors)
		}

		const formDetail: FormDetail = {
			questionCount: form?.questionCount || 0,
			questions: form?.questions || [],
			authorId: 1,
			date: form?.date || "",
			filled: form?.filled || 0,
			formLink: form?.formLink || "",
			title: form?.title || "",
			description: form?.description || "",
			id: form?.id || ""
		}

		try {
			const response = await extra.api.put<FormDetail>(`/updateFormData/${form?.id}`, formDetail)
			console.log('res', response.data)
			if (!response.data) {
				throw new Error()
			}
			
			return response.data
		} catch (e) {
			console.error(e)
			return rejectWithValue("Произошла ошибка при попытке редактирования формы. Попробуйте ещё раз...")
		}	
  	}
)