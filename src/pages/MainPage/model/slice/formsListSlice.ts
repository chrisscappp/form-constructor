import { createSlice } from "@reduxjs/toolkit"
import { FormsListSchema } from "../types/forms"

const initialState: FormsListSchema = {
	isLoading: false,
	_inited: false,
	forms: [
		{
			id: 1,
			date: "21.09.2024",
			filled: 123,
			title: "Студенты факультета О",
			description: "Узнай, сколько студентов учиться на твоём факультете",
			formLink: "dasdasdsads"
		},
		{
			id: 2,
			date: "18.08.2024",
			filled: 13,
			title: "Поедешь на слёт?",
			formLink: "m,nbm,bnnb,bnm,nm,b"
		},
		{
			id: 3,
			date: "21.09.2024",
			filled: 2173,
			title: "Базовая форма опросник",
			description: "Оставь данные о себе",
			formLink: "wqeqwewqtyeytqwetywq"
		}
	]
}

const formsListSlice = createSlice({
	name: "formsListSlice",
	initialState,
	reducers: {
		initState: (state) => {
			state._inited = true
		},
	}
	// extraReducers: (builder) => {
	// 	builder
	// 		.addCase(fetchArticlesList.pending, (state, action) => {
	// 			state.error = undefined;
	// 			state.isLoading = true;

	// 			if (action.meta.arg.replace) {
	// 				articlesAdapter.removeAll(state);
	// 			}
	// 		})
	// 		.addCase(fetchArticlesList.fulfilled, (state, action) => {
	// 			state.isLoading = false;
	// 			state.hasMore = action.payload.length >= state.limit;

	// 			// этот параметр поступает из переданных пропсов
	// 			if (action.meta.arg.replace) {
	// 				articlesAdapter.setAll(state, action.payload);
	// 			} else {
	// 				articlesAdapter.addMany(state, action.payload);
	// 			}
	// 		})
	// 		.addCase(fetchArticlesList.rejected, (state, action) => {
	// 			state.isLoading = false;
	// 			state.error = action.payload;
	// 		});
	//},
})

export const { reducer: formsListReducer } = formsListSlice
export const { actions: formsListActions } = formsListSlice