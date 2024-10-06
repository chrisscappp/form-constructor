import { configureStore, Reducer, ReducersMapObject } from "@reduxjs/toolkit"
import { ExtraArgumentType, StateSchema } from "./types"
import { createReducerManager } from "./reducerManager"
import { $api } from "shared/api/api"

export function createReduxStore(
	initialState?: StateSchema,
	asyncReducers?: ReducersMapObject<StateSchema>
) {
	const rootReducers: ReducersMapObject<StateSchema> = {
		...asyncReducers,
	}

	const reducerManager = createReducerManager(rootReducers)

	const extraArg: ExtraArgumentType = {
		api: $api,
	}

	const store = configureStore({
		reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
		devTools: __IS_DEV__,
		preloadedState: initialState,
		middleware: getDefaultMiddleware => getDefaultMiddleware({
			thunk: {
				extraArgument: extraArg
			}
		})
	})

	//@ts-ignore
	store.reducerManager = reducerManager

	return store
}

export type AppDispatch = ReturnType<typeof createReduxStore>["dispatch"]