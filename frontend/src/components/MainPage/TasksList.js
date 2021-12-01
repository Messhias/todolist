import * as React from 'react';
import {Grid,} from "@mui/material";
import TaskAccordionList from "./Table/TaskAccordionList";

/**
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const TasksList = (props = {
	tasks: [],
	status: [],
	taskId: null,
	taskModalOpen: false,
	handleChangeModal: (open = false) => "",
}): JSX.Element => {
	const [expanded, setExpanded] = React.useState(false);

	const handleChange =
		(panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
			setExpanded(isExpanded ? panel : false);
		};

	return (
		<Grid
			xs={12}
			sm={12}
			md={12}
			lg={12}
			id={"tasks-list-status"}
			item
			container
		>
			{
				props?.tasks?.map(s => (
					<TaskAccordionList
						key={s.name}
						s={s}
						expanded={expanded}
						handleChange={handleChange}
						component={props.component}
						get={props.get}
						getStatus={props.getStatus}
						update={props.update}
						erase={props.erase}
						changeStatusOptionsOpen={props.changeStatusOptionsOpen}
						taskId={props.taskId}
						status={props.status ?? []}
						handleChangeModal={props?.handleChangeModal}
						taskModalOpen={props?.taskModalOpen}
						find={props.find}
						history={props.history}
					/>
				))
			}
		</Grid>
	);
}

export default React.memo(TasksList);