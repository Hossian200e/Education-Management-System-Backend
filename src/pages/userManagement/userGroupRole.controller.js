const userGroupRoleService = require("./userGroupRole.service");

const getAllGroupsWithRoles = async (req, res) => {
  try {
    const groups = await userGroupRoleService.getAllUserGroupsWithRoles();
    res.json(groups);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to get user groups with roles" });
  }
};

const getGroupRoles = async (req, res) => {
  try {
    const roles = await userGroupRoleService.getRolesByGroupId(req.params.id);
    res.json(roles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to get roles for this group" });
  }
};

const addRole = async (req, res) => {
  try {
    const id = await userGroupRoleService.createRole(req.body);
    res.status(201).json({ message: "Role added", id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add role" });
  }
};

const updateRole = async (req, res) => {
  try {
    await userGroupRoleService.updateRole(req.params.id, req.body);
    res.json({ message: "Role updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update role" });
  }
};

module.exports = { getAllGroupsWithRoles, getGroupRoles, addRole, updateRole };
