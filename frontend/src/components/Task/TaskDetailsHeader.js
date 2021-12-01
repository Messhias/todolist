import * as React from "react";
import {useEffect} from "react";
import CloseIcon from '@mui/icons-material/Close';
import {Button, Grid} from "@mui/material";
import TaskChangeStatus from "./TaskChangeStatus";
import TaskName from "./TaskName";
import TaskDeadline from "./TaskDeadline";
import PropTypes from "prop-types";


/**
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const TaskDetailsHeader = (props = {
	handleClose: () => {
	},
	find: (id) => {
	},
	update: (id, body) => {
	},
	task: {
		name: "",
	},
	status: [],
}) => {
	const {
		update = () => {
		},
		task = {
			name: "",
			id: 0,
			status: {
				name: "",
			}
		}
	} = props;
	const [name, setTaskName] = React.useState(task?.name ?? "Type your task name");
	const [taskNameFocus, setTaskNameFocus] = React.useState(false);


	useEffect(() => {
		if (!taskNameFocus && task.name !== name) {
			update(task.id, {
				name
			});
		}
	}, [
		name,
		taskNameFocus,
		update,
		task.name,
		task.id,
	]);

	return (
		<Grid
			xs={12}
			sm={12}
			md={12}
			lg={12}
			alignContent={"center"}
			alignItems={"center"}
			direction={'column'}
			className={"task-details-header-container"}
			item
			container
		>
			<Grid
				xs={12}
				sm={12}
				md={12}
				lg={12}
				direction={'row'}
				alignItems={"center"}
				alignContent={"center"}
				spacing={2}
				item
				container
			>
				<TaskChangeStatus
					task={props?.task ?? {}}
					update={props?.update}
					status={props?.status ?? []}
				/>
				<TaskDeadline
					update={props?.update}
					task={props?.task ?? {}}
				/>
				<TaskName
					name={name}
					taskNameFocus={taskNameFocus}
					setTaskNameFocus={setTaskNameFocus}
					setTaskName={setTaskName}
				/>
				<Grid
					xs={1}
					sm={1}
					md={1}
					lg={1}
					alignContent={"flex-end"}
					alignItems={"flex-end"}
					direction={'column'}
					item
					container
				>
					<Button
						variant={"outlined"}
						color={"primary"}
						onClick={() => {
							props.handleClose(props.taskModalOpen);
							props.find(false);
						}}
					>
						<CloseIcon/>
					</Button>
				</Grid>
			</Grid>
		</Grid>
	);
};

TaskDetailsHeader.propTypes = {
	handleClose: PropTypes.func.isRequired,
	find: PropTypes.func.isRequired,
	update: PropTypes.func.isRequired,
	task: PropTypes.shape({
		id: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired
	}).isRequired,
	status: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			name: PropTypes.string.isRequired
		}).isRequired,
	).isRequired,
};

export default TaskDetailsHeader;