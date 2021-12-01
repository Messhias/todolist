
import React, {useEffect} from "react";
import PropTypes from "prop-types";
import {isEmptyObject} from "../../utils/Helpers";
import {Button, FormControl, Grid, OutlinedInput} from "@mui/material";


const showErrors = (status_errors = {}) => {
	if (!isEmptyObject(status_errors)) {
		const view = [];
		for (var key in status_errors) {
			if (status_errors[key].length > 0) {
				status_errors[key].forEach(s =>
					view.push(
						<li key={s}>
							{s}
						</li>
					)
				)
			}

			return (
				<FormControl
					fullWidth
				>
					<ul>
						{view}
					</ul>
				</FormControl>
			);
		}
	}

	return []
}

const actionButtons = (editTask = null, name, props) => {

	if (editTask) {
		return (
			<Button
				variant={"outlined"}
				onClick={() => props.update(editTask.id, {
					name,
				})}
				disabled={name === ""}
			>
				EDIT
			</Button>
		);
	}

	return (
		<Button
			variant={"outlined"}
			onClick={() => props.create({
				name,
			})}
			disabled={name === ""}
		>
			Add
		</Button>
	);
};

const AddNewStatusForm = (props = {
	create: () => {
	},
	update: () => {
	},
	handleNameChange: () => {
	},
	status_errors: {},
	editTask: null,
	name: "",
}) => {

	useEffect(() => false, [
		props.status_errors,
	]);

	return (
		<Grid
			xs={12}
			lg={12}
			sm={12}
			md={12}
			item
		>
			<FormControl
				variant={"outlined"}
				fullWidth
			>
				<OutlinedInput
					onChange={(event) => {
						props.handleNameChange(event.target.value);
					}}
					placeholder={"Status name"}
					label={"Status name"}
					name={"name"}
					id={"name"}
					defaultValue={props.name}
					fullWidth
				/>
			</FormControl>
			{showErrors(props.status_errors)}
			<FormControl
				variant={"outlined"}
			>
				{actionButtons(props.editTask, props.name, props)}
			</FormControl>
		</Grid>
	);
}

AddNewStatusForm.propTypes = {
	create: PropTypes.func.isRequired,
	status_errors: PropTypes.any,
}

export default AddNewStatusForm;