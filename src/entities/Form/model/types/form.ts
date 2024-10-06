export type FormQuestionType = "input" | "checkbox" | "radio" | "textarea" // тип поля
export type FormQuestionValueType = "string" | "number" // тип вводимого значения

export interface FormQuestionAnswer {
	value: string | number,
	content: string,
	fieldType: FormQuestionType
	id: number
}

export interface FormQuestion {
	id: number,
	formId: number,
	title: string,
	description?: string,
	type: FormQuestionType,
	valueType: FormQuestionValueType,
	inputPlaceholder?: string,
	answers?: FormQuestionAnswer[],
	activeAnswer?: FormQuestionAnswer | FormQuestionAnswer[]
}
// answers - есть если checkbox или radio

export interface FormSimplify {
	id: number,
	title: string,
	description?: string,
	date: string,
	filled: number,
	formLink: string
}

export interface FormDetail extends FormSimplify {
	authorId: number,
	questionCount: number,
	questions: FormQuestion[]
}
// для детального просмотра со стороны админа + прохождения формы