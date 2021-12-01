import {Grid, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import HeaderMenu from "../components/HeaderMenu";
import {connect, useDispatch} from "react-redux";
import React, {useCallback, useEffect, useState} from "react";
import {create, erase, get, update} from "../actions/Status";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@mui/material/Button";
import AddNewStatusForm from "../components/Status/AddNewStatusForm";
import EditIcon from "@material-ui/icons/Edit";
import {GET_STATUS} from "../actions/Status/types";

const Status = (props) => {
	const {
			get = () => {
			},
			erase = (id) => {
			},
			create = (data = {}) => {
			},
			update = (data = {}) => {
			},
			status = [],
			status_errors = {},
		} = props,
		[
			addFormOpen = false,
			handleFormOpen = () => {
			}
		] = useState(false),
		[
			editTask,
			handleEditTask
		] = useState(null),
		dispatch = useDispatch(),
		clearOnAdd = useCallback(() => dispatch({
			type: GET_STATUS,
			status_errors: [],
		}),
			[dispatch]
		)
	let [name, handleNameChange] = useState("");

	useEffect(() => {
		if (!addFormOpen) {
			get();
		}
		get();
	}, [
		get,
		addFormOpen
	]);

	return (
		<Grid
			xs={12}
			sm={12}
			lg={12}
			md={12}
			item
			container
		>
			<HeaderMenu history={props.history}/>

			<Grid
				xs={12}
				sm={12}
				lg={12}
				md={12}
				item
				container
			>
				<Button
					variant={"outlined"}
					onClick={() => {
						handleNameChange("");
						handleEditTask(null);
						handleFormOpen(!addFormOpen);
						clearOnAdd();
					}}
				>
					{
						addFormOpen ? "Close form" : "Add new status"
					}
				</Button>
			</Grid>
			{
				addFormOpen ?
					<AddNewStatusForm
						create={create}
						update={update}
						status_errors={status_errors}
						editTask={editTask}
						name={name}
						handleNameChange={handleNameChange}
					/>
					:
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>
									ID
								</TableCell>
								<TableCell>
									Name
								</TableCell>
								<TableCell>
									CREATE DATE
								</TableCell>
								<TableCell>
									ACTIONS
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{status.map(s =>
								<TableRow
									key={s.id}
								>
									<TableCell>
										{s.id}
									</TableCell>
									<TableCell>
										{s.name}
									</TableCell>
									<TableCell>
										{s.formatted_created_date}
									</TableCell>
									<TableCell>
										<Button
											aria-controls="basic-menu"
											aria-haspopup="true"
											onClick={() => erase(s.id)}
										>
											<DeleteIcon/>
										</Button>
										<Button
											aria-controls="basic-menu"
											aria-haspopup="true"
											onClick={() => {
												handleNameChange(s.name);
												handleEditTask(s);
												handleFormOpen(true);
											}}
										>
											<EditIcon />
										</Button>
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
			}
		</Grid>
	);
}

const mapStateToProps = state => state.StatusStore;

const mapDispatchToProps = dispatch => ({
	get: () => dispatch(get()),
	erase: (id) => dispatch(erase(id)),
	create: (data = {}) => dispatch(create(data ?? false)),
	update: (id, data) => dispatch(update(id, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Status);