const db = require("../../config/db");

// Automatically sync user_groups into user_groups_role if missing
const getAllUserGroupsWithRoles = async () => {
  await db.query(`
    INSERT INTO user_groups_role (user_group_id, notes, created_by, createdAt, updated_by, updatedAt)
    SELECT id, notes, 'system', createdAt, 'system', updatedAt
    FROM user_groups
    WHERE id NOT IN (SELECT user_group_id FROM user_groups_role)
  `);

  const [rows] = await db.query(`
    SELECT 
        ug.id AS group_id,
        ug.name AS user_group,
        ugr.created_by,
        ugr.createdAt,
        ugr.updated_by,
        ugr.updatedAt,
        ugr.role_name AS role
    FROM user_groups_role ugr
    JOIN user_groups ug ON ugr.user_group_id = ug.id
    ORDER BY ug.id
  `);

  return rows;
};

const getRolesByGroupId = async (groupId) => {
  const [rows] = await db.query(
    `SELECT * FROM user_groups_role WHERE user_group_id = ?`,
    [groupId]
  );
  return rows;
};

const createRole = async (data) => {
  const { user_group_id, role_name, notes, created_by } = data;
  const [result] = await db.query(
    `INSERT INTO user_groups_role 
      (user_group_id, role_name, notes, created_by, createdAt, updated_by, updatedAt)
     VALUES (?, ?, ?, ?, NOW(), ?, NOW())`,
    [user_group_id, role_name, notes || null, created_by || 'system', created_by || 'system']
  );
  return result.insertId;
};

const updateRole = async (id, data) => {
  const { role_name, notes, updated_by } = data;
  await db.query(
    `UPDATE user_groups_role
     SET role_name = ?, notes = ?, updated_by = ?, updatedAt = NOW()
     WHERE id = ?`,
    [role_name, notes || null, updated_by || 'system', id]
  );
  return id;
};

module.exports = {
  getAllUserGroupsWithRoles,
  getRolesByGroupId,
  createRole,
  updateRole,
};
