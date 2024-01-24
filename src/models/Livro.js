import mongoose from "mongoose";
import { autorSchema } from "./Autor.js";

const livroSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    titulo: { type: String, required: [true, "O titulo do livro é obrigatorio"] },
    editora: { type: String, required: [true, "A editora do livro é obrigatorio"] },
    preco: { type: Number, required: [true, "O preço do livro é obrigatorio"] },
    paginas: { type: Number, required: [true, "A quantidade de paginas do livro é orbigatorio"] },
    autor: autorSchema,
  },
  { versionKey: false }
);

const livro = mongoose.model("livros", livroSchema);

export default livro;