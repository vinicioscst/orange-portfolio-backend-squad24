const bcrypt = require("bcrypt");
const { pool } = require("../lib/postgres");
const { getUserDataByEmail } = require("../utils/getUserEmail");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  const { nome, sobrenome, email, senha } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(senha, 10);

    const params = [nome, sobrenome, email, hashedPassword];

    const createdUser = await pool.query(
      `
        INSERT INTO usuarios
        (nome, sobrenome, email, senha)
        VALUES
        ($1, $2, $3, $4)
        RETURNING id, nome, sobrenome, email
        `,
      params
    );

    return res.status(201).json(createdUser.rows[0]);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const userData = await getUserDataByEmail({ email, table: "usuarios" });

    if (!userData) {
      return res.status(401).json({ mensagem: "E-mail ou senha incorretos." });
    }

    const checkPass = await bcrypt.compare(senha, userData.senha);

    if (!checkPass) {
      return res.status(401).json({ mensagem: "E-mail ou senha incorretos." });
    }

    const token = jwt.sign({ id: userData.id }, process.env.JWT_PASSWORD, {
      expiresIn: "8h",
    });

    const { senha: _, ...userConnected } = userData;
    return res.status(200).json({ usuario: userConnected, token });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};
module.exports = {
  createUser,
  login
};
