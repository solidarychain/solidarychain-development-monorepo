// stub
const REGISTER_DEFAULT_USER = {
  fiscalNumber: '282692124',
  firstname: 'Mário',
  lastname: 'Monteiro',
  email: 'mario@koakh.com',
  username: 'mario',
  password: '12345678',
};
const KEYWORDS = {
	id: "id",
	fiscalNumber: "fiscalNumber",
	firstname: "firstname",
	lastname: "lastname",
	email: "email",
	username: "username",
	password: "password",
};
const MESSAGES = {
  ERROR: {
    LOGIN_FAILED: 'login failed please try again...'
  }
}
const DEFAULT_LOGIN_CREDENTIALS = {
  username: 'johndoe',
  password: '12345678',
};

export const appConstants = {
  KEYWORDS,
  MESSAGES,
  REGISTER_DEFAULT_USER,
  DEFAULT_LOGIN_CREDENTIALS,
};
