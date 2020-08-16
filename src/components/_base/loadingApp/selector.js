import { createSelector } from 'reselect';

import { initState } from './reducer';

const selectLoading = (state) => state.reducerLoadingApp || initState;

const makeSelectLoading = () => createSelector(selectLoading, (item) => item.isLoading);

export default makeSelectLoading;
