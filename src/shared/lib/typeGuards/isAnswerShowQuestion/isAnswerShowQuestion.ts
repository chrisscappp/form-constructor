import { FormQuestionAnswer } from "entities/Form/model/types/form"

export function isAnswerShowQuestion(answer: FormQuestionAnswer) {
	return (answer as FormQuestionAnswer).bindedQuestionIds !== undefined
}