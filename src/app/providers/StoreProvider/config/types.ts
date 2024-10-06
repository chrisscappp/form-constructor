import { AnyAction, ReducersMapObject, Reducer  } from "@reduxjs/toolkit"
import { AxiosInstance } from "axios"
import { AddFormQuestionSchema } from "feautures/AddFormQuestion"
import { DeleteFormModalSchema } from "feautures/DeleteForm"
import { EditableFormDetailCardSchema } from "feautures/EditableFormDetailCard"
import { FormsListSchema } from "pages/MainPage"

export interface StateSchema {
	// async
	forms?: FormsListSchema,
	formDetail?: EditableFormDetailCardSchema,
	deleteForm?: DeleteFormModalSchema,
	addQuestionForm?: AddFormQuestionSchema
}

export type StateSchemaKey = keyof StateSchema

export interface ReducerManagerType {
	getReducerMap: () => ReducersMapObject<StateSchema>;
	reduce: (state: StateSchema, action: AnyAction) => any;
	add: (key: StateSchemaKey, reducer: Reducer) => void;
	remove: (key: StateSchemaKey) => void;
}

export interface ReduxStoreWithManager {
	reducerManager: ReducerManagerType
}

export interface ExtraArgumentType {
	api: AxiosInstance
}

export interface ThunkConfig<T> {
	rejectValue: T,
	state: StateSchema,
	extra: ExtraArgumentType
}
