// Warn if changes model names, don't forget to change views ex
// "map": "function(doc) {if (doc.type.toUpperCase() === 'com.chain.solidary.model.person'...

// this is used to detected ids in transactions that are fiscalNumbers, detected by prefix
const FISCAL_NUMBER_VALID_PREFIX = ['PT', 'ES'];
// used when create input person in transactions, when persons don't exists we create it on the fly
const PERSON_DEFAULT_MINIMAL_ENTITY_PASSWORD = 'qz5HbnzA5B9bp3Kg';
const PERSON_DEFAULT_MINIMAL_ENTITY_MOBILE_PHONE = '+351000000000';

// convector models
const CONVECTOR_MODEL_PATH_PREFIX: string = 'com.chain.solidary.model';
const CONVECTOR_MODEL_PATH_PARTICIPANT: string = `${CONVECTOR_MODEL_PATH_PREFIX}.participant`;
const CONVECTOR_MODEL_PATH_PERSON: string = `${CONVECTOR_MODEL_PATH_PREFIX}.person`;
const CONVECTOR_MODEL_PATH_CAUSE: string = `${CONVECTOR_MODEL_PATH_PREFIX}.cause`;
const CONVECTOR_MODEL_PATH_ASSET: string = `${CONVECTOR_MODEL_PATH_PREFIX}.asset`;
const CONVECTOR_MODEL_PATH_TRANSACTION: string = `${CONVECTOR_MODEL_PATH_PREFIX}.transaction`;
const CONVECTOR_MODEL_PATH_GOODS: string = `${CONVECTOR_MODEL_PATH_PREFIX}.goods`;
const CONVECTOR_MODEL_PATH_ENTITY: string = `${CONVECTOR_MODEL_PATH_PREFIX}.entity`;
const CONVECTOR_MODEL_PATH_COMMON: string = `${CONVECTOR_MODEL_PATH_PREFIX}.common`;
const CONVECTOR_MODEL_PATH_ATTRIBUTE: string = `${CONVECTOR_MODEL_PATH_PREFIX}.attribute`;
const CONVECTOR_MODEL_PATH_X509IDENTITY: string = `${CONVECTOR_MODEL_PATH_PREFIX}.x509identity`;
const CONVECTOR_MODEL_PATH_ENTITY_BALANCE: string = `${CONVECTOR_MODEL_PATH_PREFIX}.entityBalance`;
const CONVECTOR_MODEL_PATH_PARTICIPANT_NAME: string = 'Participant';
const CONVECTOR_MODEL_PATH_PERSON_NAME: string = 'Person';
const CONVECTOR_MODEL_PATH_CAUSE_NAME: string = 'Cause';
const CONVECTOR_MODEL_PATH_ASSET_NAME: string = 'Asset';
const CONVECTOR_MODEL_PATH_TRANSACTION_NAME: string = 'Transaction';

// note if change Participant, Person or Cause don't forget to change hard coded string in EntityType ./types.ts to

// participant
const GOV_UUID: string = 'c8ca045c-9d1b-407f-b9ae-31711758f2d0';
const GOV_CODE: String = 'gov';
const GOV_NAME: String = 'Big Government';
const NAB_UUID: string = 'b130558c-b910-4e82-b92b-caa199a047c1';
const NAB_CODE: string = 'nab';
const NAB_NAME: string = 'National Bank';
// person
const DEFAULT_PASSWORD: string = 'Aa456#45';
const JOHN_UUID: string = '4ea88521-031b-4279-9165-9c10e1839002';
const JOHN_FIRST_NAME: string = 'John';
const JOHN_LAST_NAME: string = 'Doe';
const JOHN_USER_NAME: string = 'johndoe';
const JOHN_EMAIL: string = `${JOHN_USER_NAME}@example.com`;
const JOHN_FISCAL_NUMBER: string = 'PT182692124';
const JANE_UUID: string = '4ea88521-031b-4279-9165-9c10e1839002';
const JANE_FIRST_NAME: string = 'Jane';
const JANE_LAST_NAME: string = 'Doe';
const JANE_USER_NAME: string = 'janedoe';
const JANE_EMAIL: string = `${JANE_USER_NAME}@example.com`;
const JANE_FISCAL_NUMBER: string = 'PT582692178';

