import React, { useState, Fragment } from 'react';
import { usePersonNewMutation, NewPersonInput } from '../generated/graphql';
import { RouteComponentProps } from 'react-router';
import { errorStyle, loadingStyle } from '../common';

// use RouteComponentProps to get history props from Route
export const Register: React.FC<RouteComponentProps> = ({ history }) => {
	const defaults = {
		id: '1-100-200',
		firstname: 'Mário',
		lastname: 'Monteiro',
		email: 'mario@koakh.com',
		username: 'mario',
		password: '12345678',
	};
	// hooks: state
	const [id, setId] = useState(defaults.id)
	const [firstname, setFirstname] = useState(defaults.firstname)
	const [lastname, setLastname] = useState(defaults.lastname)
	const [email, setEmail] = useState(defaults.email);
	const [username, setUsername] = useState(defaults.username)
	const [password, setPassword] = useState(defaults.password);

	// hooks: apollo
	const [personNewMutation, { loading, error }] = usePersonNewMutation();
	// handlers
	const onChangeIdHandler = (e: React.SyntheticEvent) => {
		setId((e.target as HTMLSelectElement).value)
	};
	const onChangeFirstnameHandler = (e: React.SyntheticEvent) => {
		setFirstname((e.target as HTMLSelectElement).value)
	};
	const onChangeLastnameHandler = (e: React.SyntheticEvent) => {
		setLastname((e.target as HTMLSelectElement).value)
	};
	const onChangeEmailHandler = (e: React.SyntheticEvent) => {
		setEmail((e.target as HTMLSelectElement).value)
	};
	const onChangeUsernameHandler = (e: React.SyntheticEvent) => {
		setUsername((e.target as HTMLSelectElement).value)
	};
	const onChangePasswordHandler = (e: React.SyntheticEvent) => {
		setPassword((e.target as HTMLSelectElement).value)
	};

	const onSubmitFormHandler = async (e: any) => {
		try {
			e.preventDefault();
			const newPersonData: NewPersonInput = {
				id, firstname, lastname, email, username, password
			};
			const response = await personNewMutation({ variables: { newPersonData } }).catch(error => {
				throw error;
			})

			if (response) {
				// use history to send user to homepage, after awaiting for response object
				history.push('/');
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Fragment>
			<h2>Register</h2>
			<form onSubmit={(e) => onSubmitFormHandler(e)}>
				<input
					value={id}
					placeholder='id'
					onChange={(e) => onChangeIdHandler(e)} />
				<input
					value={firstname}
					placeholder='firstname'
					onChange={(e) => onChangeFirstnameHandler(e)} />
				<input
					value={lastname}
					placeholder='lastname'
					onChange={(e) => onChangeLastnameHandler(e)} />
				<input
					value={email}
					placeholder='email'
					onChange={(e) => onChangeEmailHandler(e)} />
				<input
					value={username}
					placeholder='username'
					onChange={(e) => onChangeUsernameHandler(e)} />
				<input
					value={password}
					placeholder='password'
					type='password'
					onChange={(e) => onChangePasswordHandler(e)} />
				<button type='submit'>register</button>
			</form>
			{error && <p style={errorStyle}>{JSON.stringify(error.message, undefined, 2)}</p>}
			{loading && <p style={loadingStyle}>Loading....</p>}
		</Fragment>
	);
}
