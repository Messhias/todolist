import {TableContainer} from "@mui/material";
import MainTableWrapper from "./MainTableWrapper";


const TableTaskListContainer = (props) => (
	<TableContainer>
		<MainTableWrapper {...props} {...props.props} />
	</TableContainer>
);

export default TableTaskListContainer;