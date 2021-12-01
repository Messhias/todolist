import {FormControl, Grid, InputLabel, MenuItem, Select} from "@mui/material";
import * as React from "react";
import PropTypes from "prop-types";

/**
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const TaskChangeStatus = (
	props = {
		task: {
			id: null,
			status: {
				id: null,
			}
		},
		status: [],
		update: (id, data) => {
		},
	}
): JSX.Element => (

	props?.status?.length > 0 && (
		<Grid
			xs={2}
			sm={2}
			md={2}
			lg={2}
			alignContent={"center"}
			alignItems={"center"}
			direction={'column'}
			item
			container
		>
			<FormControl fullWidth>
				<InputLabel id="task-status-label-change">Status</InputLabel>
				<Select
					labelId="task-status-label-change"
					id="task-status-select"
					label="Status"
					value={props?.task?.status?.id ?? 0}
					onChange={event => props.update(props?.task?.id, {
						status_id: event.target.value
					})}
				>
					<MenuItem
						key={0}
						value={0}
					>
						Choose the task status
					</MenuItem>
					{
						props?.status?.map(s =>
							<MenuItem
								key={s.id}
								value={s.id}
							>
								{s.name}
							</MenuItem>
						)
					}
				</Select>
			</FormControl>
		</Grid>
	)
);

TaskChangeStatus.propTypes = {
	task: PropTypes.object.isRequired,
	update: PropTypes.func.isRequired,
	status: PropTypes.array.isRequired,
}

export default TaskChangeStatus;