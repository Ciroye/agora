import { createStore } from "redux";
import reducer from "./reducer";

export default createStore(reducer, {
  apartament: null,
  residential: null,
  assembly: null,
  participants: 0,
  enableQuestions: false,
  quorum: 0,
  apartaments: []
});
