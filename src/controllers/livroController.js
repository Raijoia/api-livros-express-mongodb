import livro from "../models/Livro.js";

class LivroController {
  static async getAll(req, res) {
    try {
      const listaLivros = await livro.find({});
      res.status(200).json(listaLivros);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async cadastrarLivro(req, res) {
    try {
      const novoLivro = await livro.create(req.body);
      res.status(201).json({ message: "Livro adicionado com sucesso!", livro: novoLivro });
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
};

export default LivroController;