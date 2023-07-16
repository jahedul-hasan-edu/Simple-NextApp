import axios from "axios";
const apiBaseUrl = process.env.NEXT_PUBLIC_BASE_URL;
import { authToken, userInfo } from "../app/components/signal";
const apiHeader = {
  "Content-type": "application/json",
  // "Authorization": localStorage.getItem("revetment-token"),
};
export const API = axios.create({
  baseURL: apiBaseUrl,
  headers: apiHeader,
});
const api = API;
//======================Auth APi================
export const login = async (payload) => {
  const apiReqUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`;
  const res = await axios.post(apiReqUrl, payload);
  if (res) {
    localStorage.setItem("revetment-token", res.data.jwt?.token);
    localStorage.setItem("userInfo", JSON.stringify(res.data?.userData));
    userInfo.value = res.data?.userData;
    authToken.value = res.data.jwt?.token;
    api.defaults.headers.common["Authorization"] = `${res.data.jwt?.token}`;
    return res.data;
  }
};
export const signup = async (body) => {
  const apiReqUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/signup`;
  const res = await axios.post(apiReqUrl, body);
  if (res) {
    return res.data;
  }
};
export const logout = async () => {
  const apiReqUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/logout`;
  const res = await api.post(apiReqUrl);
  if (res) {
    return res.data;
  }
};

//====================Users=======================
export const getAllUsers = async () => {
  const apiReqUrl = `/admin/get-all-users`;
  const res = await api.get(apiReqUrl);
  if (res) {
    return res.data;
  }
};
export const editUser = async (data) => {
  const { userid, body } = data;
  const apiReqUrl = `/admin/edit-user/${userid}`;
  const res = await api.patch(apiReqUrl, body);
  if (res) {
    return res.data;
  }
};
export const createUser = async (body) => {
  const apiReqUrl = `/admin/create-user`;
  const res = await api.post(apiReqUrl, body);
  if (res) {
    return res.data;
  }
};
export const deleteUser = async (userid) => {
  const apiReqUrl = `/admin/delete-user/${userid}`;
  const res = await api.delete(apiReqUrl);
  if (res) {
    return res.data;
  }
};
export const verifyUser = async (data) => {
  const { userid, body } = data;
  const apiReqUrl = `/admin/verify-user/${userid}`;
  const res = await api.post(apiReqUrl, body);
  if (res) {
    return res.data;
  }
};

//====================Ledger=======================
export const createLedger = async (body) => {
  const apiReqUrl = `/ledger/`;
  const res = await api.post(apiReqUrl, body);
  if (res) {
    return res.data;
  }
};
export const getLedgerById = async (ledger_id) => {
  const apiReqUrl = `/ledger/get-ledgerbyid/${ledger_id}`;
  const res = await api.get(apiReqUrl);
  if (res) {
    return res.data;
  }
};
export const getAllLedgers = async (pageInfo) => {
  const { value, page, limit } = pageInfo;
  const apiReqUrl = `/ledger/?value=${value}&page=${page}&limit=${limit}`;
  const res = await api.get(apiReqUrl);
  if (res) {
    return res.data;
  }
};
export const updateLedger = async (body, ledger_id) => {
  const apiReqUrl = `/ledger/${ledger_id}`;
  const res = await api.patch(apiReqUrl, body);
  if (res) {
    return res.data;
  }
};

export const deleteLedger = async (ledger_id) => {
  const apiReqUrl = `/ledger/${ledger_id}`;
  const res = await api.delete(apiReqUrl);
  if (res) {
    return res.data;
  }
};
//=====================profile======================
export const userProfile = async (body) => {
  const apiReqUrl = "/users/";
  const res = await api.patch(apiReqUrl, body);
  if (res) {
    return res.data;
  }
};

//===================Documents==========================
export const createDocument = async (body) => {
  const apiReqUrl = `/document/`;
  const res = await api.post(apiReqUrl, body);
  if (res) {
    return res.data;
  }
};
export const getAllDocuemt = async (paginationInfo, activePage) => {
  const apiReqUrl = `/document?value=${paginationInfo.value}&page=${activePage}&limit=${paginationInfo.limit}`;
  const res = await api.get(apiReqUrl);
  if (res) {
    return res.data;
  }
};
export const deleteDocument = async (document_id) => {
  const apiReqUrl = `/document/${document_id}`;
  const res = await api.delete(apiReqUrl);
  if (res) {
    return res.data;
  }
};

//===================Revetment (Point_Line)==========================
export const getAllData = async () => {
  const apiReqUrl = `/revetment/`;
  const res = await api.get(apiReqUrl);
  if (res) {
    return res.data;
  }
};
