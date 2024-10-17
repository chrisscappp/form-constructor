import { FormDetail } from "entities/Form"
import { 
	QuestionAnswerError,
	QuestionError, 
	ValidateErrors, 
	ValidateFormErrors
} from "../../types/editPage"

export function validateFormCard(form?: FormDetail) {
	let errors: ValidateErrors = {
		title: "",
		emptyForm: "",
		emptyQuestions: "",
		questions: {}
	}

	if (!form) {
		errors.emptyForm = ValidateFormErrors.NO_DATA
		return errors
	}

	if (!form.title) {
		errors.title = ValidateFormErrors.EMPTY_TITLE
	}

	if (form.questions.length === 0) {
		errors.emptyQuestions = ValidateFormErrors.NO_QUESTIONS
		return errors
	}

	const questions = [...form.questions]

	questions.forEach((question, qIndex) => {
		const questionError: QuestionError = {}
		if (!question.title) {
			questionError.title = ValidateFormErrors.EMPTY_QUESTION_TITLE
		}
		if (question.type === "radio" || question.type === "checkbox") {
			if (question.answers?.length === 0) {
				questionError.emptyAnswers = ValidateFormErrors.EMPTY_QUESTION_ANSEWRS
			} else {
				const answerErrors: QuestionAnswerError = {}
				question.answers?.forEach((answer, aIndex) => {
					if (!answer.content || !answer.value) {
						answerErrors[aIndex] = ValidateFormErrors.EMPTY_QUESTION_ANSEWRS_TITLE
					}
				})
				const keys = Object.keys(answerErrors)
				if (keys.length > 0) {
					questionError.answersErrors = answerErrors
				}
			}
		}
		const keys = Object.keys(questionError)
		if (keys.length > 0) {
			//@ts-ignore
			errors.questions[qIndex] = questionError
		}	
	})

	return errors
}