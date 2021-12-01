import {Grid} from "@mui/material";
import * as React from "react";

const TaskDetailFooter = () => (
	<Grid
		xs={12}
		sm={12}
		lg={12}
		md={12}
		className={"task-details-footer-container"}
		item
		container
	>
		<Grid
			xs={6}
			sm={6}
			lg={6}
			md={6}
			direction={'row'}
			alignItems={"center"}
			alignContent={"center"}
			item
			container
		>
			UPLOAD FILE
		</Grid>
		<Grid
			xs={6}
			sm={6}
			lg={6}
			md={6}
			direction={'row'}
			alignItems={"center"}
			alignContent={"center"}
			item
			container
		>
			??????
		</Grid>
	</Grid>
);

export default TaskDetailFooter;