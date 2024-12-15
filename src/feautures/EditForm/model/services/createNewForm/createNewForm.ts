import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from "app/providers/StoreProvider"
import { FormDetail } from "entities/Form"
import { validateFormCard } from "../validateFormCard/validateFormCard"
import { getEditFormCardForm } from "../../selectors/editFormSelectors"
import { ValidateErrors } from "../../types/editForm"

export const createNewForm = createAsyncThunk<
	any, 
	void, 
	ThunkConfig<string | ValidateErrors>
>(
  	'formEditPage/createNewForm',
  	async (_, thunkAPI) => {

		const {
			extra,
			rejectWithValue,
			getState
		} = thunkAPI

		const approveValue = "[\"\",\"\",\"\",{}]"
		const form = getEditFormCardForm(getState());
		const validateErrors = validateFormCard(form)
		const values = JSON.stringify(Object.values(validateErrors))

		if (values !== approveValue) {
			return rejectWithValue(validateErrors)
		}

		const formDetail: FormDetail = {
			id: form?.id || "",
			questionCount: form?.questionCount || 0,
			questions: form?.questions || [],
			authorId: 1,
			date: form?.date || "",
			filled: form?.filled || 0,
			formLink: `http://voenmeh-form.ru?formId=${form?.id}`,
			title: form?.title || "",
			description: form?.description || "",
			isRealized: false
		}

		try {
			const res = await extra.api.post("/addNewForm", formDetail)
			return res.data
		} catch (e) {
			console.error(e)
			return rejectWithValue("Произошла ошибка при попытке создания формы. Попробуйте ещё раз...")
		}	
  	}
)