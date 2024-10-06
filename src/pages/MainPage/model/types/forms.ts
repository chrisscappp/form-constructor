import { FormSimplify } from "entities/Form"

export interface FormsListSchema {
	forms?: FormSimplify[],
	error?: string,
	isLoading: boolean

	_inited: boolean
}