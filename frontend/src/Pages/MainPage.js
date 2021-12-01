import React from "react";
import {connect} from "react-redux";
import {erase, find, get, update} from "../actions/Tasks";
import {get as getStatus} from '../actions/Status';
import HeaderMenu from "../components/HeaderMenu";
import {Button, Grid,} from "@mui/material";
import Pusher from 'pusher-js';
import TasksList from "../components/MainPage/TasksList";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";
import TaskDetails from "../components/Task/TaskDetails";


class MainPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			changeStatusOptionsOpen: false,
			taskId: null,
			taskModalOpen: false,
		};
		this.props.get();
		this.pusher = new Pusher(process.env.REACT_APP_PUSHER_ID, {
			cluster: 'eu'
		});
		this.pusher.logToConsole = true;
	}

	componentDidMount() {
		this.pusher.subscribe('my-channel')
			.bind('my-event', () => this.props.get());
	}

	componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
		if (this.props !== prevProps) {
			const {
					task = {}
				} = this.props;

			if (task?.id) {
				this.setState({
					taskModalOpen: true,
				});
			} else {
				this.setState({
					taskModalOpen: false,
				});
			}
		}
	}

	handleChangeModal = (open = false) => this.setState({
		taskModalOpen: !open,
	});

	render() {
		const {
				tasks = [],
				status = [],
				task = {
					id: 0,
					name: "",
				},
				loading_tasks = false,
				loading_task = false,
			} = this.props,
			{
				changeStatusOptionsOpen = false,
				taskId = null,
				taskModalOpen = false,
			} = this.state;

		return (
			<Grid
				id={"main-page-container"}
				xs={12}
				sm={12}
				lg={12}
				md={12}
				item
				container
			>
				<HeaderMenu history={this.props.history}/>
				<Grid
					id={"main-page-buttons-container"}
					xs={12}
					sm={12}
					lg={12}
					md={12}
					item
					container
				>
					<Button
						variant={"outlined"}
						onClick={() => this.props.history.push("/tasks/add")}
					>
						ADD NEW TASK
					</Button>
				</Grid>


				<DndProvider backend={HTML5Backend}>
					<TasksList
						tasks={tasks ?? []}
						status={status ?? []}
						changeStatusOptionsOpen={changeStatusOptionsOpen}
						taskId={taskId}
						component={this}
						getStatus={this.props.getStatus}
						update={this.props.update}
						erase={this.props.erase}
						handleChangeModal={this.handleChangeModal}
						taskModalOpen={taskModalOpen}
						find={this.props.find}
						history={this.props.history}
					/>
				</DndProvider>
				{
					!loading_task && (
						<TaskDetails
							handleChangeModal={this.handleChangeModal}
							taskModalOpen={taskModalOpen}
							find={this.props.find}
							task={task}
							update={this.props.update}
							loading_tasks={loading_tasks}
							status={status}
						/>
					)
				}
			</Grid>
		);
	}
}

const mapStateToProps = state => {
	const {
		StatusStore,
		TasksStore,
	} = state;

	return {
		...StatusStore,
		...TasksStore,
	}
}

const mapDispatchToProps = dispatch => ({
	get: () => dispatch(get([
		"status",
	])),
	getStatus: dispatch(getStatus()),
	update: (id, body) => dispatch(update(id, body)),
	erase: (id) => dispatch(erase(id)),
	find: (id) => dispatch(find(id, ['status', "status_history.status"])),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
