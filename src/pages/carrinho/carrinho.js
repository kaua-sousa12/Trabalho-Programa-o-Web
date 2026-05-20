const CHAVE_CARRINHO = "carrinho";

let freteAtual = 0;

// PEGAR CARRINHO
function buscarCarrinho() {
  return JSON.parse(localStorage.getItem(CHAVE_CARRINHO)) || [];
}

// SALVAR CARRINHO
function salvarCarrinho(carrinho) {
  localStorage.setItem(
    CHAVE_CARRINHO,
    JSON.stringify(carrinho)
  );
}

// ADICIONAR PRODUTO
function adicionarAoCarrinho(produto) {

  const carrinho = buscarCarrinho();

  const produtoExistente = carrinho.find(item => item.nome === produto.nome);

  if (produtoExistente) {
    produtoExistente.quantidade += 1;
  }
  else {
    produto.quantidade = 1;
    carrinho.push(produto);
  }

  salvarCarrinho(carrinho);
  atualizarContadorCarrinho();

  alert("Produto adicionado ao carrinho!!");
}

// PEGAR PRODUTOS DA PÁGINA
function configurarProdutos() {
  const cards = document.querySelectorAll(".product-card");

  cards.forEach(card => {
    const botao = card.querySelector(".btn-cart");

    if (!botao) return;

    botao.addEventListener("click", () => {
      const nome = card.querySelector(".name").textContent;
      const preco = card.querySelector(".price").textContent;
      const imagem = card.querySelector(".product-image img").getAttribute("src");

      const produto = {
        nome: nome,
        preco: preco,
        imagem: imagem
      };

      adicionarAoCarrinho(produto);

    });
  });
}


// MOSTRAR CARRINHO
function renderizarCarrinho() {

  const lista =
    document.querySelector(".items-list");

  if (!lista) return;

  const carrinho = buscarCarrinho();

  lista.innerHTML = "";

  carrinho.forEach((produto, index) => {

    lista.innerHTML += `
       <div class="cart-item">

        <div class="item-image">
          <img src="${produto.imagem}">
        </div>

        <div class="item-info">

          <p class="item-name">
            ${produto.nome}
          </p>

          <p class="item-price">
            ${produto.preco}
          </p>
          
          <div class="controleDeQuantidade">
          <button onclick="diminuirQuantidade(${index})">
          -
          </button>

          <span>
          ${produto.quantidade}
          </span>
          
          <button onclick="aumentarQuantidade(${index})">
          +
          </button>
          </div>

        </div>
        <button class="btn-delete" onclick="removerDoCarrinho(${index})">
          <img src="https://cdn-icons-png.flaticon.com/512/54/54324.png" width="18" height="18">
        </button>

      </div>

    `;
  });


  const total = carrinho.reduce((acc, produto) => {
    const valor = parseFloat(produto.preco.replace('R$', '').replace(',', '.').trim());
    return acc + (valor * produto.quantidade);
  }, 0);

  const valorTotal = document.getElementById('total-price');
  valorTotal.textContent = `R$ ${(total + freteAtual).toFixed(2)}`;


}
// QUANDO A PÁGINA CARREGAR
document.addEventListener("DOMContentLoaded", () => {
  configurarProdutos();
  renderizarCarrinho();
  atualizarContadorCarrinho();
});

// REMOVER PRODUTO
function removerDoCarrinho(index) {
  const carrinho = buscarCarrinho();
  carrinho.splice(index, 1);
  salvarCarrinho(carrinho);
  renderizarCarrinho();
  atualizarContadorCarrinho();
}
function atualizarContadorCarrinho() {
  const carrinho = buscarCarrinho();
  const contador = document.querySelector(".main-menu a[href*='carrinho']");
  if (!contador) return;
  contador.textContent = `Carrinho(${carrinho.length})`;
}

// Aumentar Quantidade do produto no carrinho
function aumentarQuantidade(index) {
  const carrinho = buscarCarrinho();
  carrinho[index].quantidade += 1;
  salvarCarrinho(carrinho);
  renderizarCarrinho();
  atualizarContadorCarrinho();
}

// Diminuir a quantidade do carrinho
function diminuirQuantidade(index) {
  const carrinho = buscarCarrinho();
  carrinho[index].quantidade -= 1;
  if (carrinho[index].quantidade <= 0) {
    removerDoCarrinho(index);
    return;
  }
  salvarCarrinho(carrinho);
  renderizarCarrinho();
  atualizarContadorCarrinho();
}

function calcularCep() {
  const cep = document.querySelector('.freight-input').value.replace('-', '');
  let frete = 0;

  if (cep.startsWith("0" || "1")) {
    frete = 20;
  } else if (cep.startsWith("2" || "8")) {
    frete = 30;
  } else if (cep.startsWith("3" || "7")) {
    frete = 50;
  } else if (cep.startsWith("4")) {
    frete = 70;
  } else if (cep.startsWith("5")) {
    frete = 80;
  } else if (cep.startsWith("6")) {
    frete = 90;
  } else {
    frete = 100;
  }

  const valorFrete = document.querySelector(".freight-price");
  if (valorFrete) {
    valorFrete.textContent = `R$ ${frete},00 (PAC)`;

    freteAtual = frete;

    renderizarCarrinho();
  }
}

function finalizarCompra() {

  const usuarioLogado = localStorage.getItem("usuarioLogado");

  if (!usuarioLogado) {
    alert("Você precisa estar logado para finalizar a compra!");

    window.location.href = "../login/index.html";
    return;
  }
  const carrinho = buscarCarrinho();

  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }

  if(freteAtual === 0){
    alert("Calcule o frete antes de finalizar a compra!");
    return;
  }

  alert("Compra realizada com sucesso!!");
  localStorage.removeItem(CHAVE_CARRINHO);
  renderizarCarrinho();
  atualizarContadorCarrinho();
}