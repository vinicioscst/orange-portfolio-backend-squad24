const { pool } = require("../lib/postgres");
const jwt = require("jsonwebtoken");

const isUserAuthenticated = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ mensagem: "Não autorizado." });
  }

  const token = authorization.split(" ")[1];

  try {
    const { id } = jwt.verify(token, process.env.JWT_PASSWORD);

    const user = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);

    if (user.rowCount < 1) {
      return res.status(401).json({ mensagem: "Não autorizado." });
    }

    const { senha, ...loggedUser } = user.rows[0];

    req.user = loggedUser;

    next();
  } catch (error) {
    return res.status(401).json({ mensagem: "Não autorizado" });
  }
};

module.exports = {
  isUserAuthenticated,
};
