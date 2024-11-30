export type FormQuestionType = "input" | "checkbox" | "radio" | "textarea" | "listbox" // тип поля
export type FormQuestionValueType = "string" | "number" // тип вводимого значения

export interface FormQuestionAnswer {
	value: string | number,
	content: string,
	fieldType: FormQuestionType,
	bindedQuestionIds?: string[],
	id: number
}

export interface FormQuestion {
	id: number,
	formId: string,
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
	authorId: number,
	id: string,
	title: string,
	description?: string,
	date: string,
	filled: number,
	formLink: string
}

export interface FormDetail extends FormSimplify {
	questionCount: number,
	questions: FormQuestion[]
}
// для детального просмотра со стороны админа + прохождения формы