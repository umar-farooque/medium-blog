import { SigninType, SignupType } from "@umarkhan1999/medium-blog-types";
import { client } from "./httpClient";

async function createAccount(data: SignupType) {
  return await client.post(`/api/v1/user/signup`, data);
}

async function login(data: SigninType) {
  return await client.post(`/api/v1/user/signin`, data);
}
export { createAccount, login };
