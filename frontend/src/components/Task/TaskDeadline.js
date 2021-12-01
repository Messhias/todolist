import {Grid} from "@mui/material";
import PropTypes from "prop-types";
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';


const TaskDeadline = (
	props = {
		task: {
			id: null,
			deadline: "",
		},
	}
) => (
	<Grid
		xs={4}
		sm={4}
		md={4}
		lg={4}
		alignContent={"flex-start"}
		alignItems={"flex-start"}
		direction={'column'}
		item
		container
	>
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<DatePicker
				label="Deadline"
				value={props?.task?.deadline}
				onChange={(newValue) => {
					props?.update(props?.task?.id, {
						deadline: newValue,
                    });
				}}
				renderInput={(params) => <TextField {...params} />}
			/>
		</LocalizationProvider>
	</Grid>
);

TaskDeadline.prototype = {
	task: PropTypes.shape({
        id: PropTypes.string.isRequired,
    }).isRequired,
	update: PropTypes.func.isRequired,
};

export default TaskDeadline;