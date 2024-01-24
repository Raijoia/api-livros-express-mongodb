import Erro404 from "../erros/Erro404.js";
import { autor } from "../models/index.js";
import { livro } from "../models/index.js";

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
      if( livroId !== null) {
        res.status(200).json(livroId);
      } else {
        next(new Erro404(`Livro com id:${id} não encontrado`));
      }
    } catch (error) {
      next(error);
    }
  }

  static async cadastrarLivro(req, res, next) {
    const novoLivro = req.body;

    try {
      const autorEncontrado = await autor.findById(novoLivro.autor);
      if (autorEncontrado === null) {
        next(new Erro404(`Autor com id:${novoLivro.autor} não encontrado`));
      } else {
        const livroCompleto = { ...novoLivro, autor: { ...autorEncontrado?._doc } };
        res
          .status(201)
          .json({
            message: "Livro adicionado com sucesso!",
            livro: livroCompleto,
          });
      }
    } catch (error) {
      next(error);
    }
  }

  static async atualizarLivro(req, res, next) {
    try {
      const id = req.params.id;
      const livroEncontrado = await livro.findByIdAndUpdate(id, req.body);
      if (livroEncontrado === null) {
        next(new Erro404(`Livro com id:${id} não encontrado`));
      } else {
        res.status(200).json({ message: `Livro do id ${id} atualizado` });
      }
    } catch (error) {
      next(error);
    }
  }

  static async deleterId(req, res, next) {
    try {
      const id = req.params.id;
      const livroEncontrado = await livro.findByIdAndDelete(id);
      if (livroEncontrado === null) {
        next(new Erro404(`Livro com id:${id} não encontrado`));
      } else {
        res.status(200).json({ message: `Livro do id ${id} deletado` });
      }
    } catch (error) {
      next(error);
    }
  }

  static async getByEditora(req, res, next) {
    try {
      const editora = req.query.editora;
      const livroEditora = await livro.find({ editora: editora });
      if (livroEditora === null) {
        next(new Erro404(`Livro com editora:${editora} não encontrado`));
      } else {
        res.status(200).json(livroEditora);
      }
    } catch (error) {
      next(error);
    }
  }
}

export default LivroController;