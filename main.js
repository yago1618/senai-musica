import { salvar, buscarTodos, editar, deletar } from "./crud.js";

const musicas = document.getElementById("musicas");
const playlist = document.getElementById("playlist");
const btnAdicionar = document.getElementById("btn-adicionar");

const nomeInput = document.getElementById("nome");
const audioInput = document.getElementById("audio");
const buscaInput = document.getElementById("busca");

const audioPlayer = document.getElementById("audioPlayer");
const play = document.getElementById("play");
const pause = document.getElementById("pause");
const volume = document.getElementById("volume");

let idEditando = null;

// Cadastrar ou atualizar
btnAdicionar.addEventListener("click", async (event) => {

  event.preventDefault();

  const nome = nomeInput.value.trim();
  const audio = audioInput.value.trim();

  if (!nome || !audio) {
    alert("Preencha os campos");
    return;
  }

  try {
    if (idEditando) {
      await editar(idEditando, nome, audio);
    
      idEditando = null;
      btnAdicionar.textContent = "Adicionar";
    } else {
      await salvar(nome,audio);
    }

    nomeInput.value = "";
    audioInput.value = "";

    await atualizarLista(
      buscaInput.value.toLowerCase()
    );

  } catch (err) {

    console.error(
      "Erro ao salvar/editar:",
      err
    );

    alert(
      "Ocorreu um erro ao salvar."
    );

  }

});

buscaInput.addEventListener("input", () =>
  atualizarLista(buscaInput.value.toLowerCase())
);

// Função para renderizar um único item
function renderItem(id, p, filtro) {
  if (!p.nome.toLowerCase().includes(filtro)) return;

  const li = document.createElement("li");
  li.innerHTML = `
    <span><strong>${p.nome}</strong></span>
    <div>
      <button class="btn-tocar">&#x25BA;</button>
      <button class="btn-editar">Editar</button>
      <button class="btn-excluir">Excluir</button>
    </div>
  `;

  // tocar
  li.querySelector(".btn-tocar").addEventListener("click", () => {
    audioPlayer.src = p.audio;
    audioPlayer.play();
  });
  
  // editar
  li.querySelector(".btn-editar").addEventListener("click", () => {
    idEditando = id;
    nomeInput.value = p.nome;
    audioInput.value = p.audio;
    btnAdicionar.textContent = "Salvar";
  });

  // excluir
  li.querySelector(".btn-excluir").addEventListener("click", async () => {
    if (confirm("Excluir essa música?")) {
      try {
        await deletar(id);
        await atualizarLista(filtro);
      } catch (err) {
        console.error("Erro ao excluir:", err);
        alert("Ocorreu um erro ao excluir a música.");
      }
    }
  });
  musicas.appendChild(li);
}

// Função para listar dados no DOM, com filtro simples
async function atualizarLista(filtro = "") {
  try {
    const dados = await buscarTodos();
    musicas.innerHTML = "";

    // Itera sobre os dados e aplica o filtro no nome
    for (let id in dados) {
      const item = dados[id];

      // Filtro de mensagem
      if (item.nome.toLowerCase().includes(filtro.toLowerCase())) {
        renderItem(id, item, filtro);
      }
    }
  } catch (err) {
    console.error("Erro ao buscar dados:", err);
    alert("Não foi possível carregar a lista.");
  }
}

play.addEventListener("click", () => audioPlayer.play());
pause.addEventListener("click", () => audioPlayer.pause());

volume.addEventListener("input", () => {
      audioPlayer.volume = Number(volume.value);
});

// Carregar lista ao abrir a página
window.addEventListener("load", () => atualizarLista());