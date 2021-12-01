import {Grid, Typography} from "@mui/material";


const HomePageHeaderMenu = () => (
	<Grid
		xs={12}
		sm={12}
		md={12}
		lg={12}
		spacing={2}
		item
		container
	>
		<Grid
			md={8}
			lg={8}
			direction={"column"}
			alignItems={"flex-start"}
			alignContent={"flex-start"}
			container
			item
		>
			<Grid
				md={12}
				lg={12}
				container
				item
			>
				<Grid
					md={2}
					lg={2}
					container
					item
				>
					<Typography>
						TBL
					</Typography>
				</Grid>
				<Grid
					md={10}
					lg={10}
					container
					item
				>
					<Typography>
						PERGUNTA E RESPOSTA
					</Typography>
				</Grid>
			</Grid>
		</Grid>
		<Grid
			md={4}
			lg={4}
			direction={"column"}
			alignItems={"flex-end"}
			alignContent={"flex-end"}
			container
			item
		>
			MENU FINAL
		</Grid>
	</Grid>
);

export default HomePageHeaderMenu;