import * as React from "react";

import {Grid, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";


/**
 * @param name
 * @param taskNameFocus
 * @param setTaskNameFocus
 * @param setTaskName
 * @returns {JSX.Element}
 * @private
 */
const _handleChangeTaskNameContainer = (name, taskNameFocus, setTaskNameFocus, setTaskName) => {
	if (taskNameFocus) {
		return (
			<TextField
				value={name}
				onMouseLeave={() => setTaskNameFocus(false)}
				onChange={(e) => {
					setTaskName(e.target.value);
				}}
				fullWidth
			/>
		);
	}

	return (
		<Typography
			className={"task-title"}
			onMouseEnter={() => setTaskNameFocus(true)}
		>
			{name}
		</Typography>
	);
}

/**
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const TaskName = (
	props = {
		name: "",
		taskNameFocus: false,
		setTaskNameFocus: () => {},
		setTaskName: () => {},
	}
): JSX.Element => (

	<Grid
		xs={5}
		sm={5}
		md={5}
		lg={5}
		alignContent={"flex-start"}
		alignItems={"flex-start"}
		direction={'column'}
		item
		container
	>
		{_handleChangeTaskNameContainer(
			props?.name ?? "",
			props?.taskNameFocus ?? false,
			props?.setTaskNameFocus,
			props?.setTaskName,
		)}
	</Grid>
);

TaskName.propTypes = {
	name: PropTypes.string.isRequired,
    taskNameFocus: PropTypes.bool.isRequired,
    setTaskNameFocus: PropTypes.func.isRequired,
    setTaskName: PropTypes.func.isRequired,
};

export default TaskName;