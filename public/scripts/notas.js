const btnAdd = document.getElementById("btn-add");
const btnClear = document.getElementById("btn-clear");
const lista = document.getElementById("lista-notas");

// Função para carregar todas as notas
function carregarNotas() {
    fetch("/notas/api")
        .then(res => res.json())
        .then(data => {
            lista.innerHTML = "";
            data.forEach(nota => {
                const li = document.createElement("li");
                li.textContent = nota.conteudo;
                lista.appendChild(li);
            });
        })
        .catch(err => console.error("Erro ao carregar notas:", err));
}

// Adicionar nova nota
btnAdd.addEventListener("click", () => {
    const conteudo = prompt("Digite sua nota:");
    if(conteudo) {
        fetch("/notas/api", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ conteudo })
        })
        .then(res => res.json())
        .then(() => carregarNotas())
        .catch(err => console.error("Erro ao adicionar nota:", err));
    }
});

// Limpar todas as notas
btnClear.addEventListener("click", () => {
    if(confirm("Tem certeza que deseja apagar todas as notas?")) {
        fetch("/notas/api/clear", { method: "DELETE" })
            .then(res => res.json())
            .then(() => carregarNotas())
            .catch(err => console.error("Erro ao limpar notas:", err));
    }
});

carregarNotas();
