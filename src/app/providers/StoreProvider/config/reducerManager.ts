import { AnyAction, Reducer, ReducersMapObject, combineReducers } from "@reduxjs/toolkit"
import { StateSchema, StateSchemaKey, ReducerManagerType } from "./types"

export function createReducerManager(initialReducers: ReducersMapObject<StateSchema>): ReducerManagerType {
	const reducers = { ...initialReducers }
	let combinedReducer = combineReducers(reducers)
	let keysToRemove: Array<StateSchemaKey> = []

	return {
		getReducerMap: () => reducers,
		reduce: (state: StateSchema, action: AnyAction) => {
			if (keysToRemove.length > 0) {
				state = { ...state }
				for (const key of keysToRemove) {
					//@ts-ignore
					delete state[key]
				}
				keysToRemove = []
			}
			//@ts-ignore
			return combinedReducer(state, action)
		},
		add: (key: StateSchemaKey, reducer: Reducer) => {
			if (!key || reducers[key]) {
				return
			}
			//@ts-ignore
			reducers[key] = reducer
			combinedReducer = combineReducers(reducers)
		},
		remove: (key: StateSchemaKey) => {
			if (!key || !reducers[key]) {
				return
			}
			//@ts-ignore
			delete reducers[key]
			keysToRemove.push(key)
			combinedReducer = combineReducers(reducers)
		}
	}
}