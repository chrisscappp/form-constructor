import { createSlice } from "@reduxjs/toolkit"
import { FormsListSchema } from "../types/forms"
import { fetchFormsList } from "../services/fetchFormsList/fetchFormsList"

const initialState: FormsListSchema = {
	isLoading: false,
	_inited: false
}

const formsListSlice = createSlice({
	name: "formsListSlice",
	initialState,
	reducers: {
		initState: (state) => {
			state._inited = true
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchFormsList.pending, (state) => {
				state.error = undefined
				state.isLoading = true
			})
			.addCase(fetchFormsList.fulfilled, (state, action) => {
				state.isLoading = false
				state.forms = action.payload
			})
			.addCase(fetchFormsList.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload
			});
	},
})

export const { reducer: formsListReducer } = formsListSlice
export const { actions: formsListActions } = formsListSlice