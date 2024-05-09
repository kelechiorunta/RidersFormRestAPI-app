import { createStore } from "redux";
import riderReducer from "./reducer";

const store = createStore(riderReducer)

export default store