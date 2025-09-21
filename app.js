// 1. Importa o express (framework para criar servidor web)
const express = require("express");

// 2. Cria a aplicação
const app = express();

// 3. Define a porta onde o servidor vai rodar
const PORT = 3000;

// 4. Permite que o servidor leia dados no formato JSON (quando enviar/receber do front)
app.use(express.json());

// 5. Permite servir arquivos estáticos da pasta "public" (HTML, CSS, imagens, etc)
app.use(express.static("public"));

// 6. Rota inicial (quando abrir http://localhost:3000/)
app.get("/", (req, res) => {
  res.send("Bem-vindo ao app de Notas!");
});

// 7. Exemplo de rota para criar uma nota (POST /notas)
app.post("/notas", (req, res) => {
  const { titulo, conteudo } = req.body;
  res.json({ mensagem: "Nota criada com sucesso!", titulo, conteudo });
});

// 8. Inicia o servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
