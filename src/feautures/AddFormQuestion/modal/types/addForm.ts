import { FormQuestionType, FormQuestionValueType } from "entities/Form"

export interface AddFormQuestionSchema {
	questionsCount?: number,
	questionFieldType?: {
		value: FormQuestionType,
		content: string
	},
	questionValueType?: {
		value: FormQuestionValueType,
		content: string
	}
}

export interface AddFormQuestionChangedField {
	value: FormQuestionType | FormQuestionValueType,
	content: string
}