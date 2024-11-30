import { StateSchema } from "app/providers/StoreProvider"

export const getBindAnswerFormError = (state: StateSchema) => state.bindAnswerForm?.error ?? ""
export const getBindAnswerFormQuestions = (state: StateSchema) => state.bindAnswerForm?.questions
export const getBindAnswerFormBindedAnswer = (state: StateSchema) => state.bindAnswerForm?.bindedAnswer