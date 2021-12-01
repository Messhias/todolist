import {Grid} from "@mui/material";
import PropTypes from "prop-types";


const TaskStatusHistoryListing = (props = {
	status_history: [{
		status: {
			id: null,
			formatted_created_date: "",
			name: "",
		},
		status_id: null,
		task_id: null,
	}]
}): JSX.Element => (
	<Grid
		xs={12}
		sm={12}
		lg={12}
		md={12}
		item
		container
	>
		<ul>
			{
				props?.status_history ?? [].length > 0 ? props.status_history.map((status_history, index) => (
					<li key={index}>
						{status_history.status.name} - {status_history.status.formatted_created_date}
					</li>
				)) : []
			}
		</ul>
	</Grid>
);

TaskStatusHistoryListing.propTypes = {
	status_history: PropTypes.array.isRequired,
};

export default TaskStatusHistoryListing;