import {Button, TableBody, TableCell, TableRow} from "@mui/material";
import * as React from "react";
import DeleteIcon from "@material-ui/icons/Delete";


/**
 * @param task
 * @param actualStatus
 * @param props
 * @returns {JSX.Element}
 * @private
 */
const _renderCommonColumns = (task = {
	id: null,
	name: "",
	is_closed: false,
	status: {
		name: "",
	},
	formatted_created_date: "",
	deadline: "",
}, actualStatus = {
	name: "",
}, props = {}): JSX.Element => (
	<>
		<TableCell
			onClick={() => {
				props?.handleChangeModal(props.taskModalOpen);
				props.find(task.id);
			}}
		>
			{task?.id}
		</TableCell>
		<TableCell
			onClick={() => {
				props?.handleChangeModal(props.taskModalOpen);
				props.find(task.id);
			}}
		>
			{task?.name}
		</TableCell>
		<TableCell
			onClick={() => {
				props?.handleChangeModal(props.taskModalOpen);
				props.find(task.id);
			}}
		>
			{task?.is_closed ? "Closed" : "Open"}
		</TableCell>
		<TableCell
			onClick={() => {
				props?.handleChangeModal(props.taskModalOpen);
				props.find(task.id);
			}}
		>
			{actualStatus?.name}
		</TableCell>
		<TableCell
			onClick={() => {
				props?.handleChangeModal(props.taskModalOpen);
				props.find(task.id);
			}}
		>
			{task?.deadline}
		</TableCell>
		<TableCell
			onClick={() => {
				props?.handleChangeModal(props.taskModalOpen);
				props.find(task.id);
			}}
		>
			{task?.formatted_created_date}
		</TableCell>
	</>
);


/**
 * @param task
 * @param status
 * @param changeStatusOptionsOpen
 * @param props
 * @returns {JSX.Element}
 * @private
 */
const _renderActionButtons = (task, status, changeStatusOptionsOpen, props): JSX.Element => {
	return (
		<TableCell>
			<Button
				className={"delete-button"}
				id={task.id}
				aria-expanded={changeStatusOptionsOpen ? 'true' : undefined}
				onClick={() => props.erase(task.id)}
			>
				<DeleteIcon/>
			</Button>
		</TableCell>
	);
}

/**
 * @param tasks
 * @param status
 * @param changeStatusOptionsOpen
 * @param props
 * @param actualStatus
 * @returns {JSX.Element|*}
 * @private
 */
const _renderTasks = (tasks, status, changeStatusOptionsOpen, props, actualStatus): JSX.Element | * => {

	if (tasks.length > 0) {
		return tasks.map((t) => {
			return (
				<TableRow
					key={t.id}
					data-id={t.id}
				>
					{_renderCommonColumns(t, actualStatus, props)}
					{_renderActionButtons(t, status, changeStatusOptionsOpen, props)}
				</TableRow>
			);
		});
	}

	return (
		<TableRow>
			<TableCell colSpan={6}>
				NO TASKS FOUND
			</TableCell>
		</TableRow>
	)
}

/**
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const TaskListTableBody = (props): JSX.Element => {
	return (
		<TableBody>
			{_renderTasks(props.s.tasks, props.status, props.changeStatusOptionsOpen, props, props.s)}
		</TableBody>
	);
}

export default TaskListTableBody;