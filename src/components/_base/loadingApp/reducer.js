import { createReducer } from '@reduxjs/toolkit';

import * as nameActs from './action';

export const initState = {
    isLoading: false,
};

const Loading = createReducer(initState, {
    [nameActs.loadingOpen]: (state) => {
        state.isLoading = true;
    },
    [nameActs.loadingClose]: (state) => {
        state.isLoading = false;
    },
});

export default Loading;
