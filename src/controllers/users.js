const bcrypt = require("bcrypt");
const { pool } = require("../lib/postgres");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  const { fullName, email, password, image, isGoogleAccount } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const checkIfEmailIsUnique = await pool.query(
      `SELECT * FROM USERS WHERE EMAIL = $1`,
      [email]
    );

    if (checkIfEmailIsUnique.rowCount === 1) {
      return res.status(409).json({
        mensagem: "Já existe usuário cadastrado com o e-mail informado.",
      });
    }
    const params = [fullName, email, hashedPassword, image, isGoogleAccount];

    const createdUser = await pool.query(
      `
        INSERT INTO users
        (fullName, email, password, image, isGoogleAccount)
        VALUES
        ($1, $2, $3, $4, $5)
        RETURNING id, fullName, email, image, isGoogleAccount
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
    const emailExists = await pool.query(
      `SELECT * FROM USERS WHERE EMAIL = $1`,
      [email]
    );

    if (emailExists.rowCount < 1) {
      return res.status(404).json({ mensagem: "Conta não encontrada" });
    }

    const checkPass = await bcrypt.compare(
      password,
      emailExists.rows[0].password
    );

    if (!checkPass) {
      return res.status(401).json({ mensagem: "E-mail ou senha incorretos." });
    }

    const token = jwt.sign(
      { id: emailExists.rows[0].id },
      process.env.JWT_PASSWORD,
      {
        expiresIn: "8h",
      }
    );

    const { password: _, ...userConnected } = emailExists.rows[0];

    return res.status(200).json({ usuario: userConnected, token });
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const googleLogin = async (req, res) => {
  const createData = { ...req.body };
  const loginData = { email: req.body.email, password: req.body.password };
  const { email } = req.body;

  try {
    const emailExists = await pool.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );

    if (emailExists.rowCount < 1) {
      req.body = createData;
      await createUser(req, res);
      req.body = loginData;
      const loginUser = await login(req, res);
      return loginUser;
    }

    if (emailExists.rows[0].isgoogleaccount === true) {
      req.body = loginData;
      const loginUser = await login(req, res);
      return loginUser;
    }

    return res
      .status(409)
      .json({ mensagem: "Já existe uma conta cadastrada com esse email" });
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const getUser = async (req, res) => {
  const { id } = req.user;

  try {
    const user = await pool.query(
      `SELECT id, fullName, email, image, isGoogleAccount FROM users WHERE id = $1`,
      [id]
    );

    const projects = await pool.query(
      `SELECT id, title, tags, link, description, image, createddate FROM projects WHERE userid = $1`,
      [id]
    );

    return res.status(200).json({
      user: user.rows[0],
      projects: projects.rows,
    });
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await pool.query(
      "SELECT id, fullName, email, image, isGoogleAccount FROM users"
    );

    return res.status(200).json(users.rows);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};
module.exports = {
  createUser,
  login,
  googleLogin,
  getUser,
  getUsers,
};
