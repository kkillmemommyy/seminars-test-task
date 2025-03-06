import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/components/App/store';

const selectSeminarsState = (state: RootState) => state.seminars;

export const selectSeminars = createSelector([selectSeminarsState], (seminarsState) => seminarsState.seminars);

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

const selectUpdateLoading = createSelector(
  [selectSeminarsState],
  (seminarsState) => seminarsState.isLoading.update
);
const selectUpdateError = createSelector(
  [selectSeminarsState],
  (seminarsState) => seminarsState.isError.update
)
export const selectUpdateStatus = createSelector(
  [selectUpdateLoading, selectUpdateError],
  (isLoading, isError) => ({ isLoading, isError })
);