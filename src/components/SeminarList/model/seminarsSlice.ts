import { createSlice } from '@reduxjs/toolkit';
import { State } from './seminarsTypes';
import { fetchSeminars, deleteSeminar, updateSeminar } from '../api/seminarsApi';

const initialState: State = {
  seminars: [],
  isLoading: {
    initialFetch: false,
    delete: false,
    update: false,
  },
  isError: {
    initialFetch: false,
    delete: false,
    update: false,
  },
};

const seminarsSlice = createSlice({
  name: 'seminars',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET SEMINARS
      .addCase(fetchSeminars.pending, (state) => {
        state.isLoading.initialFetch = true;
        state.isError.initialFetch = false;
      })
      .addCase(fetchSeminars.fulfilled, (state, { payload: seminars }) => {
        state.isLoading.initialFetch = false;
        state.isError.initialFetch = false;
        state.seminars = seminars;
      })
      .addCase(fetchSeminars.rejected, (state) => {
        state.isLoading.initialFetch = false;
        state.isError.initialFetch = true;
      })
      // DELETE SEMINAR
      .addCase(deleteSeminar.pending, (state) => {
        state.isLoading.delete = true;
        state.isError.delete = false;
      })
      .addCase(deleteSeminar.fulfilled, (state, { payload: id }) => {
        state.isLoading.delete = false;
        state.isError.delete = false;
        state.seminars = state.seminars.filter((s) => s.id !== id);
      })
      .addCase(deleteSeminar.rejected, (state) => {
        state.isLoading.delete = false;
        state.isError.delete = true;
      });
  },
});

export const seminarsReducer = seminarsSlice.reducer;
