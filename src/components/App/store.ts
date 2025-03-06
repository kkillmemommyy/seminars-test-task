import { configureStore } from '@reduxjs/toolkit';
import { seminarsReducer } from '../SeminarList/model/seminarsSlice';
import { useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    seminars: seminarsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useTypedSelector = useSelector.withTypes<RootState>();
export const useTypedDispatch = useDispatch.withTypes<AppDispatch>();
