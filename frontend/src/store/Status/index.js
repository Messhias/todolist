import {CREATE_STATUS, GET_STATUS, UPDATE_STATUS} from "../../actions/Status/types";

const initial_state = {
	status: [],
	loading_status: false,
	status_errors: {},
	task: {
		name: "",
		id: null,
		description: "",
		is_closed: "",
		deadline: "",
		status: {
			id: null,
			formatted_created_date: "",
			name: "",
		},
		status_history: {
			status: {
				id: null,
				formatted_created_date: "",
				name: "",
			},
			status_id: null,
			task_id: null,
		}
	}
}

const StatusStore = (state = initial_state, action) => {
	const {
		loading_status = false
	} = action;

	if (action.type === GET_STATUS) {
		return {
			...state,
			loading_status,
			status: action?.status ?? [],
			status_errors: action?.stack ?? {},
		}
	}

	if (action.type === CREATE_STATUS) {
		return {
			...state,
			loading_status,
			status_errors: action?.status_errors ?? {},
		}
	}

	if (action.type === UPDATE_STATUS) {
		return {
			...state,
			loading_status,
			status_errors: action?.status_errors ?? {},
		}
	}

	return state;
}

export default StatusStore;