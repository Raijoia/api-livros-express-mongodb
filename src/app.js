import express from 'express';

const app = express();

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

export default app;