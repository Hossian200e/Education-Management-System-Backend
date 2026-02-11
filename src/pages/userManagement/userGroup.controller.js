const userGroupService = require("./userGroup.service");

// GET /api/user-groups
const getAllGroups = async (req, res) => {
  try {
    const groups = await userGroupService.getAllGroups();
    res.json(groups);
  } catch (error) {
    console.error("GET GROUPS ERROR 👉", error);
    res.status(500).json({ message: "Failed to get groups" });
  }
};

// GET /api/user-groups/:id
const getGroup = async (req, res) => {
  try {
    const group = await userGroupService.getGroupById(req.params.id);
    if (!group) return res.status(404).json({ message: "Group not found" });
    res.json(group);
  } catch (error) {
    console.error("GET GROUP ERROR 👉", error);
    res.status(500).json({ message: "Failed to get group" });
  }
};

// POST /api/user-groups
const createGroup = async (req, res) => {
  try {
    const id = await userGroupService.createGroup(req.body);
    res.status(201).json({ message: "Group created", id });
  } catch (error) {
    console.error("CREATE GROUP ERROR 👉", error);
    res.status(500).json({ message: "Failed to create group" });
  }
};

// PUT /api/user-groups/:id
const updateGroup = async (req, res) => {
  try {
    await userGroupService.updateGroup(req.params.id, req.body);
    res.json({ message: "Group updated" });
  } catch (error) {
    console.error("UPDATE GROUP ERROR 👉", error);
    res.status(500).json({ message: "Failed to update group" });
  }
};

module.exports = {
  getAllGroups,
  getGroup,
  createGroup,
  updateGroup,
};
