import { createStore } from "redux";
import reducer from "./reducer";

export default createStore(reducer, {
  apartment: null,
  building: null,
  assembly: null,
});
