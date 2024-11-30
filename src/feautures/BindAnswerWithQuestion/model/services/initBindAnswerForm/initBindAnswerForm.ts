import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from "app/providers/StoreProvider"
import { getEditFormCardFormQuestions } from "feautures/EditForm"
import { bindAnswerActions } from "../../slices/bindAnswerSlice"

interface InitBindAnswerFormProps {
	excludeQIndex: number,
	bindAIndex: number
}

export const initBindAnswerForm = createAsyncThunk<
	void, 
	InitBindAnswerFormProps, 
	ThunkConfig<string>
>(
  	'bindAnswerForm/initBindAnswerForm',
  	async (props, thunkAPI) => {
		
		const { excludeQIndex, bindAIndex } = props
		const { getState, dispatch } = thunkAPI

		const originQuestions = getEditFormCardFormQuestions(getState())
		const copyOriginQuestions = [...originQuestions]

		const answer = copyOriginQuestions[excludeQIndex].answers?.[bindAIndex]

		copyOriginQuestions.splice(excludeQIndex, 1)

		if (answer) {
			await dispatch(bindAnswerActions.initState({
				questions: copyOriginQuestions, 
				answer
			}))
		}
	}
)