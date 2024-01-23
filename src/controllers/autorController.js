import { autor } from "../models/Autor.js";

class AutorController {
  static async getAll(req, res) {
    try {
      const listaAutores = await autor.find({});
      res.status(200).json(listaAutores);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getId(req, res, next) {
    try {
      const id = req.params.id;
      const autorId = await autor.findById(id);
      if (autorId !== null) {
        res.status(200).json(autorId);
      } else {
        res.status(404).json({ message: `Autor com id:${id} não encontrado` });
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
      await autor.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: `Livro do id ${id} atualizado` });
    } catch (error) {
      next(error);
    }
  }

  static async deleterId(req, res, next) {
    try {
      const id = req.params.id;
      await autor.findByIdAndDelete(id);
      res.status(200).json({ message: `Autor do id ${id} deletado` });
    } catch (error) {
      next(error);
    }
  }
}

export default AutorController;