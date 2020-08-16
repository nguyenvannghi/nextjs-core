import { createAction } from '@reduxjs/toolkit';

import { NSP_COMMON } from 'consts';

const COMMON_LOADING_OPEN = `${NSP_COMMON}LOADING_OPEN`;
const COMMON_LOADING_CLOSE = `${NSP_COMMON}LOADING_CLOSE`;

export const loadingOpen = createAction(COMMON_LOADING_OPEN);
export const loadingClose = createAction(COMMON_LOADING_CLOSE);
