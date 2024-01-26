import Erro404 from "../erros/Erro404.js";
import { autor } from "../models/index.js";

class AutorController {
  static async getAll(req, res, next) {
    try {
      const buscaAutor = autor.find();

      req.resultado = buscaAutor;

      next();
    } catch (error) {
      next(error);
    }
  }

  static async getId(req, res, next) {
    try {
      const id = req.params.id;
      const autorId = await autor.findById(id);
      if (autorId !== null) {
        res.status(200).json(autorId);
      } else {
        next(new Erro404(`Autor com id:${id} não encontrado`));
      }
    } catch (error) {
      next(error);
    }
  }

  static async cadastrarAutor(req, res, next) {
    try {
      const novoAutor = await autor.create(req.body);
      res
        .status(201)
        .json({ message: "Autor adicionado com sucesso!", autor: novoAutor });
    } catch (error) {
      next(error);
    }
  }

  static async atualizarAutor(req, res, next) {
    try {
      const id = req.params.id;
      const autorEncontrado = await autor.findByIdAndUpdate(id, req.body);
      if (autorEncontrado === null) {
        next(new Erro404(`Autor com id:${id} não encontrado`));
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
      const autorEncontrado =  await autor.findByIdAndDelete(id);
      if (autorEncontrado === null) {
        next(new Erro404(`Autor com id:${id} não encontrado`));
      } else {
        res.status(200).json({ message: `Autor do id ${id} deletado` });
      }
    } catch (error) {
      next(error);
    }
  }
}

export default AutorController;