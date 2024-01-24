import mongoose from "mongoose";
import ErroBase from "../erros/ErroBase.js";
import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";
import ErroValidacao from "../erros/ErroValidacao.js";
import Erro404 from "../erros/Erro404.js";

// eslint-disable-next-line no-unused-vars
function tratamentoErros(error, req, res, next) {
  if (error instanceof mongoose.Error.CastError) {
    new RequisicaoIncorreta().enviarResposta(res);
  } else if (error instanceof mongoose.Error.ValidationError) {
    new ErroValidacao(error).enviarResposta(res);
  } else if (error instanceof Erro404) {
    error.enviarResposta(res);
  } else{
    new ErroBase().enviarResposta(res);
  }
  
}

export default tratamentoErros;
