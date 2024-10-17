import { FormDetail } from "entities/Form"

export type ChangeInputFieldType = "title" | "description" | "placeholder"
export type ChangeRadioFieldType = "title" | "description" | "radio"
export type ChangeCheckboxFieldType = "title" | "description" | "checkbox"

export enum ValidateFormErrors {
	NO_DATA = "NO_DATA",
	EMPTY_TITLE = "EMPTY_TITLE",
	NO_QUESTIONS = "NO_QUESTIONS",
	EMPTY_QUESTION_TITLE = "EMPTY_QUESTION_TITLE",
	EMPTY_QUESTION_ANSEWRS = "EMPTY_QUESTION_ANSEWRS",
	EMPTY_QUESTION_ANSEWRS_TITLE = "EMPTY_QUESTION_ANSEWRS_TITLE",
	EMPTY_ERROR = ""
}

export type QuestionAnswerError = OptionalRecord<number, ValidateFormErrors.EMPTY_QUESTION_ANSEWRS_TITLE | "">
export interface QuestionError {
	title?: ValidateFormErrors.EMPTY_QUESTION_TITLE | "",
	emptyAnswers?: ValidateFormErrors.EMPTY_QUESTION_ANSEWRS,
	answersErrors?: QuestionAnswerError
}

export type ValidateErrors = {
	title: ValidateFormErrors.EMPTY_TITLE | "",
	questions: QuestionError | {},
	emptyForm: ValidateFormErrors.NO_DATA | "",
	emptyQuestions: ValidateFormErrors.NO_QUESTIONS | ""
}

export interface ChangeInputFieldActionPayload {
	qIndex: number,
	newValue: string,
	fieldType: ChangeInputFieldType
}

export interface ChangeRadioFieldActionPayload {
	qIndex: number,
	newValue: string,
	fieldType: ChangeRadioFieldType,
	aIndex: number
}

export interface ChangeCheckboxFieldActionPayload {
	qIndex: number,
	newValue: string,
	fieldType: ChangeCheckboxFieldType,
	aIndex: number
}

export interface EditFormPageSchema {
	isLoading: boolean,
	error?: string,
	form?: FormDetail,
	formData?: FormDetail,
	isDebounceActive?: boolean
	validateErrors?: ValidateErrors
}