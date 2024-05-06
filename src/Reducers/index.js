import DataRender from "./DataRender";
import {combineReducers} from "redux";
import sortRender from "./sortRender";
import Cart from "./Cart";
export const AllReducers=combineReducers({
    DataRender,
    sortRender,
    Cart
})