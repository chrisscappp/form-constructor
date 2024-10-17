import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { FormPageSchema } from "../types/formPage"
import { fetchFormDetail } from "../services/fetchFormDetail/fetchFormDetail"

const initialState: FormPageSchema = {
  	isLoading: false
};

const formDetailSlice = createSlice({
  name: "formDetailSlice",
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
  	builder
      .addCase(fetchFormDetail.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchFormDetail.fulfilled, (state, action) => {
        state.isLoading = false
        state.form = action.payload
      })
      .addCase(fetchFormDetail.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      });
  },
});

export const { reducer: formDetailReducer } = formDetailSlice
export const { actions: formDetailActions } = formDetailSlice
