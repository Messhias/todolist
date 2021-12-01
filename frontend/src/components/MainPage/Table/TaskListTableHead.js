import {TableCell, TableHead, TableRow} from "@mui/material";


const TaskListTableHead = () => (
	<TableHead>
		<TableRow>
			<TableCell>
				ID
			</TableCell>
			<TableCell>
				Name
			</TableCell>
			<TableCell>
				Closed
			</TableCell>
			<TableCell>
				Status
			</TableCell>
			<TableCell>
				DEADLINE
			</TableCell>
			<TableCell>
				CREATE DATE
			</TableCell>
			<TableCell>
				ACTIONS
			</TableCell>
		</TableRow>
	</TableHead>
);

export default TaskListTableHead;