const express = require("express");
const router = express.Router();
const path = require("path");
const db = require("../db");

// Página de notas
router.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../public/pages/notas.html"));
});

// API para listar notas
router.get("/api", (req, res) => {
    db.query("SELECT * FROM notas ORDER BY criado_em DESC", (err, results) => {
        if(err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

// API para adicionar nota
router.post("/api", (req, res) => {
    const { conteudo } = req.body;
    if(!conteudo) return res.status(400).json({ error: "Conteúdo vazio" });

    db.query("INSERT INTO notas (conteudo) VALUES (?)", [conteudo], (err, result) => {
        if(err) return res.status(500).json({ error: err });
        res.json({ id: result.insertId, conteudo });
    });
});

// Limpar todas as notas
router.delete("/api/clear", (req, res) => {
    db.query("DELETE FROM notas", (err, result) => {
        if(err) return res.status(500).json({ error: err });
        res.json({ message: "Todas as notas foram apagadas" });
    });
});


module.exports = router;
