import { StateSchema } from "app/providers/StoreProvider"

export const getAddFormQuestionCount = (state: StateSchema) => state.addQuestionForm?.questionsCount
export const getAddFormQuestionFieldType = (state: StateSchema) => state.addQuestionForm?.questionFieldType
export const getAddFormQuestionValueType = (state: StateSchema) => state.addQuestionForm?.questionValueType