// stub
const REGISTER_DEFAULT_USER = {
  fiscalNumber: '282692124',
  firstName: 'Mário',
  lastName: 'Monteiro',
  email: 'mario@koakh.com',
  username: 'mario',
  password: '12345678',
};
const KEYWORDS = {
	id: "id",
	fiscalNumber: "fiscalNumber",
	firstName: "firstName",
	lastName: "lastName",
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
const COOKIES = {
  jid: 'jid',
};

export const appConstants = {
  KEYWORDS,
  MESSAGES,
  REGISTER_DEFAULT_USER,
  DEFAULT_LOGIN_CREDENTIALS,
  COOKIES,
};
