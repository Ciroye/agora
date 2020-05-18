import * as actionTypes from "./constants/action-types";

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.APARTAMENT_CHANGE:
      return {
        ...state,
        apartament: action.apartament,
      };
    case actionTypes.RESIDENTIAL_CHANGE:
      return {
        ...state,
        residential: action.residential,
      };
    case actionTypes.ASSEMBLY_CHANGE:
      return {
        ...state,
        assembly: action.assembly,
      };
    default:
      return { ...state };
  }
};

export default reducer;
