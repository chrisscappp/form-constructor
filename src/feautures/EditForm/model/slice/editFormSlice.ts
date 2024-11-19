import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ChangeCheckboxFieldActionPayload, ChangeInputFieldActionPayload, ChangeRadioFieldActionPayload, EditFormSchema } from "../types/editForm"
import { FormDetail } from "entities/Form"
import { FormQuestionType } from "entities/Form"
import { validateFormCard } from "../services/validateFormCard/validateFormCard"
import { createNewForm } from "../services/createNewForm/createNewForm"
import { fetchFormDetail } from "pages/FormPage"
import { updateForm } from "../services/updateForm/updateForm"

const initialState: EditFormSchema = {
  isLoading: false
};

const editFormSlice = createSlice({
  name: "editFormSlice",
  initialState,
  reducers: {
    initState: (state, action: PayloadAction<FormDetail>) => {
      state.form = action.payload
      state.formData = action.payload
    },
    setIsDebounceActive: (state, action: PayloadAction<boolean>) => {
      state.isDebounceActive = action.payload
    },
    validateFormCard: (state, action: PayloadAction<any>) => {
      const errors = validateFormCard(action.payload)
      state.validateErrors = errors
    },
    changeFormTitle: (state, action: PayloadAction<string>) => {
      if (state.form) {
        state.form.title = action.payload
      }
    },
    changeFormDescription: (state, action: PayloadAction<string>) => {
      if (state.form) {
        state.form.description = action.payload
      }
    },
    changeInputField: (state, action: PayloadAction<ChangeInputFieldActionPayload>) => {
      const { fieldType, newValue, qIndex } = action.payload
      const question = state.form?.questions[qIndex]
      if (question) {
        switch(fieldType) {
          case "title": {
            question.title = newValue
            break
          }
          case "description": {
            question.description = newValue
            break
          }
          case "placeholder": {
            question.inputPlaceholder = newValue
            break
          }
          default: question.title = ""
        }
        if (state.form) {
          state.form.questions[qIndex] = question
        }
      }
    },
    onAddAnswerField: (state, action: PayloadAction<{ qIndex: number, fieldType: FormQuestionType }>) => {
      const { fieldType, qIndex } = action.payload
      if (qIndex >= 0) {
        const question = state.form?.questions[qIndex]
        question?.answers?.push({
          content: "",
          fieldType,
          value: "",
          id: question.answers.length + 1
        })
      }
    },
    onDeleteAnswerField: (state, action: PayloadAction<{ qIndex: number, aIndex: number }>) => {
      const { aIndex, qIndex } = action.payload
      if (qIndex >= 0 && aIndex >= 0 && state.form) {
        const question = JSON.parse(JSON.stringify(state.form.questions[qIndex]))
        if (question) {
          question.answers.splice(aIndex, 1)
          state.form.questions[qIndex] = question
        }
      }
    },
    changeRadioField: (state, action: PayloadAction<ChangeRadioFieldActionPayload>) => {
      const { fieldType, newValue, qIndex, aIndex } = action.payload
      const question = state.form?.questions[qIndex]
      if (question) {
        switch(fieldType) {
          case "title": {
            question.title = newValue
            break
          }
          case "description": {
            question.description = newValue
            break
          }
          case "radio": {
            if (aIndex >= 0 && question.answers) {
              const answer = question.answers[aIndex];
              if (answer) {
                answer.content = newValue
                answer.value = newValue
                question.answers[aIndex] = answer
              }
            }
          }
        }
      }
    },
    changeCheckboxField: (state, action: PayloadAction<ChangeCheckboxFieldActionPayload>) => {
      const { fieldType, newValue, qIndex, aIndex } = action.payload
      const question = state.form?.questions[qIndex]
      if (question) {
        switch(fieldType) {
          case "title": {
            question.title = newValue
            break
          }
          case "description": {
            question.description = newValue
            break
          }
          case "checkbox": {
            if (aIndex >= 0 && question.answers) {
              const answer = question.answers[aIndex];
              if (answer) {
                answer.content = newValue
                answer.value = newValue
                question.answers[aIndex] = answer
              }
            }
          }
        }
      }
    },
    undoChangesForForm: (state) => {
      state.form = state.formData
    },
    undoChangesForQuestion: (state, action: PayloadAction<{ qId: number, qIndex: number }>) => {
      const { qId, qIndex } = action.payload
      const oldQuestion = state.formData?.questions.find((q) => q.id === qId)
      if (oldQuestion && state.form && !state.isDebounceActive) {
        state.form.questions[qIndex] = oldQuestion
      }
    },
    addQuestion: (state, action: PayloadAction<{ 
      questionFieldType: FormQuestionType, 
      questionsCount: number, 
      questionValueType: "string" | "number" 
    }>) => { 
      const { questionFieldType, questionValueType, questionsCount } = action.payload
      if (state.form) {
        const form = state.form
        for (let i = 0; i < questionsCount; i++) {
          form?.questions.push({
            title: "",
            description: "",
            type: questionFieldType,
            valueType: questionValueType,
            answers: [],
            id: questionsCount + 1,
            formId: state.form.id
          })
        }
        state.form.questionCount += questionsCount
      }
    },
    deleteQuestion: (state, action: PayloadAction<number>) => {
      if (state.form) {
        state.form.questions.splice(action.payload, 1)
        state.form.questionCount -= 1
      }
    }
  },
  extraReducers: (builder) => {
  	builder
      // fetchFormDetail
      .addCase(fetchFormDetail.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(
        fetchFormDetail.fulfilled,
        (state, action: PayloadAction<FormDetail>) => {
          state.isLoading = false;
          state.form = action.payload;
          state.formData = action.payload;
        }
      )
      .addCase(fetchFormDetail.rejected, (state, action) => {
        state.error = action.payload;
      })

      // createNewForm
      .addCase(createNewForm.pending, (state) => {
        state.error = undefined
        state.validateErrors = undefined
        state.isLoading = true
      })
      .addCase(createNewForm.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(createNewForm.rejected, (state, action) => {
        state.isLoading = false;
        if (typeof action.payload === "string") {
          state.error = action.payload;
        } else {
          state.validateErrors = action.payload;
        }
      })

      // updateForm
      .addCase(updateForm.pending, (state) => {
        state.error = undefined
        state.validateErrors = undefined
        state.isLoading = true
      })
      .addCase(updateForm.fulfilled, (state, action: PayloadAction<FormDetail>) => {
        state.isLoading = false
        state.form = action.payload
        state.formData = action.payload
      })
      .addCase(updateForm.rejected, (state, action) => {
        state.isLoading = false;
        if (typeof action.payload === "string") {
          state.error = action.payload;
        } else {
          state.validateErrors = action.payload;
        }
      });
  },
})

export const { reducer: editFormReducer } = editFormSlice
export const { actions: editFormActions } = editFormSlice
