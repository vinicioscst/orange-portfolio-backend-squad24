const bcrypt = require("bcrypt");
const { pool } = require("../lib/postgres");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const checkIfEmailIsUnique = await pool.query(
      `SELECT * FROM USERS WHERE EMAIL = $1`,
      [email]
    );

    if (checkIfEmailIsUnique.rowCount === 1) {
      return res
        .status(409)
        .json({
          mensagem: "Já existe usuário cadastrado com o e-mail informado.",
        });
    }
    const params = [fullName, email, hashedPassword];

    const createdUser = await pool.query(
      `
        INSERT INTO users
        (fullName, email, password)
        VALUES
        ($1, $2, $3)
        RETURNING id, fullName, email
        `,
      params
    );

    return res.status(201).json(createdUser.rows[0]);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userData = await getUserDataByEmail({ email, table: "users" });

    if (!userData) {
      return res.status(401).json({ mensagem: "E-mail ou senha incorretos." });
    }

    const checkPass = await bcrypt.compare(password, userData.password);

    if (!checkPass) {
      return res.status(401).json({ mensagem: "E-mail ou senha incorretos." });
    }

    const token = jwt.sign({ id: userData.id }, process.env.JWT_PASSWORD, {
      expiresIn: "8h",
    });

    const { password: _, ...userConnected } = userData;

    return res.status(200).json({ usuario: userConnected, token });
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};
module.exports = {
  createUser,
  login,
};
