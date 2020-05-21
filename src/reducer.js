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
    case actionTypes.PARTICIPANTS_CHANGE:
      return {
        ...state,
        participants: action.participants,
      };
    case actionTypes.QUORUM_CHANGE:
      return {
        ...state,
        quorum: action.quorum,
      };
    case actionTypes.APARTAMENTS_CHANGE:
      return {
        ...state,
        apartaments: action.apartaments,
      };
    default:
      return { ...state };
  }
};

export default reducer;
