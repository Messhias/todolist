import Request from "../../utils/Request";
import {CREATE_STATUS, DELETE_STATUS, GET_STATUS, UPDATE_STATUS} from "./types";
import {filterError} from "../../utils/Helpers";


export const get = () => dispatch => {
	dispatch({
		type: GET_STATUS,
		status_loading: true,
		status: [],
		status_errors: {},
	});

	Request.get("/status")
		.then(response => {

			dispatch({
				type: GET_STATUS,
				status_loading: false,
				status: response.data,
				status_errors: {},
			});
		})
		.catch(error => {
			dispatch({
				type: GET_STATUS,
				status: false,
				status_errors: {},
			});
			filterError(error);
		});
}


export const erase = (id) => dispatch => {
	if (id) {
		dispatch({
			type: DELETE_STATUS,
			loading_tasks: true,
		});

		Request.delete(`/status/${id}`)
			.then(() => {
				dispatch(get());
				dispatch({
					type: DELETE_STATUS,
					loading_tasks: false,
					status_errors: {},
				});
			})
			.catch(error => filterError(error));
	}
};

export const create = (data = {}) => dispatch => {
	if (data) {
		dispatch({
			type: CREATE_STATUS,
			loading_tasks: true,
			status_errors: {},
		});
		Request.post("/status", data)
			.then(() => dispatch(get()))
			.catch(error => {
				dispatch({
					type: CREATE_STATUS,
					loading_tasks: false,
					status_errors: error?.response?.data ?? {},
				});
				filterError(error);
			});
	}
}

export const update = (id, data = {}) => dispatch => {
	if (id && data) {
		dispatch({
			type: UPDATE_STATUS,
			loading_tasks: true,
			status_errors: {},
		});
		Request.put(`/status/${id}`, data)
			.then(() => dispatch(get()))
			.catch(error => {
				dispatch({
					type: UPDATE_STATUS,
					loading_tasks: false,
					status_errors: error?.response?.data ?? {},
				});
				filterError(error);
			});
	}
}