import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/components/App/store';

const selectSeminarsState = (state: RootState) => state.seminars;

export const selectSeminars = createSelector([selectSeminarsState], (seminarsState) => seminarsState.seminars);
export const selectSeminarById = (id: number) => createSelector(
  [selectSeminars],
  (seminars) => seminars.find(s => s.id === id)
)

const selectInitialFetchLoading = createSelector(
  [selectSeminarsState],
  (seminarsState) => seminarsState.isLoading.initialFetch
);
const selectInitialFetchError = createSelector(
  [selectSeminarsState],
  (seminarsState) => seminarsState.isError.initialFetch
);
export const selectInitialFetchStatus = createSelector(
  [selectInitialFetchLoading, selectInitialFetchError],
  (isLoading, isError) => ({ isLoading, isError })
);

const selectDeleteLoading = createSelector(
  [selectSeminarsState],
  (seminarsState) => seminarsState.isLoading.delete
);
const selectDeleteError = createSelector(
  [selectSeminarsState],
  (seminarsState) => seminarsState.isError.delete
)
export const selectDeleteStatus = createSelector(
  [selectDeleteLoading, selectDeleteError],
  (isLoading, isError) => ({ isLoading, isError })
);