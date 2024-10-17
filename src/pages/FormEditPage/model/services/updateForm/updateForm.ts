import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from "app/providers/StoreProvider"
import { FormDetail, FormSimplify } from "entities/Form"
import { validateFormCard } from "../validateFormCard/validateFormCard"
import { getEditFormPageForm } from "../../selectors/editFormSelectors"
import { ValidateErrors } from "../../types/editPage"
import { generateUniqueId } from "shared/lib/functions/generateUniqueId/generateUniqueId"

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
		const form = getEditFormPageForm(getState())
		const validateErrors = validateFormCard(form)
		const values = JSON.stringify(Object.values(validateErrors))

		if (values !== approveValue) {
			return rejectWithValue(validateErrors)
		}

		const formSimplify: FormSimplify = {
			authorId: 1,
			date: form?.date || "",
			filled: form?.filled || 0,
			formLink: form?.formLink || "",
			title: form?.title || "",
			description: form?.description || "",
			id: generateUniqueId()
		}

		const formDetail: FormDetail = {
			questionCount: form?.questionCount || 0,
			questions: form?.questions || [],
			...formSimplify
		}

		// временная мера. должен быть 1 роут, который примет в себя детальную инфу о форме

		try {
    		await extra.api.put<FormSimplify>(`/forms/${form?.id}`, formSimplify)
			const response = await extra.api.put<FormDetail>(`/formDetail/${form?.id}`, formDetail)
			
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