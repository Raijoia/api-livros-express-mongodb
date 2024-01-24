import mongoose from "mongoose";
import { autorSchema } from "./Autor.js";

const livroSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    titulo: {
      type: String,
      required: [true, "O titulo do livro é obrigatorio"],
    },
    editora: {
      type: String,
      required: [true, "A editora do livro é obrigatorio"],
      enum: {
        values:["Casa do Código", "Alura"],
        message: "Editora inválida"
      },
    },
    preco: { type: Number, required: [true, "O preço do livro é obrigatorio"] },
    paginas: {
      type: Number,
      min: [10, "O Numero de páginas deve estar entre 10 e 5000"],
      max: [5000, "O Numero de páginas deve estar entre 10 e 5000"],
      required: [true, "A quantidade de paginas do livro é orbigatorio"],
    },
    autor: autorSchema,
  },
  { versionKey: false }
);

const livro = mongoose.model("livros", livroSchema);

export default livro;