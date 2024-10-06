import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AddFormQuestionChangedField, AddFormQuestionSchema } from "../types/addForm"
import { FormQuestionType, FormQuestionValueType } from "entities/Form"

const initialState: AddFormQuestionSchema = {
  questionsCount: 1,
  questionFieldType: { content: "Радио", value: "radio" },
  questionValueType: { content: "Строка", value: "string" }
};

const addFormQuestionModalSlice = createSlice({
  name: "addFormQuestionModalSlice",
  initialState,
  reducers: {
	setQuestionsCount: (state, action: PayloadAction<number>) => {
		state.questionsCount = action.payload
	},
	setQuestionsFieldType: (state, action: PayloadAction<FormQuestionType>) => {
		if (state.questionFieldType) {
			state.questionFieldType.value = action.payload
			switch (action.payload) {
				case "radio": 
					state.questionFieldType.content = "Радио"
					break
				case "checkbox": 
					state.questionFieldType.content = "Чекбокс"
					break
				case "input": 
					state.questionFieldType.content = "Поле ввода"
					break
				case "textarea": 
					state.questionFieldType.content = "Большое поле ввода"
					break
				default:
					state.questionFieldType.content = ""
			}
		}
	},
	setQuestionValueType: (state, action: PayloadAction<FormQuestionValueType>) => {
		if (state.questionValueType) {
			state.questionValueType.value = action.payload
			switch (action.payload) {
				case "number": 
					state.questionValueType.content = "Число"
					break
				case "string": 
					state.questionValueType.content = "Строка"
					break
				default:
					state.questionValueType.content = ""
			}
		}
	}
  },
});

export const { reducer: addFormQuestionModalReducer } = addFormQuestionModalSlice
export const { actions: addFormQuestionModalActions } = addFormQuestionModalSlice
