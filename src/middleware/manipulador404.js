import Erro404 from "../erros/Erro404.js";

function manipulador404(req, res, next) {
  next(new Erro404().enviarResposta(res));
}

export default manipulador404;