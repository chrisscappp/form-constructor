import { StateSchema } from "app/providers/StoreProvider"

export const getFormPageForm = (state: StateSchema) => state.formDetail?.form
export const getFormPageError = (state: StateSchema) => state.formDetail?.error
export const getFormPageIsLoading = (state: StateSchema) => state.formDetail?.isLoading
export const getFormPageReadonly = (state: StateSchema) => state.formDetail?.readonly