// yup messages
const YUP_MESSAGE_INTEGER: string = 'Should be a integer number.';
const YUP_MESSAGE_USERNAME_TO_SHORT: string = 'Username is too short - should be 4 chars minimum.';
const YUP_MESSAGE_USERNAME_TO_LONG: string = 'Username is too long - should be 16 chars maximum.';
const YUP_MESSAGE_PASSWORD_TO_SHORT: string = 'Password is too short - should be 8 chars minimum.';
// regex yup messages
const YUP_MESSAGE_INVALID_EMAIL: string = 'Should be a valid email.';
const YUP_MESSAGE_INVALID_PHONE_NUMBER: string = 'Should be a valid international phone number.';
const YUP_MESSAGE_INVALID_FISCAL_NUMBER: string = 'Should be a valid fiscal number.';
const YUP_MESSAGE_INVALID_UUID_V4: string = 'Should be a valid uuid v4.';
const YUP_MESSAGE_INVALID_PASSWORD: string = 'Password can only contain Latin letters and numbers.';
// regex expressions
const REGEX_EMAIL: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const REGEX_UUID_V4: RegExp = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
const REGEX_PASSWORD: RegExp = /[1-9a-zA-Z]/;
const REGEX_LOCATION: RegExp = /^([-+]?)([\d]{1,2})(((\.)(\d+)(,)))(\s*)(([-+]?)([\d]{1,3})((\.)(\d+))?)$/i;
// phone number ex +351936282828
const REGEX_PHONE_NUMBER: RegExp = /^(?!\b(0)\1+\b)(\+?\d{1,3}[. -]?)?\(?\d{3}\)?([. -]?)\d{3}\3\d{4}$/i;
// portuguese fiscalNumber
const REGEX_FISCAL_NUMBER: RegExp = /^[A-Z]{2}[0-9]{9}$/i;
// exception error messages
const EXCEPTION_ERROR_NO_COMPLEX_QUERY: string = 'You must supply a valid filter in complex query.';

export const appConstants = {
	FISCAL_NUMBER_VALID_PREFIX,
	PERSON_DEFAULT_MINIMAL_ENTITY_PASSWORD,
	PERSON_DEFAULT_MINIMAL_ENTITY_MOBILE_PHONE,
	// convector models
	CONVECTOR_MODEL_PATH_PREFIX,
	CONVECTOR_MODEL_PATH_ENTITY,
	CONVECTOR_MODEL_PATH_PARTICIPANT,
	CONVECTOR_MODEL_PATH_PERSON,
	CONVECTOR_MODEL_PATH_CAUSE,
	CONVECTOR_MODEL_PATH_ASSET,
	CONVECTOR_MODEL_PATH_TRANSACTION,
	CONVECTOR_MODEL_PATH_COMMON,
	CONVECTOR_MODEL_PATH_ATTRIBUTE,
	CONVECTOR_MODEL_PATH_X509IDENTITY,
	CONVECTOR_MODEL_PATH_ENTITY_BALANCE,
	CONVECTOR_MODEL_PATH_GOODS,
	CONVECTOR_MODEL_PATH_PARTICIPANT_NAME,
	CONVECTOR_MODEL_PATH_PERSON_NAME,
	CONVECTOR_MODEL_PATH_CAUSE_NAME,
	CONVECTOR_MODEL_PATH_ASSET_NAME,
	CONVECTOR_MODEL_PATH_TRANSACTION_NAME,
	// seed
	GOV_UUID,
	GOV_CODE,
	GOV_NAME,
	NAB_UUID,
	NAB_CODE,
	NAB_NAME,
	DEFAULT_PASSWORD,
	JOHN_UUID,
	JOHN_FIRST_NAME,
	JOHN_LAST_NAME,
	JOHN_USER_NAME,
	JOHN_EMAIL,
	JOHN_FISCAL_NUMBER,
	JANE_UUID,
	JANE_FIRST_NAME,
	JANE_LAST_NAME,
	JANE_USER_NAME,
	JANE_EMAIL,
	JANE_FISCAL_NUMBER,
	// yup messages
	YUP_MESSAGE_INTEGER,
	YUP_MESSAGE_USERNAME_TO_SHORT,
	YUP_MESSAGE_USERNAME_TO_LONG,
	YUP_MESSAGE_PASSWORD_TO_SHORT,
	// regex yup messages
	YUP_MESSAGE_INVALID_EMAIL,
	YUP_MESSAGE_INVALID_PHONE_NUMBER,
	YUP_MESSAGE_INVALID_FISCAL_NUMBER,
	YUP_MESSAGE_INVALID_UUID_V4,
	YUP_MESSAGE_INVALID_PASSWORD,
	// regex expressions
	REGEX_EMAIL,
	REGEX_PHONE_NUMBER,
	REGEX_FISCAL_NUMBER,
	REGEX_UUID_V4,
	REGEX_PASSWORD,
	REGEX_LOCATION,
	// exception error messages
	EXCEPTION_ERROR_NO_COMPLEX_QUERY,
};
