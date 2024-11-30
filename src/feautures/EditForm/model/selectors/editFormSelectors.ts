import { createSelector } from "@reduxjs/toolkit"
import { StateSchema } from "app/providers/StoreProvider"

export const getEditFormCardForm = (state: StateSchema) => state.editForm?.form
export const getEditFormCardFormData = (state: StateSchema) => state.editForm?.formData
export const getEditFormCardIsLoading = (state: StateSchema) => state.editForm?.isLoading
export const getEditFormCardError = (state: StateSchema) => state.editForm?.error
export const getEditFormCardIsDebounceActive = (state: StateSchema) => state.editForm?.isDebounceActive
export const getEditFormCardValidateErrors = (state: StateSchema) => state.editForm?.validateErrors

export const getEditFormCardFormQuestions = createSelector(
	getEditFormCardForm, 
	(form) => {
		return form?.questions ?? []
	}
)