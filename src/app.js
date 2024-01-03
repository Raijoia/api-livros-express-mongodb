import express from 'express';

const app = express();
app.use(express.json());

const livros = [
  {
    id: 1,
    titulo: "O Senhor dos Anéis",
    autor: "J.R.R. Tolkien"
  },
  {
    id: 2,
    titulo: "Harry Potter e a Pedra Filosofal",
    autor: "J.K. Rowling"
  },
  {
    id: 3,
    titulo: "As Crônicas de Nárnia",
    autor: "C.S. Lewis"
  }
]

function buscaLivro(id) {
  return livros.findIndex(livro => {
    return livro.id == Number(id);
  })
}

app.get('/', (req, res) => {
  res.status(200).send('Curso de Node.js');
})

app.get('/livros', (req, res) => {
  res.status(200).json(livros);
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
