import { createSlice } from "@reduxjs/toolkit";
import { DeleteFormModalSchema } from "../types/deleteForm";

const initialState: DeleteFormModalSchema = {
  isLoading: false
};

const deleteFormModalSlice = createSlice({
  name: "deleteFormModalSlice",
  initialState,
  reducers: {},
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

export const { reducer: deleteFormModalReducer } = deleteFormModalSlice
export const { actions: deleteFormModalActions } = deleteFormModalSlice
