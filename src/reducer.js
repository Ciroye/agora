import * as actionTypes from "./constants/action-types";

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SESSION_CHANGE:
      return {
        ...state,
        session: action.session,
      };
    default:
      return { ...state };
  }
};

export default reducer;
