import { StateSchema } from "app/providers/StoreProvider"

export const getEditFormPageForm = (state: StateSchema) => state.editForm?.form
export const getEditFormPageFormData = (state: StateSchema) => state.editForm?.formData
export const getEditFormPageIsLoading = (state: StateSchema) => state.editForm?.isLoading
export const getEditFormPageError = (state: StateSchema) => state.editForm?.error
export const getEditFormPageIsDebounceActive = (state: StateSchema) => state.editForm?.isDebounceActive
export const getEditFormPageValidateErrors = (state: StateSchema) => state.editForm?.validateErrors