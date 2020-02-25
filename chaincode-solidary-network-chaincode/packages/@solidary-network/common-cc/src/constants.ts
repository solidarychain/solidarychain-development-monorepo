// Warn if changes model names, don't forget to change views ex
// "map": "function(doc) {if (doc.type.toUpperCase() === 'network.solidary.convector.person'...

// convector models
const CONVECTOR_MODEL_PATH_PREFIX: string = 'network.solidary.convector';
const CONVECTOR_MODEL_PATH_ENTITY: string = `${CONVECTOR_MODEL_PATH_PREFIX}.entity`;
const CONVECTOR_MODEL_PATH_PARTICIPANT: string = `${CONVECTOR_MODEL_PATH_PREFIX}.participant`;
const CONVECTOR_MODEL_PATH_PERSON: string = `${CONVECTOR_MODEL_PATH_PREFIX}.person`;
const CONVECTOR_MODEL_PATH_CAUSE: string = `${CONVECTOR_MODEL_PATH_PREFIX}.cause`;
const CONVECTOR_MODEL_PATH_TRANSACTION: string = `${CONVECTOR_MODEL_PATH_PREFIX}.transaction`;
const CONVECTOR_MODEL_PATH_ATTRIBUTE: string = `${CONVECTOR_MODEL_PATH_PREFIX}.attribute`;
const CONVECTOR_MODEL_PATH_X509IDENTITY: string = `${CONVECTOR_MODEL_PATH_PREFIX}.x509identity`;

// yup messages
const YUP_MESSAGE_INTEGER: string = 'Should be a integer number.';
const YUP_MESSAGE_USERNAME_TO_SHORT: string = 'Username is too short - should be 6 chars minimum.';
const YUP_MESSAGE_USERNAME_TO_LONG: string = 'Username is too long - should be 16 chars maximum.';
const YUP_MESSAGE_PASSWORD_TO_SHORT: string = 'Password is too short - should be 6 chars minimum.';
// regex yup messages
const YUP_MESSAGE_INVALID_EMAIL: string = 'Should be a valid email.';
const YUP_MESSAGE_INVALID_UUID_V4: string = 'Should be a valid uuid v4.';
const YUP_MESSAGE_INVALID_PASSWORD: string = 'Password can only contain Latin letters and numbers.';
// regex expressions
const REGEX_EMAIL: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const REGEX_UUID_V4: RegExp = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/;
const REGEX_PASSWORD: RegExp = /[1-9a-zA-Z]/;
const REGEX_LOCATION: RegExp = /^([-+]?)([\d]{1,2})(((\.)(\d+)(,)))(\s*)(([-+]?)([\d]{1,3})((\.)(\d+))?)$/;
// exception error messages
const EXCEPTION_ERROR_NO_COMPLEX_QUERY: string = 'You must supply a valid filter in complex query.';

export const appConstants = {
	// convector models
	CONVECTOR_MODEL_PATH_PARTICIPANT,
	CONVECTOR_MODEL_PATH_PERSON,
	CONVECTOR_MODEL_PATH_ATTRIBUTE,
	CONVECTOR_MODEL_PATH_X509IDENTITY,
	CONVECTOR_MODEL_PATH_TRANSACTION,
	CONVECTOR_MODEL_PATH_ENTITY,
	CONVECTOR_MODEL_PATH_CAUSE,
	// yup messages
	YUP_MESSAGE_INTEGER,
	YUP_MESSAGE_USERNAME_TO_SHORT,
	YUP_MESSAGE_USERNAME_TO_LONG,
	YUP_MESSAGE_PASSWORD_TO_SHORT,
	// regex yup messages
	YUP_MESSAGE_INVALID_EMAIL,
	YUP_MESSAGE_INVALID_UUID_V4,
	YUP_MESSAGE_INVALID_PASSWORD,
	// regex expressions
	REGEX_EMAIL,
	REGEX_UUID_V4,
	REGEX_PASSWORD,
	REGEX_LOCATION, 
	// exception error messages
	EXCEPTION_ERROR_NO_COMPLEX_QUERY,
};
