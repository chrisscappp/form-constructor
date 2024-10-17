import { StateSchema } from "app/providers/StoreProvider"

export const getDeleteFormModalIsLoading = (state: StateSchema) => state.deleteForm?.isLoading
export const getDeleteFormModalError = (state: StateSchema) => state.deleteForm?.error