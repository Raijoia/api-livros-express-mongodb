import express from "express";
import AutorController from "../controllers/autorController.js";

const routes = express.Router();

routes.get("/autores", AutorController.getAll);
routes.get("/autores/:id", AutorController.getId);
routes.post("/autores", AutorController.cadastrarAutor);
routes.put("/autores/:id", AutorController.atualizarAutor);
routes.delete("/autores/:id", AutorController.deleterId);

export default routes;