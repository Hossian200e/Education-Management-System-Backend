import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const getUserGroups = async () => {
  return axios.get(`${API_URL}/user-groups`);
};

export const getGroupRoles = async (groupId) => {
  return axios.get(`${API_URL}/user-groups/${groupId}/roles`);
};

export const setGroupRole = async (groupId, roleName) => {
  return axios.post(`${API_URL}/user-groups/${groupId}/roles`, { role_name: roleName });
};
