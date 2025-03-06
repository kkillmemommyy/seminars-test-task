import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { Seminar } from '../model/seminarsTypes';

export const BASE_URL = 'http://localhost:3001/seminars';

const seminarsApi = axios.create({
  baseURL: BASE_URL,
});

export const fetchSeminars = createAsyncThunk<Seminar[], void>(
  'seminars/fetchSeminars',
  async () => {
    const response = await seminarsApi.get('');
    return response.data;
  }
);

export const deleteSeminar = createAsyncThunk<number, number>(
  'seminars/deleteSeminar',
  async (id) => {
    await seminarsApi.delete(`/${id}`);
    return id;
  }
);

export const updateSeminar = createAsyncThunk<Seminar, Partial<Seminar>>(
  'seminars/updateSeminar',
  async (seminar) => {
    const response = await seminarsApi.put(`/${seminar.id}`, seminar);
    return response.data;
  }
);
