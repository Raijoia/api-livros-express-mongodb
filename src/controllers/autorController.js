import { autor } from "../models/Autor.js";

class AutorController {
  static async getAll(req, res) {
    try {
      const listaAutores = await autor.find({})
      res.status(200).json(listaAutores)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  static async getId(req, res) {
    try {
      const id = req.params.id
      const autorId = await autor.findById(id)
      res.status(200).json(autorId)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  static async cadastrarAutor(req, res) {
    try {
      const novoAutor = await autor.create(req.body)
      res
        .status(201)
        .json({ message: "Autor adicionado com sucesso!", autor: novoAutor })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  static async atualizarAutor(req, res) {
    try {
      const id = req.params.id
      await autor.findByIdAndUpdate(id, req.body)
      res.status(200).json({ message: `Livro do id ${id} atualizado` })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  static async deleterId(req, res) {
    try {
      const id = req.params.id
      await autor.findByIdAndDelete(id)
      res.status(200).json({ message: `Autor do id ${id} deletado` })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
};

export default AutorController