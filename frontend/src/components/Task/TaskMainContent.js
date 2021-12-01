import {Grid } from "@mui/material";
import * as React from "react";
import TaskStatusHistoryListing from "./TaskStatusHistoryListing";
import TaskDescription from "./TaskDescription";
import {useEffect} from "react";

/**
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const TaskMainContent = (props = {
	task: {
		description: "",
		id: null,
	},
	update: (id, body) => {
	},
}): JSX.Element => {
	const [description, setDescription] = React.useState(props?.task?.description ?? "");
	const status_history = props?.task?.status_history ?? [];
	const [descriptionFocus, setDescriptionFocus] = React.useState(false);
	const [isTyping, setIsTyping] = React.useState(null);
	const {
		update = () => {
		},
		task = {
			description: "",
		}
	} = props;

	console.log(isTyping);
	console.log(descriptionFocus);

	useEffect(() => {
		if (!descriptionFocus) {
			if (isTyping === false) {
				if (description !== task.description) {
					update(task.id, {description});
				}
			}
		}
	}, [
		descriptionFocus,
		description,
		task.description,
		update,
		isTyping,
	]);

	return (
		<Grid
			xs={12}
			sm={12}
			lg={12}
			md={12}
			spacing={2}
			item
			container
		>
			<TaskDescription
				description={description}
				setDescription={setDescription}
				descriptionFocus={descriptionFocus}
				setDescriptionFocus={setDescriptionFocus}
				setIsTyping={setIsTyping}
				isTyping={isTyping}
			/>
			<Grid
				xs={6}
				sm={6}
				lg={6}
				md={6}
				item
			>
				<Grid
					xs={12}
					sm={12}
					lg={12}
					md={12}
					item
					container
				>
					STATUS HISTORY
				</Grid>
				<TaskStatusHistoryListing
					status_history={status_history}
				/>
			</Grid>
		</Grid>
	);
}

export default TaskMainContent;