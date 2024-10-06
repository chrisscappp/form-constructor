import { StateSchema } from "app/providers/StoreProvider"

export const getEditableFormDetailForm = (state: StateSchema) => state.formDetail?.form
export const getEditableFormDetailFormData = (state: StateSchema) => state.formDetail?.formData
export const getEditableFormDetailIsLoading = (state: StateSchema) => state.formDetail?.isLoading
export const getEditableFormDetailError = (state: StateSchema) => state.formDetail?.error
export const getEditableFormDetailReadonly = (state: StateSchema) => state.formDetail?.readonly
export const getEditableFormDetailIsDebounceActive = (state: StateSchema) => state.formDetail?.isDebounceActive
export const getEditableFormDetailValidateErrors = (state: StateSchema) => state.formDetail?.validateErrors || []