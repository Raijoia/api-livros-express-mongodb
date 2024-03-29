import Erro404 from "../erros/Erro404.js";
import { autor } from "../models/index.js";
import { livro } from "../models/index.js";

class LivroController {
  static async getAll(req, res, next) {
    try {
      const buscaLivros = livro.find();

      req.resultado = buscaLivros;

      next();
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

  static async getByFilter(req, res, next) {
    try {
      const busca = await processaBusca(req.query);

      if(busca !== null) {
        const livroResultado = livro.find(busca).populate("autor");

        req.resultado = livroResultado;

        next();
      } else {
        res.status(200).send([]);
      }
    } catch (error) {
      next(error);
    }
  }
}

async function processaBusca(req) {
  const { editora, titulo, minPagina, maxPagina, nomeAutor } = req;

  let busca = {};

  if (editora) busca.editora = editora;
  if (titulo) busca.titulo = { $regex: titulo, $options: "i" };

  if (minPagina || maxPagina) busca.numeroPaginas = {};

  if (minPagina) busca.numeroPaginas.$gte = minPagina;
  if (maxPagina) busca.numeroPaginas.$lte = maxPagina;

  if (nomeAutor) {
    const autorEncontrado = await autor.findOne({ nome: nomeAutor });

    if (autorEncontrado !== null) {
      busca.autor = autorEncontrado?._id;
    } else {
      busca = null;
    }

  }

  return busca;
}

export default LivroController;