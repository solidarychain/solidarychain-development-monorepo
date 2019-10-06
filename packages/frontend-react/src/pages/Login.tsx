import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { setAccessToken } from '../common';
import { ErrorMessage, Loading } from '../components';
import { LoginPersonInput, PersonProfileDocument, usePersonLoginMutation } from '../generated/graphql';

// use RouteComponentProps to get history props from Route
export const Login: React.FC<RouteComponentProps> = ({ history }) => {
	const defaults = {
		username: 'johndoe',
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

			if (response && response.data) {
				// set inMemory global accessToken variable
				setAccessToken(response.data.personLogin.accessToken);
				// use history to send user to homepage, after awaiting for response object
				history.push('/');
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<React.Fragment>
			<h2>Login</h2>
			<form onSubmit={(e) => onSubmitFormHandler(e)}>
				<input
					value={username}
					placeholder='username'
					onChange={(e) => onChangeUsernameHandler(e)} />
				<input
					value={password}
					placeholder='password'
					type='password'
					onChange={(e) => onChangePasswordHandler(e)} />
				<button type='submit'>login</button>
			</form>
			{error && <ErrorMessage error={error.message} />}
			{loading && <Loading />}
		</React.Fragment>
	);
}
