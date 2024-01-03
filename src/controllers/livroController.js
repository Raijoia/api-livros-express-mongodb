import { autor } from "../models/Autor.js";
import livro from "../models/Livro.js";

class LivroController {
  static async getAll(req, res) {
    try {
      const listaLivros = await livro.find({})
      res.status(200).json(listaLivros)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  static async getId(req, res) {
    try {
      const id = req.params.id
      const livroId = await livro.findById(id)
      res.status(200).json(livroId)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  static async cadastrarLivro(req, res) {
    const novoLivro = req.body

    try {
      const autorEncontrado = await autor.findById(novoLivro.autor)
      const livroCompleto = { ...novoLivro, autor: { ...autorEncontrado._doc } }
      res
        .status(201)
        .json({
          message: "Livro adicionado com sucesso!",
          livro: livroCompleto,
        })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  static async atualizarLivro(req, res) {
    try {
      const id = req.params.id
      await livro.findByIdAndUpdate(id, req.body)
      res.status(200).json({ message: `Livro do id ${id} atualizado` })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  static async deleterId(req, res) {
    try {
      const id = req.params.id
      await livro.findByIdAndDelete(id)
      res.status(200).json({ message: `Livro do id ${id} deletado` })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  static async getByEditora(req, res) {
    try {
      const editora = req.query.editora
      const livroEditora = await livro.find({ editora: editora })
      res.status(200).json(livroEditora)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
};

export default LivroController;