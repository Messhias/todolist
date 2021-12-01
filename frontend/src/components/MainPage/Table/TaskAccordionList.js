import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TableTaskListContainer from "./TableTaskListContainer";

const TaskAccordionList = (props) => {
	return (
		<Accordion
			expanded={props.expanded === props.s.name}
			onChange={props.handleChange(props.s.name)}
			key={props.s.id}
		>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				id={`${props.s.name}-header`}
				aria-controls={`${props.s.name}-content`}
			>
				<Typography sx={{width: '33%', flexShrink: 0}}>
					{props.s.name}
				</Typography>
			</AccordionSummary>
			<AccordionDetails>

				<TableTaskListContainer
					s={props.s}
					props={props}
					component={props.component}
					get={props.get}
					getStatus={props.getStatus}
					update={props.update}
					erase={props.erase}
					changeStatusOptionsOpen={props.changeStatusOptionsOpen}
					handleChangeModal={props?.handleChangeModal}
					taskModalOpen={props?.taskModalOpen}
					find={props.find}
					history={props.history}
				/>
			</AccordionDetails>
		</Accordion>
	);
}

export default TaskAccordionList;