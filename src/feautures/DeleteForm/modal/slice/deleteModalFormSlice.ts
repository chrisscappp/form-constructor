import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DeleteFormModalSchema } from "../types/deleteForm";
import { deleteForm } from "../services/deleteForm/deleteForm";

const initialState: DeleteFormModalSchema = {
  isLoading: false
};

const deleteFormModalSlice = createSlice({
  name: "deleteFormModalSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
  	builder
  		.addCase(deleteForm.pending, (state) => {
  			state.error = undefined
  			state.isLoading = true
  		})
  		.addCase(deleteForm.fulfilled, (state) => {
  			state.isLoading = false
  		})
  		.addCase(deleteForm.rejected, (state, action) => {
  			state.isLoading = false
  			state.error = action.payload
  		})
  }
})

export const { reducer: deleteFormModalReducer } = deleteFormModalSlice
export const { actions: deleteFormModalActions } = deleteFormModalSlice
