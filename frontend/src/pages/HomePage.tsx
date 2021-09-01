import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { useActions } from '../actions';
import { HomeBox } from '../components';
import * as AuthActions from '../actions/auth';
import { RootState } from '../reducers/index';

export function HomePage() {
	const classes = useStyles();
	const [boxColor, setBoxColor] = React.useState('red');
	const todoList = useSelector((state: RootState) => state.todoList);
	const authActions = useActions(AuthActions);

	const onButtonClick = () => setBoxColor(boxColor === 'red' ? 'blue' : 'red');

	React.useEffect(() => {
		authActions.tryLogin({ email: 'admin@todo.com', password: 'password' });
	}, []);

	return (
		<div className={classes.root}>
			<Typography variant="h4" gutterBottom>
				You have {todoList.length} TODOs in your list!
			</Typography>
			<div className={classes.centerContainer}>
				<HomeBox size={300} color={boxColor} />
				<Button className={classes.button} onClick={onButtonClick} variant="outlined" color="primary">
					Change Color
				</Button>
			</div>
		</div>
	);
}

const useStyles = makeStyles({
	root: {
		height: '100%',
		textAlign: 'center',
		paddingTop: 20,
		paddingLeft: 15,
		paddingRight: 15,
	},

	centerContainer: {
		flex: 1,
		height: '90%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column',
	},

	button: {
		marginTop: 20,
	},
});
