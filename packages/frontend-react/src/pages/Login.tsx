import * as React from 'react';
import { Fragment } from 'react';
import { RouteComponentProps } from 'react-router';
import { ActionType, useStateValue } from '../app/state';
import { setAccessToken, headerLinksNavStyle } from '../common';
import { ShowMessage, Loading } from '../components';
import { LoginPersonInput, PersonProfileDocument, usePersonLoginMutation } from '../generated/graphql';
import { Link } from 'react-router-dom';
import { appConstants as c } from '../constants';
import { MessageType } from '../types';

// use RouteComponentProps to get history props from Route
export const Login: React.FC<RouteComponentProps> = ({ history, location }) => {
	// get hook
	const [, dispatch] = useStateValue();

	const defaults = {
		username: 'koakh',
		password: '12345678',
	};
	// hooks: state
	const [username, setUsername] = React.useState(defaults.username)
	const [password, setPassword] = React.useState(defaults.password);

	// hooks: apollo
	const [personLoginMutation, { loading, error }] = usePersonLoginMutation();
	// handlers
	const onChangeUsernameHandler = (e: React.SyntheticEvent) => {
		setUsername((e.target as HTMLSelectElement).value)
	};
	const onChangePasswordHandler = (e: React.SyntheticEvent) => {
		setPassword((e.target as HTMLSelectElement).value)
	};

	const onSubmitFormHandler = async (e: any) => {
		try {
			e.preventDefault();
			const loginPersonData: LoginPersonInput = {
				username, password
			};
			const response = await personLoginMutation({
				variables: { loginPersonData },
				// access data
				update: (store, { data }) => {
					if (!data) {
						return null
					}
					// this will update message `You are logged in as: ${username}` that is using apollo cache
					// update apollo cache with new data, this will update usePersonProfileQuery cache
					// warning: for this to work data return fields from personLoginMutation must match usePersonProfileQuery
					// check console warnings for messages like `Missing field personProfile in`
					store.writeQuery({
						// must use postfix Document type gql``
						query: PersonProfileDocument,
						data: {
							// must match personProfile with personLogin.user return objects
							personProfile: data.personLogin.user
						}
					});
				}
			}).catch(error => {
				throw error;
			})

			if (response && response.data.personLogin) {
				// set inMemory global accessToken variable
				setAccessToken(response.data.personLogin.accessToken);
				// dispatch state
				const { user } = response.data.personLogin;
				const payload = {
					profile: {
						id: user.id,
						firstname: user.username,
						lastname: user.lastname,
						username: user.username,
						email: user.email,
						roles: user.roles
					}
				};
				dispatch({ type: ActionType.LOGGED_USER, payload });
				// use history to send user to homepage, after awaiting for response object, 
				history.push('/');
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Fragment>
      <div style={headerLinksNavStyle}>
        <Link to='/register'>register</Link>
      </div>
			<h2>Login</h2>
			<form onSubmit={(e) => onSubmitFormHandler(e)}>
				{/* username */}
				<label>{c.KEYWORDS.username}:</label>
				<div>
					<input
						value={username}
						placeholder='username'
						onChange={(e) => onChangeUsernameHandler(e)} />
				</div>
				{/* password */}
				<label>{c.KEYWORDS.password}:</label>
				<div>
					<input
						value={password}
						placeholder='password'
						type='password'
						onChange={(e) => onChangePasswordHandler(e)} />
				</div>
				{/* submit */}
				<button type='submit'>login</button>
			</form>
			{(location.state && location.state.message) && <ShowMessage type={MessageType.SUCCESS} message={location.state.message} />}
			{error && <ShowMessage type={MessageType.ERROR} message={c.MESSAGES.ERROR.LOGIN_FAILED} />}
			{loading && <Loading />}
		</Fragment>
	);
}
