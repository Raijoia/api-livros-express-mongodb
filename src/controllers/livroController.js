import { autor } from "../models/Autor.js";
import livro from "../models/Livro.js";

class LivroController {
  static async getAll(req, res, next) {
    try {
      const listaLivros = await livro.find({});
      res.status(200).json(listaLivros);
    } catch (error) {
      next(error);
    }
  }

  static async getId(req, res, next) {
    try {
      const id = req.params.id;
      const livroId = await livro.findById(id);
      res.status(200).json(livroId);
    } catch (error) {
      next(error);
    }
  }

  static async cadastrarLivro(req, res, next) {
    const novoLivro = req.body;

    try {
      const autorEncontrado = await autor.findById(novoLivro.autor);
      const livroCompleto = { ...novoLivro, autor: { ...autorEncontrado._doc } };
      res
        .status(201)
        .json({
          message: "Livro adicionado com sucesso!",
          livro: livroCompleto,
        });
    } catch (error) {
      next(error);
    }
  }

  static async atualizarLivro(req, res, next) {
    try {
      const id = req.params.id;
      await livro.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: `Livro do id ${id} atualizado` });
    } catch (error) {
      next(error);
    }
  }

  static async deleterId(req, res, next) {
    try {
      const id = req.params.id;
      await livro.findByIdAndDelete(id);
      res.status(200).json({ message: `Livro do id ${id} deletado` });
    } catch (error) {
      next(error);
    }
  }

  static async getByEditora(req, res, next) {
    try {
      const editora = req.query.editora;
      const livroEditora = await livro.find({ editora: editora });
      res.status(200).json(livroEditora);
    } catch (error) {
      next(error);
    }
  }
}

export default LivroController;