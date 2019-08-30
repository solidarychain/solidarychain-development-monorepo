export interface JwtPayload {
  exp: number;
  iat: number;
  sub: string | number;
  username: number;
}
