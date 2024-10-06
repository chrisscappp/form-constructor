import { Reducer } from "@reduxjs/toolkit"
import { StateSchemaKey } from "app/providers/StoreProvider"
import { FC, ReactNode, useEffect } from "react"
import { useStore, useDispatch } from "react-redux"

export type ReducersList = {
	[reducerKey in StateSchemaKey]?: Reducer;
}

export interface DynamicModuleLoaderProps {
	children: ReactNode,
	reducers: ReducersList;
	removeAfterUnmount?: boolean;
}

export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = (props) => {

	const {
		children,
		reducers,
		removeAfterUnmount = false
	} = props

	//@ts-ignore
	const store = useStore() as ReduxStoreWithManager
	const dispatch = useDispatch()

	useEffect(() => {
		Object.entries(reducers).forEach(([key, reducer]) => {
			store.reducerManager.add(key as StateSchemaKey, reducer)
			dispatch({type: `@INIT ${key} Reducer`})
		})
		
		return () => {
			if (removeAfterUnmount) {
				Object.entries(reducers).forEach(([key, _]) => {
					store.reducerManager.remove(key as StateSchemaKey)
					dispatch({type: `@REMOVE ${key} Reducer`})
				})	
			}
		}
		//eslint-disable-next-line
	}, [])

	return (
		<>
			{children}
		</>
	)
}
