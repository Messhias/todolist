import React from "react";
import HeaderMenu from "../components/HeaderMenu";
import {Button, FormControl, Grid, MenuItem, OutlinedInput, Select} from "@mui/material";
import {connect} from "react-redux";
import {get} from "../actions/Status";
import {create, find} from "../actions/Tasks";

class AddNewTask extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			deadline: "",
			status_id: "",
			action: () => {
			},
		}

		this.props.get();
	}

	componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
		if (this.props !== prevProps) {
			const {
				status = []
			} = this.props;

			if (status.length > 0) {
				let status_id = status.filter(s => s.name === "OPEN");

				if (status_id.length > 0) {
					status_id = status_id[0].id;

					this.setState({
						status_id
					});
				}
			}
		}
	}

	render() {
		const {
				status = []
			} = this.props,
			{
				name = "",
				deadline = "",
				status_id = "",
			} = this.state;

		return (
			<Grid
				xs={12}
				sm={12}
				lg={12}
				md={12}
				item
				container
			>
				<HeaderMenu history={this.props.history}/>
				<FormControl fullWidth>
					<OutlinedInput
						placeholder={"Task name"}
						id={"name"}
						name={"name"}
						value={name}
						onChange={(event) =>
							this.setState({
								name: event.target.value,
							})
						}
						fullWidth
					/>
				</FormControl>
				<FormControl fullWidth>
					<OutlinedInput
						type={"date"}
						placeholder={"Deadline"}
						id={"deadline"}
						name={"deadline"}
						value={deadline}
						onChange={(event) =>
							this.setState({
								deadline: event.target.value,
							})
						}
						fullWidth
					/>
				</FormControl>
				<FormControl fullWidth>
					<Select
						label="Status"
						value={status_id}
						onChange={(event => this.setState({
							status_id: event.target.value,
						}))}
					>
						<MenuItem value={""} disabled>
							<em>SELECT STATUS</em>
						</MenuItem>
						{
							status.length > 0 && status.map(s =>
								<MenuItem
									key={s.id}
									value={s.id}
								>
									{s.name}
								</MenuItem>
							)
						}
					</Select>
				</FormControl>
				<FormControl fullWidth>
					<Button
						variant={"outlined"}
						onClick={() => this.props.create({
							name,
							status_id,
							deadline,
						})}
						disabled={name === "" || status_id === ""}
					>
						ADD NEW TASK
					</Button>
				</FormControl>
			</Grid>
		);
	}
}

const mapStateToProps = state => {
	return {
		...state.StatusStore,
		...state.TasksStore,
	};
}

const mapDispatchToProps = () => dispatch => ({
	get: () => dispatch(get()),
	create: (data) => dispatch(create(data)),
	find: (id) => dispatch(find(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddNewTask);