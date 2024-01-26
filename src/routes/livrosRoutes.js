import express from "express";
import LivroController from "../controllers/livroController.js";
import pagination from "../middleware/pagination.js";

const routes = express.Router();

routes.get("/livros", LivroController.getAll, pagination);
routes.get("/livros/busca", LivroController.getByFilter, pagination);
routes.get("/livros/:id", LivroController.getId);
routes.post("/livros", LivroController.cadastrarLivro);
routes.put("/livros/:id", LivroController.atualizarLivro);
routes.delete("/livros/:id", LivroController.deleterId);

export default routes;