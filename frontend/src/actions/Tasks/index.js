import Request from "../../utils/Request";
import {CREATE_TASKS, DELETE_TASK, FIND_TASKS, GET_TASKS, UPDATE_TASK} from "./types";
import {filterError} from "../../utils/Helpers";


export const get = (relationships = []) => dispatch => {
	dispatch({
		type: GET_TASKS,
		loading_tasks: true,
	});

	let url = "/tasks";

	if (relationships.length > 0) {
		relationships = Request.parseParams(relationships);
		url = `/tasks?${relationships}`;
	}

	Request.get(url)
		.then(response => {

			dispatch({
				type: GET_TASKS,
				loading_tasks: false,
				tasks: response.data,
			});
		})
		.catch(error => {
			dispatch({
				type: GET_TASKS,
				loading_tasks: false
			});
			filterError(error);
		});
}

export const update = (id, body) => dispatch => {
	if (id && body) {
		dispatch({
			type: UPDATE_TASK,
			loading_tasks: true,
		});

		Request.put(`/tasks/${id}`, body)
			.then(() => {
				dispatch(get());
				dispatch(find(id, [
					'status',
				]));
				dispatch({
					type: UPDATE_TASK,
					loading_tasks: false,
				});
			})
			.catch(error => filterError(error));

		dispatch({
			type: UPDATE_TASK,
			loading_tasks: false,
		});
	}
}

export const erase = (id) => dispatch => {
	if (id) {
		dispatch({
			type: DELETE_TASK,
			loading_tasks: true,
		});

		Request.delete(`/tasks/${id}`)
			.then(() => {
				dispatch(get());
				dispatch({
					type: UPDATE_TASK,
					loading_tasks: false,
				});
			})
			.catch(error => filterError(error));
	}
};

export const create = (data = {}) => dispatch => {
	if (data) {
		dispatch({
			type: CREATE_TASKS,
			loading_tasks: true,
			tasks_errors: {},
		});
		Request.post("/tasks", data)
			.then(() => dispatch(get()))
			.catch(error => {
				dispatch({
					type: CREATE_TASKS,
					loading_tasks: false,
					tasks_errors: error?.response?.data ?? {},
				});
				filterError(error);
			});
	}
}

export const find = (id, relationships = []) => dispatch => {
	dispatch({
		type: FIND_TASKS,
		loading_task: true,
		tasks_errors: {},
		tasks: {},
		task: {
			id: 0,
			name: "",
		}
	});
	if (id) {
		let url = `/tasks/${id}`;

		if (relationships.length > 0) {
			relationships = Request.parseParams(relationships);
			url += `?${relationships}`;
		}

		Request.get(url)
			.then((response) => {
				dispatch({
					type: FIND_TASKS,
					task: response?.data,
					loading_task: false,
				});
			})
			.catch(error => {
				filterError(error);
				dispatch({
					type: FIND_TASKS,
					loading_task: false,
					tasks_errors: error?.response?.data ?? {},
				});
			});
	} else {
		dispatch(get([
			"status"
		]));
	}
};