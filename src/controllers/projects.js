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

const updateProject = async (req, res) => {
  const { id: project_id } = req.params;
  const { title, tags, link, description, createdDate, userId } = req.body;
  const { mimetype, originalname, buffer } = req.file || {
    mimetype: null,
    originalname: null,
    buffer: null,
  };

  try {
    let project = await pool.query("SELECT * FROM projects WHERE id = $1", [
      project_id,
    ]);

    if (project.rowCount === 0) {
      return res
        .status(404)
        .json({ mensagem: "O Projeto informado não foi encontrado" });
    }

    const imageUrl = product.rows[0].image;

    if (imageUrl) {
      const lastSlashIndex = imageUrl.lastIndexOf("/");
      const fileName = imageUrl.substring(lastSlashIndex + 1);

      await deleteImage(`projects/${project_id}/${fileName}`);
    }

    if (originalname) {
      const image = await uploadImage(
        `projects/${project_id}/${originalname}`,
        buffer,
        mimetype
      );

      const projectWithImage = await pool.query(
        "UPDATE projects SET title = $1, tags = $2, link = $3, description = $4, createdDate = $5, userId = $6, image = $7 WHERE id = $8 RETURNING *",
        [
          title,
          tags,
          link,
          description,
          createdDate,
          userId,
          image.url,
          project_id,
        ]
      );

      return res.status(200).json(projectWithImage.rows[0]);
    }
    project = await pool.query(
      "UPDATE projects SET title = $1, tags = $2, link = $3, description = $4, createdDate = $5, userId = $6, image = $7 WHERE id = $8 RETURNING *",
      [title, tags, link, description, createdDate, userId, null, project_id]
    );

    return res.status(200).send(project.rows[0]);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ mensagem: "Erro interno do servidor." });
  }
};

module.exports = {
  createProject,
  getProjects,
  getUserProject,
  updateProject,
};
