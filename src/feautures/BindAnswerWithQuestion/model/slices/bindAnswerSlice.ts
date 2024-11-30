import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { BindAnswerFormSchema } from "../types/bindAnswerForm"
import { getBindedQuestions } from "../services/getBindedQuestions/getBindedQuestions"
import { FormQuestion, FormQuestionAnswer } from "entities/Form"

const initialState: BindAnswerFormSchema = {}

const bindAnswerSlice = createSlice({
	name: "bindAnswerSlice",
	initialState,
	reducers: {
		initState: (state, action: PayloadAction<{ questions: FormQuestion[], answer: FormQuestionAnswer }>) => {
			const { answer, questions } = action.payload
			state.questions = questions
			state.bindedAnswer = answer
		}
	}
})

export const { reducer: bindAnswerReducer } = bindAnswerSlice
export const { actions: bindAnswerActions } = bindAnswerSlice
