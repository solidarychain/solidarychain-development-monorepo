// https://github.com/auth0/node-jsonwebtoken#usage
// https://github.com/zeit/ms
const jwtSecret = process.env.JWT_SECRET = 'secretKey';
const jwtExpiresIn = process.env.JWT_EXPIRES_IN = '1h';

export const jwtConstants = {
  secret: jwtSecret,
  expiresIn: jwtExpiresIn,
};
