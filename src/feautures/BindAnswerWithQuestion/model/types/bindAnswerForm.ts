import { FormQuestion, FormQuestionAnswer } from "entities/Form"

export interface BindAnswerFormSchema {
	error?: string,
	questions?: FormQuestion[],
	bindedAnswer?: FormQuestionAnswer
}