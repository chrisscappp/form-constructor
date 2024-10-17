import { FormDetail } from "entities/Form"

export interface FormPageSchema {
	form?: FormDetail,
	isLoading: boolean,
	error?: string 
}