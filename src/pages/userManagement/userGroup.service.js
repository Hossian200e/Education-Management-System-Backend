const db = require("../../config/db");

// Get all user groups
const getAllGroups = async () => {
  const [rows] = await db.query("SELECT * FROM user_groups ORDER BY ordering ASC");
  return rows;
};

// Get a single group by ID
const getGroupById = async (id) => {
  const [rows] = await db.query("SELECT * FROM user_groups WHERE id = ?", [id]);
  return rows[0];
};

// Create a new user group
const createGroup = async (data) => {
  const { name, titleEn, code, ordering, status, notes } = data;
  const [result] = await db.query(
    "INSERT INTO user_groups (name, titleEn, code, ordering, status, notes) VALUES (?, ?, ?, ?, ?, ?)",
    [name, titleEn, code, ordering || 0, status ? 1 : 0, notes || null]
  );
  return result.insertId;
};

// Update an existing group
const updateGroup = async (id, data) => {
  const { name, titleEn, code, ordering, status, notes } = data;
  await db.query(
    "UPDATE user_groups SET name = ?, titleEn = ?, code = ?, ordering = ?, status = ?, notes = ? WHERE id = ?",
    [name, titleEn, code, ordering || 0, status ? 1 : 0, notes || null, id]
  );
  return id;
};

module.exports = {
  getAllGroups,
  getGroupById,
  createGroup,
  updateGroup,
};
