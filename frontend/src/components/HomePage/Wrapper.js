import {Grid} from "@mui/material";
import HomePageHeaderMenu from "./Header/HomePageHeaderMenu";


const  Wrapper = (props) => (
	<Grid
		xs={12}
		lg={12}
		sm={12}
		md={12}
		item
		container
	>
		<HomePageHeaderMenu />
		{/*{props.children}*/}
	</Grid>
);

export default Wrapper