import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AddFormQuestionSchema } from "../types/addForm"
import { FormQuestionType, FormQuestionValueType } from "entities/Form"

const initialState: AddFormQuestionSchema = {
  questionsCount: 1,
  questionFieldType: { content: "Один вариант ответа", value: "radio" },
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
					state.questionFieldType.content = "Один вариант ответа"
					break
				case "checkbox": 
					state.questionFieldType.content = "Несколько вариантов ответа"
					break
				case "input": 
					state.questionFieldType.content = "Поле ввода"
					break
				case "textarea": 
					state.questionFieldType.content = "Большое поле ввода"
					break
				case "listbox": 
					state.questionFieldType.content = "Выпадающий список"
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
