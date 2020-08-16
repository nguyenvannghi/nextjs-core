import { combineReducers } from 'redux';

import reducerLoadingApp from 'components/_base/loadingApp/reducer';

const rootReducer = (asyncReducers = {}) => {
    return combineReducers({
        reducerLoadingApp,
        ...asyncReducers,
    });
};
export default rootReducer;
