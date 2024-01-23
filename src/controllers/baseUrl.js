const baseUrl = (req, res) => {
  res.status(200).send({ mensagem: "O servidor está online." });
};

module.exports = {
  baseUrl,
};
