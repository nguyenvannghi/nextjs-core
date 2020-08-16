import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { createInjectorsEnhancer } from 'redux-injectors';
import { createWrapper } from 'next-redux-wrapper';

import ENV, { envNameConfig } from 'configs';
import createReducer from './reducer';
import rootSaga from './saga';

const storeConfig = (initialState = {}) => {
    const sagaMiddleware = createSagaMiddleware({});

    const middlewares = [sagaMiddleware];

    const enhancers = [
        createInjectorsEnhancer({
            createReducer,
            runSaga: sagaMiddleware.run,
        }),
    ];
    const store = configureStore({
        reducer: createReducer(),
        preloadedState: initialState,
        middleware: [...getDefaultMiddleware(), ...middlewares],
        enhancers,
        devTools: ENV !== envNameConfig.PRODUCTION,
    });

    store.sagaTask = sagaMiddleware.run(rootSaga);

    return store;
};

export default storeConfig;
export const wrapperStore = createWrapper(storeConfig, { debug: false });
