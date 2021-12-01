import {FIND_TASKS, GET_TASKS} from "../../actions/Tasks/types";

const initial_state = {
	tasks: [],
	loading_tasks: false,
	loading_task: false,
	task: {
		id: 0,
		name: "",
	},
	tasks_errors: {},
}

const TasksStore = (state = initial_state, action) => {

	if (action.type === GET_TASKS) {
		return {
			...state,
			tasks: action.tasks,
			loading_tasks: action?.loading_tasks,
			tasks_errors: action?.tasks_errors ?? {},
		}
	}
	if (action.type === GET_TASKS) {
		return {
			...state,
			tasks: action.tasks,
			loading_tasks: action?.loading_tasks,
			tasks_errors: action?.tasks_errors ?? {},
		}
	}

	if (action.type === FIND_TASKS) {
		return {
			...state,
			loading_tasks: action?.loading_tasks,
			tasks_errors: action?.tasks_errors ?? {},
			task: action?.task ?? {},
		}
	}

	return state;
}

export default TasksStore;