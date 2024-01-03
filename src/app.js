import express from 'express';
import conectar from './config/dbConnect.js';
import livro from './models/Livro.js';

const conexao = await conectar();

conexao.on('error', (erro) => {
  console.error(`Erro na conexão com o banco de dados: ${erro}`);
})

conexao.once('open', () => {
  console.log('Conexão com o banco de dados realizada com sucesso!');
})

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('Curso de Node.js');
})

app.get('/livros', async (req, res) => {
  const listaLivros = await livro.find({});
  res.status(200).json(listaLivros);
})

app.get('/livros/:id', (req, res) => {
  const id = req.params.id;

  if (id > livros.length) {
    res.status(400).send('Livro não encontrado');
  }

  const index = buscaLivro(id);
  res.status(200).json(livros[index]);
})

app.post('/livros', (req, res) => {
  livros.push(req.body);
  res.status(201).json(req.body).send('Livro adicionado com sucesso!');
})

app.put('/livros/:id', (req, res) => {
  const id = req.params.id
  const index = buscaLivro(id)

  livros[index].titulo = req.body.titulo;
  res.status(200).json(livros);
})

app.delete('/livros/:id', (req, res) => {
  const id = req.params.id
  const index = buscaLivro(id)

  livros.splice(index, 1);
  res.status(200).send(`Livro do index ${id} removido com sucesso!`);
})

export default app;
