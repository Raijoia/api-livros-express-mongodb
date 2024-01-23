import mongoose from "mongoose";

// eslint-disable-next-line no-unused-vars
function tratamentoErros(error, req, res, next) {
  if (error instanceof mongoose.Error.CastError) {
    res
      .status(400)
      .json({ message: "Um ou mais dados fornecidos estão incorretos" });
  } else {
    res
      .status(500)
      .json({ message: `Erro interno do servidor, ${error.message}` });
  }
}

export default tratamentoErros;