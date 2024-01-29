const { pool } = require("../lib/postgres");

const createProject = async (req, res) => {
  const { title, tags, link, description } = req.body;
  const userId = req.user.id;

  try {
    const params = [title, tags, link, description, userId ];

    const createdProject = await pool.query(
      `
              INSERT INTO projects
              (title, tags, link, description, user_id)
              VALUES
              ($1, $2, $3, $4, $5)
              RETURNING *
            `,
      params
    );

    return res.status(201).json(createdProject.rows[0]);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

module.exports = {
  createProject,
};
