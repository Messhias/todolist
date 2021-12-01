import * as React from 'react';
import Modal from '@mui/material/Modal';
import {Grid} from "@mui/material";
import TaskDetailsHeader from "./TaskDetailsHeader";
import TaskMainContent from "./TaskMainContent";
import TaskDetailFooter from "./TaskDetailFooter";
import PropTypes from "prop-types";

/**
 * @param props
 * @returns {JSX.Element}
 * @private
 */
const _renderContent = (props = {
	task: {
		id: 0,
		name: "",
	}
}) => {

	return (

		<Grid
			xs={12}
			sm={12}
			lg={12}
			md={12}
			id={"task-details-body-wrapper"}
			item
			container
		>
			<TaskDetailsHeader
				handleClose={props.handleChangeModal}
				taskModalOpen={props.taskModalOpen}
				find={props.find}
				task={props.task}
				update={props.update}
				status={props?.status ?? []}
			/>
			<TaskMainContent
				task={props.task}
				update={props.update}
			/>
			<TaskDetailFooter
				task={props.task}
			/>
		</Grid>
	);
}


const TaskDetails = (props = {
	taskModalOpen: false,
	loading_tasks: false,
	handleChangeModal: (open = false) => {},
	find: (id) => {},
	update: (id, body) => {},
	status: [],
}) => {

	return (
		<Grid
			xs={12}
			sm={12}
			md={12}
			lg={12}
			item
			container
		>
			<Modal
				open={props.taskModalOpen}
				onClose={() => {
					props.handleChangeModal(!props.taskModalOpen);
					props.find(false);
				}}
				className={"task-detail-modal-container"}
			>
				{_renderContent(props)}
			</Modal>
		</Grid>
	);
};

TaskDetails.propTypes = {
	taskModalOpen: PropTypes.bool,
    loading_tasks: PropTypes.bool,
    handleChangeModal: PropTypes.func,
    find: PropTypes.func,
    update: PropTypes.func,
    status: PropTypes.array,
	task: PropTypes.shape({
		id: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired
	}).isRequired,
};

export default TaskDetails;
