const { pool } = require("../lib/postgres");

const createProject = async (req, res) => {
  const { title, tags, link, description, createddate, image } = req.body;
  const userId = req.user.id;

  try {
    const params = [title, tags, link, description, userId, createddate, image];

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
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const getProjects = async (req, res) => {
  try {
    const projects = await pool.query("SELECT * FROM  projects");
    return res.status(200).json(projects.rows);
  } catch (error) {
    return res.status(500).json({
      mensagem: "Erro interno do servidor",
    });
  }
};

const getUserProject = async (req, res) => {
  const id = req.user.id;

  try {
    const getProjects = await pool.query(
      "SELECT * FROM projects WHERE userId = $1",
      [id]
    );
    return res.status(201).json(getProjects.rows);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const deleteProject = async (req, res) => {
  const { id: project_id } = req.params;
  try {
    const project = await pool.query("SELECT * FROM  projects WHERE id = $1", [
      project_id,
    ]);

    if (project.rowCount === 0) {
      return res
        .status(404)
        .json({ mensagem: "O projeto  informado não foi encontrado." });
    }

    await pool.query("DELETE FROM  projects WHERE id = $1", [project_id]);

    return res.status(204).send();
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};

module.exports = {
  createProject,
  getProjects,
  getUserProject,
  deleteProject,
};
