const { pool } = require("../lib/postgres");

const createProject = async (req, res) => {
  const { title, tags, link, description, date, image } = req.body;
  const userId = req.user.id;

  try {
    const params = [title, tags, link, description, userId, date, image];

    const createdProject = await pool.query(
      `
              INSERT INTO projects
              (title, tags, link, description, userId, createdDate, image)
              VALUES
              ($1, $2, $3, $4, $5, $6, $7)
              RETURNING *
            `,
      params
    );

    return res.status(201).json(createdProject.rows[0]);
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

module.exports = {
  createProject,
};
