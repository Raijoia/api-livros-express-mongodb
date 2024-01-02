import http from 'http';

const PORT = 8080;

const rotas = {
  '/': "Curso de Node.js",
  '/livros': "Listagem de livros",
  '/autores': "Listagem de autores"
}

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(rotas[req.url] || "Rota não encontrada: " + req.url);
})

server.listen(PORT, () => {
  console.log('Server running at http://localhost:8080/')
})