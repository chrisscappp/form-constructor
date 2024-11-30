import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from "app/providers/StoreProvider"
import { FormDetail } from "entities/Form"

interface FetchFormDetailProps {
	id: string
}

export const fetchFormDetail = createAsyncThunk<
	FormDetail, 
	FetchFormDetailProps, 
	ThunkConfig<string>
>(
  	'formPage/fetchFormDetail',
  	async (props, thunkAPI) => {
		
		const { id } = props

		const {
			extra,
			rejectWithValue
		} = thunkAPI

		try {
    		const response = await extra.api.get<FormDetail>(`/getFormDetail/${id}`)
		// 	await extra.api
        // .post("/getFormQuestions", {
        //   formId: "5Q3ngzfpJiWrja6UvfAX",
        //   questionIds: ["JroJiyRvwh5vb1iVuYEs", "ZeF5GwCTnAcRYeykulBU"],
        // })
        // .then((res) => console.log("res", res));
		    return response.data
		} catch (e) {
			console.error(e)
			return rejectWithValue("Произошла ошибка при загрузке данных о форме. Попробуйте обновить страницу...")
		}	
  	}
)