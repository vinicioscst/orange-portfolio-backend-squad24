const bcrypt = require("bcrypt");
const { pool } = require("../lib/postgres");

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
    console.log(error.message)
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
   
  }
};

module.exports = {
  createUser,
};
