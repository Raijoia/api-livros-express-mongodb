import express from "express";
import AutorController from "../controllers/autorController.js";
import pagination from "../middleware/pagination.js";

const routes = express.Router();

routes.get("/autores", AutorController.getAll, pagination);
routes.get("/autores/:id", AutorController.getId);
routes.post("/autores", AutorController.cadastrarAutor);
routes.put("/autores/:id", AutorController.atualizarAutor);
routes.delete("/autores/:id", AutorController.deleterId);

export default routes;