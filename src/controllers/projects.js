const { pool } = require("../lib/postgres");
const { format } = require("date-fns")

const createProject = async (req, res) => {
  const { title, tags, link, description } = req.body;
  const userId = req.user.id;

  try {
    const date = new Date()
    const formatDate = format(date, "MM/yy")
    
    const params = [title, tags, link, description, userId, formatDate ];

    const createdProject = await pool.query(
      `
              INSERT INTO projects
              (title, tags, link, description, user_id, date)
              VALUES
              ($1, $2, $3, $4, $5, $6)
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
