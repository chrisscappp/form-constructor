import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ChangeCheckboxFieldActionPayload, ChangeInputFieldActionPayload, ChangeRadioFieldActionPayload, EditableFormDetailCardSchema } from "../types/editableForm"
import { FormDetail } from "entities/Form"
import { FormQuestionType } from "entities/Form"
import { validateFormCard } from "../services/validateFormCard/validateFormCard"

const mockForm: FormDetail = {
    id: 1,
    authorId: 1,
    date: "21.09.2024",
    filled: 123,
    title: "Студенты факультета О",
    description: "Узнай, сколько студентов учиться на твоём факультете!",
    formLink: "dasdasdsads",
    questionCount: 4,
    questions: [
      {
        id: 1,
        formId: 1,
        type: "radio",
        title: "Какой вы курс?",
        description: "",
        valueType: "number",
        activeAnswer: {
          fieldType: "radio",
          content: "3",
          value: 3,
          id: 3,
        },
        answers: [
          {
            fieldType: "radio",
            content: "1",
            value: 1,
            id: 1,
          },
          {
            fieldType: "radio",
            content: "2",
            value: 2,
            id: 2,
          },
          {
            fieldType: "radio",
            content: "3",
            value: 3,
            id: 3,
          },
          {
            fieldType: "radio",
            content: "4",
            value: 4,
            id: 4,
          },
        ],
      },
      {
        id: 2,
        formId: 1,
        type: "checkbox",
        title: "Вам нравится учиться?",
        valueType: "string",
        activeAnswer: [
          {
            fieldType: "checkbox",
            content: "Да",
            value: "да",
            id: 5,
          },
          {
            fieldType: "checkbox",
            content: "Хочу отчислиться",
            value: "хочуотчислиться",
            id: 7,
          },
        ],
        answers: [
          {
            fieldType: "checkbox",
            content: "Да",
            value: "да",
            id: 5,
          },
          {
            fieldType: "checkbox",
            content: "Нет",
            value: "нет",
            id: 6,
          },
          {
            fieldType: "checkbox",
            content: "Хочу отчислиться",
            value: "хочуотчислиться",
            id: 7,
          },
        ],
      },
      {
        id: 3,
        formId: 1,
        type: "input",
        inputPlaceholder: "Введите ответ на вопрос...",
        title: "Сколько вам лет?",
        description: "p.s мы не собираем персональные данные",
        valueType: "string",
        activeAnswer: {
          fieldType: "input",
          content: "19",
          value: 19,
          id: 8,
        },
      },
      {
        id: 4,
        formId: 1,
        type: "textarea",
        title: "Расскажите о себе",
        inputPlaceholder: "Введите ответ на вопрос...",
        description:
          "p.s повторю ещё раз - мы не собираем персональные данные!!!",
        valueType: "string",
        activeAnswer: {
          fieldType: "textarea",
          content: "Короткий рассказ о себе",
          value: "короткийрассказосебе",
          id: 9,
        },
      },
    ],
}

const initialState: EditableFormDetailCardSchema = {
  isLoading: false,
  readonly: true,
  form: mockForm,
  formData: mockForm
};

const editableFormDetailSlice = createSlice({
  name: "editableFormDetailSlice",
  initialState,
  reducers: {
    setReadonly: (state, action: PayloadAction<boolean>) => {
      state.readonly = action.payload
    },
    setIsDebounceActive: (state, action: PayloadAction<boolean>) => {
      state.isDebounceActive = action.payload
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
                question.answers[aIndex] = answer
              }
            }
          }
        }
      }
    },
    undoChangesForForm: (state) => {
      state.form = state.formData
      state.readonly = true
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
            id: form.questions.length + 1,
            formId: form.id,
            title: "",
            description: "",
            type: questionFieldType,
            valueType: questionValueType,
            answers: []
          })
        }
        state.form.questionCount += questionsCount
      }
    },
    deleteQuestion: (state, action: PayloadAction<number>) => {
      // + вызвать async action
      if (state.form) {
        state.form.questions.splice(action.payload, 1)
        state.form.questionCount -= 1
      }
    }
  },
  // extraReducers: (builder) => {
  // 	builder
  // 		.addCase(fetchArticlesList.pending, (state, action) => {
  // 			state.error = undefined;
  // 			state.isLoading = true;

  // 			if (action.meta.arg.replace) {
  // 				articlesAdapter.removeAll(state);
  // 			}
  // 		})
  // 		.addCase(fetchArticlesList.fulfilled, (state, action) => {
  // 			state.isLoading = false;
  // 			state.hasMore = action.payload.length >= state.limit;

  // 			// этот параметр поступает из переданных пропсов
  // 			if (action.meta.arg.replace) {
  // 				articlesAdapter.setAll(state, action.payload);
  // 			} else {
  // 				articlesAdapter.addMany(state, action.payload);
  // 			}
  // 		})
  // 		.addCase(fetchArticlesList.rejected, (state, action) => {
  // 			state.isLoading = false;
  // 			state.error = action.payload;
  // 		});
  //},
});

export const { reducer: editableFormDetailReducer } = editableFormDetailSlice
export const { actions: editableFormDetailActions } = editableFormDetailSlice
