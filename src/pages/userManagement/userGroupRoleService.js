const db = require("../../config/db");

// Get all user groups with their roles (LEFT JOIN)
const getAllUserGroupsWithRoles = async () => {
  const [rows] = await db.query(`
    SELECT 
        ug.id AS group_id,
        ug.name AS user_group,
        ug.createdBy AS created_by,
        ug.createdAt AS created_time,
        ug.updatedBy AS updated_by,
        ug.updatedAt AS updated_time,
        ugr.role_name AS role
    FROM user_groups ug
    LEFT JOIN user_groups_role ugr ON ugr.user_group_id = ug.id
    ORDER BY ug.id ASC
  `);
  return rows;
};

// Get roles for a specific group
const getRolesByGroupId = async (groupId) => {
  const [rows] = await db.query(`
    SELECT * FROM user_groups_role WHERE user_group_id = ?
  `, [groupId]);
  return rows;
};

// Add role to group
const createRole = async (data) => {
  const { user_group_id, role_name, notes, created_by } = data;
  const [result] = await db.query(`
    INSERT INTO user_groups_role (user_group_id, role_name, notes, created_by)
    VALUES (?, ?, ?, ?)
  `, [user_group_id, role_name, notes || null, created_by || null]);
  return result.insertId;
};

// Update role
const updateRole = async (id, data) => {
  const { role_name, notes, updated_by } = data;
  await db.query(`
    UPDATE user_groups_role
    SET role_name = ?, notes = ?, updated_by = ?
    WHERE id = ?
  `, [role_name, notes || null, updated_by || null, id]);
  return id;
};

module.exports = {
  getAllUserGroupsWithRoles,
  getRolesByGroupId,
  createRole,
  updateRole,
};
