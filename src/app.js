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

app.get('/', (req, res) => {
  res.status(200).send('Curso de Node.js');
})

app.get('/livros', (req, res) => {
  res.status(200).json(livros);
})

app.post('/livros', (req, res) => {
  livros.push(req.body);
  res.status(201).json(req.body).send('Livro adicionado com sucesso!');
})

export default app;