import mongoose from "mongoose";

// eslint-disable-next-line no-unused-vars
function tratamentoErros(error, req, res, next) {
  if (error instanceof mongoose.Error.CastError) {
    res
      .status(400)
      .send({ message: "Um ou mais dados fornecidos estão incorretos" });
  } else if (error instanceof mongoose.Error.ValidationError) {
    const mensagensErros = Object.values(error.errors)
      .map((erro) => erro.message)
      .join("; ");

    res.status(400).send({
      message: `Houve um erro de validação de dados: ${mensagensErros}`,
    });
  } else {
    res
      .status(500)
      .send({ message: `Erro interno do servidor, ${error.message}` });
  }
}

export default tratamentoErros;
