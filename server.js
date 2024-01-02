import app from './src/app.js';

const PORT = 8080;

const rotas = {
  '/': "Curso de Node.js",
  '/livros': "Listagem de livros",
  '/autores': "Listagem de autores"
}

app.listen(PORT, () => {
  console.log('Server running at http://localhost:8080/')
})