export type User = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
};
export type Auth = {
  user: User;
  refreshToken: string;
  accessToken: string;
};
