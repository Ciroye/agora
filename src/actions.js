import * as actionTypes from './constants/action-types';

export const getSession = (state) => state.session
export const setSession = (session) => {
    return {
        type: actionTypes.SESSION_CHANGE,
        session: session
    }
}
