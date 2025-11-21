const searchInput = document.getElementById("search");
const courseList = document.getElementById("course-list");
const modal = document.getElementById("modal");
const closeBtn = document.getElementById("closeBtn");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");

async function carregarCursos() {
    const resposta = await fetch("data.json");
    const cursos = await resposta.json();

    exibirCursos(cursos);

    searchInput.addEventListener("input", () => {
        const texto = searchInput.value.toLowerCase();
        const filtrados = cursos.filter(c => 
            c.nome.toLowerCase().includes(texto)
        );
        exibirCursos(filtrados);
    });
}

function exibirCursos(lista){
    courseList.innerHTML = "";

    lista.forEach(curso => {
        const div = document.createElement("div");
        div.className = "card";

        div.innerHTML = `
            <h2>${curso.nome}</h2>
            <p>${curso.descricao}</p>
        `;

        // Clique → mostra modal
        div.addEventListener("click", () => {
            modalTitle.textContent = curso.nome;
            modalDesc.textContent = curso.detalhes;
            modal.classList.remove("hidden");
        });

        courseList.appendChild(div);
    });
}

// Fechar modal
closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
});

carregarCursos();