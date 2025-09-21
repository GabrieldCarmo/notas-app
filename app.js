const express = require("express");
const path = require("path");
const app = express();
const notasRoutes = require("./routes/notas");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.use("/notas", notasRoutes);

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "public/index.html"));
});

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});
