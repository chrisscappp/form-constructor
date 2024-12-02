import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { BindAnswerFormSchema } from "../types/bindAnswerForm"
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
		},
		addBindQuestionId: (state, action: PayloadAction<string>) => {
			if (state.bindedAnswer?.bindedQuestionIds.indexOf(action.payload) === -1) {
				state.bindedAnswer?.bindedQuestionIds.push(action.payload)
			}
		},
		removeBindQuestionId: (state, action: PayloadAction<string>) => {
			if (state.bindedAnswer?.bindedQuestionIds.indexOf(action.payload) !== -1 && state.bindedAnswer) {
				const newBindedIds = state.bindedAnswer?.bindedQuestionIds.filter(id => id !== action.payload)
				state.bindedAnswer.bindedQuestionIds = newBindedIds
			}
		},
		clearState: (state) => {
			state.questions = undefined,
			state.bindedAnswer = undefined,
			state.error = undefined
		}
	}
})

export const { reducer: bindAnswerReducer } = bindAnswerSlice
export const { actions: bindAnswerActions } = bindAnswerSlice
