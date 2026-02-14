const service = require("./userGroupRole.service");

const getAllGroups = async (req, res) => {
  try {
    const groups = await service.getAllUserGroupsFromRoleTable();
    res.json(groups);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to get user groups" });
  }
};

module.exports = {
  getAllGroups,
};
