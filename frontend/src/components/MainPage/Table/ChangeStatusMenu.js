import {Menu, MenuItem} from "@mui/material";
import * as React from "react";
import {useRef} from "react";

/**
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const ChangeStatusMenu = (props = {
	status: [],
}): JSX.Element => {
	const reference = useRef(Math.random());

	if (props.changeStatusOptionsOpen) {
		return (
			<Menu
				open={props.changeStatusOptionsOpen}
				onClose={() => props.component.setState({
					changeStatusOptionsOpen: !props.changeStatusOptionsOpen
				})}
				id={"anchor-el-menu"}
				anchorEl={reference}
				keepMounted
			>
				{
					props?.status?.map(s =>
						<MenuItem
							key={s.id}
							onClick={() => {
								props.update(props.taskId, {
									status_id: s.id,
								});
								props.component.setState({
									changeStatusOptionsOpen: !props.changeStatusOptionsOpen
								});
							}}
						>
							{s.name}
						</MenuItem>
					)
				}
			</Menu>
		);
	}

	return [];
}

export default ChangeStatusMenu;