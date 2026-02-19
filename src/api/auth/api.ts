import type { Auth, User } from "./model";

const user: User = {
  username: "ak@gmail.com",
  password: "12345678",
  firstName: "علی",
  lastName: "کمیجانی",
};
const auth: Auth = {
  user,
  refreshToken: "refreshToken",
  accessToken: "accessToken",
};

export async function fakeLogin(params: {
  username: string;
  password: string;
}): Promise<{ data: Auth; status: number }> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (
        params.username === user.username &&
        params.password === user.password
      ) {
        resolve({ data: auth, status: 200 });
      }
      reject({ data: { message: "invalid credential" }, status: 400 });
    }, 2000);
  });
}
