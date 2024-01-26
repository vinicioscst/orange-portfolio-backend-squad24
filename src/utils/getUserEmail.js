const { pool } = require("../lib/postgres");

const getUserDataByEmail = async ({ email, table }) => {
  try {
    const userData = await pool.query(
      `SELECT * FROM ${table} WHERE email ILIKE $1`,
      [email]
    );

    if (userData.rowCount > 0) {
      return userData.rows[0];
    }

    return null;
  } catch (error) {
    throw new Error("Erro interno do servidor.");
  }
};

module.exports = {
  getUserDataByEmail,
};
