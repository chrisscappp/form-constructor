import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from "app/providers/StoreProvider"
import { FormQuestion } from "entities/Form"

interface GetBindedQuestionsProps {
	formId: string,
	questionIds?: string[]
}

export const getBindedQuestions = createAsyncThunk<
	FormQuestion[], 
	GetBindedQuestionsProps, 
	ThunkConfig<string>
>(
  	'bindAnswerForm/getBindedQuestions',
  	async (props, thunkAPI) => {
		
		const { formId, questionIds } = props

		const {
			extra,
			rejectWithValue
		} = thunkAPI

		try {
    		const response = await extra.api.post("/getFormQuestions", {
				formId
			})
			return response.data
		} catch (e) {
			console.error(e)
			return rejectWithValue("Произошла ошибка при попытке получить список вопросов. Попробуйте ещё раз...")
		}	
  	}
)