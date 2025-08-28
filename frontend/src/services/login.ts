import baseApi from "./api";
import BaseUrl from "../configs/BaseUrl";
import type { ILogin, IPayload, ISetPayload } from "../components/types";

const api = baseApi(BaseUrl.API_LOGIN);

async function loginAccount(loginPayload: ILogin) {
  const result = await api.post("login", loginPayload);
  return result;
}

async function getAccount(id: string) {
  const result = await api.get(`accounts/${id}`);
  return result.data;
}

async function singUp(payload: IPayload) {
  const result = await api.post("accounts", payload);

  return result;
}

async function setAccount(id: string, payload: ISetPayload) {
  const result = await api.patch(`accounts/${id}`, payload);

  return result;
}

function logout() {
  return localStorage.removeItem("token");
}

function getToken() {
  return localStorage.getItem("token");
}

function getId() {
  return localStorage.getItem("userId");
}

async function deleteAccount(id: string) {
  return await api.delete(`accounts/${id}`);
}

async function deleteRefresh(id: string) {
  return await api.delete(`refresh/${id}`);
}

export default {
  loginAccount,
  singUp,
  setAccount,
  logout,
  getAccount,
  deleteAccount,
  getToken,
  getId,
  deleteRefresh,
};
