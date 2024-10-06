import { FormDetail } from "entities/Form"

export type ChangeInputFieldType = "title" | "description" | "placeholder"
export type ChangeRadioFieldType = "title" | "description" | "radio"
export type ChangeCheckboxFieldType = "title" | "description" | "checkbox"

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

export interface EditableFormDetailCardSchema {
	isLoading: boolean,
	error?: string,
	form?: FormDetail,
	formData?: FormDetail,
	readonly?: boolean,
	isDebounceActive?: boolean
	validateErrors?: string[]
}