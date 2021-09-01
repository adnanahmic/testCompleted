import { Auth, AuthActions } from '../model/index';

const BASE_URL = 'http://localhost:4000/v1/auth';

export function tryLogin(data: Auth) {
	return (dispatch: Function) =>
		fetch(`${BASE_URL}/login`, {
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((res) => res.json())
			.then((res) => {
				console.log('here');
				localStorage.setItem('token', res.data);
				dispatch({ type: AuthActions.LOGIN, payload: { isAuthenticated: true } });
			})
			.catch(() => dispatch({ type: AuthActions.LOGIN, payload: { isAuthenticated: false } }));
}

export default { tryLogin };
