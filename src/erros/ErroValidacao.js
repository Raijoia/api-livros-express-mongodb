import RequisicaoIncorreta from "./RequisicaoIncorreta.js";

class ErroValidacao extends RequisicaoIncorreta {
  constructor(error) {
    const mensagensErros = Object.values(error.errors)
      .map((erro) => erro.message)
      .join("; ");
    super(`Houve um erro de validação de dados: ${mensagensErros}`);
  }
}

export default ErroValidacao;