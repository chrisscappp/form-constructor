import { StateSchema } from "app/providers/StoreProvider";

export const getFormsListForms = (state: StateSchema) => state.forms?.forms || []
export const getFormsListIsLoading = (state: StateSchema) => state.forms?.isLoading
export const getFormsListError = (state: StateSchema) => state.forms?.error || ""
export const getFormsListInited = (state: StateSchema) => state.forms?._inited || false