import {combineReducers, createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";


// importing stores
import TasksStore from "./Tasks";
import StatusStore from "./Status";

const reducers = combineReducers({
	TasksStore,
	StatusStore,
});

export default createStore(
	reducers,
	applyMiddleware(thunk),
);