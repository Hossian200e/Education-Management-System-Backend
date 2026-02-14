const pool = require("../../config/db");

const syncGroups = async () => {
  await pool.query(`
    INSERT INTO user_groups_role 
      (user_group_id, created_by, created_at, updated_by, updated_at)
    SELECT id, 'system', created_at, 'system', updated_at
    FROM user_groups
    WHERE id NOT IN (
      SELECT user_group_id FROM user_groups_role
    )
  `);
};

const getAllUserGroupsFromRoleTable = async () => {
  await syncGroups();

  const [rows] = await pool.query(`
    SELECT 
      ugr.id,
      ug.name AS user_group,
      ugr.created_by,
      ugr.created_at,
      ugr.updated_by,
      ugr.updated_at
    FROM user_groups_role ugr
    LEFT JOIN user_groups ug 
      ON ugr.user_group_id = ug.id
    ORDER BY ugr.id DESC
  `);

  return rows;
};

module.exports = {
  getAllUserGroupsFromRoleTable,
};
