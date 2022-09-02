import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {fetchTrainers} from './trainerAPI';
import {Trainer} from '../../models';
import {AppState} from '../../app/store';

export interface TrainerState {
  trainers: Trainer[];
  status: 'succeeded' | 'loading' | 'failed'
}

const initialState: TrainerState = {
  trainers: [],
  status: 'loading',
};

export const getTrainersAsync = createAsyncThunk(
  'trainer/fetchTrainers',
  async (_: void) => {
    return await fetchTrainers();
  }
);

export const trainerSlice = createSlice({
  name: 'trainer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTrainersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getTrainersAsync.fulfilled, (state, {payload}) => {
        state.status = 'succeeded';
        state.trainers = payload;
      })
      .addCase(getTrainersAsync.rejected, (state) => {
        state.status = 'failed';
      });
  }
});

export const selectTrainer = (state: AppState) => state.trainer;

export default trainerSlice.reducer;
