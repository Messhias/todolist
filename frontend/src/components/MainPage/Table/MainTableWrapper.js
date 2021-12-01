import {Table} from "@mui/material";
import TaskListTableHead from "./TaskListTableHead";
import TaskListTableBody from "./TaskListTableBody";
import ChangeStatusMenu from "./ChangeStatusMenu";

const MainTableWrapper = (props) => (
	<Table>
		<TaskListTableHead />
		<TaskListTableBody {...props} />
		<ChangeStatusMenu {...props} />
	</Table>
);

export default MainTableWrapper;