import React, { Fragment, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { Loading, ErrorMessage } from '../components';
import { NewPersonInput, usePersonNewMutation } from '../generated/graphql';
import { Link } from 'react-router-dom';
import { appConstants as c } from '../constants';
import { v4 as uuid } from 'uuid';

// use RouteComponentProps to get history props from Route
export const Register: React.FC<RouteComponentProps> = ({ history }) => {
	// assign from appConstants
	const defaultUser = c.REGISTER_DEFAULT_USER;
	// hooks: state
	const [id, setId] = useState(uuid())
	const [fiscalNumber, setFiscalNumber] = useState(defaultUser.fiscalNumber)
	const [firstname, setFirstname] = useState(defaultUser.firstname)
	const [lastname, setLastname] = useState(defaultUser.lastname)
	const [email, setEmail] = useState(defaultUser.email);
	const [username, setUsername] = useState(defaultUser.username)
	const [password, setPassword] = useState(defaultUser.password);

	// hooks: apollo
	const [personNewMutation, { loading, error }] = usePersonNewMutation();
	// handlers
	const onChangeIdHandler = (e: React.SyntheticEvent) => {
		setId((e.target as HTMLSelectElement).value)
	};
	const onChangeFiscalNumberHandler = (e: React.SyntheticEvent) => {
		setFiscalNumber((e.target as HTMLSelectElement).value)
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
				id, fiscalNumber, firstname, lastname, email, username, password
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
					value={fiscalNumber}
					placeholder='fiscalNumber'
					onChange={(e) => onChangeFiscalNumberHandler(e)} />
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
			<div>
				<Link to='/'>login</Link>
			</div>
			{error && <ErrorMessage error={error.message}/>}
			{loading && <Loading/>}
		</Fragment>
	);
}
