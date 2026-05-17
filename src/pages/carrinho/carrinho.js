const CHAVE_CARRINHO = "carrinho";

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

  carrinho.push(produto);

  salvarCarrinho(carrinho);

  alert("Produto adicionado ao carrinho!");
}

// PEGAR PRODUTOS DA PÁGINA
function configurarProdutos() {

  const cards =
    document.querySelectorAll(".product-card");

  cards.forEach(card => {

    const botao =
      card.querySelector(".btn-cart");

    if (!botao) return;

    botao.addEventListener("click", () => {

      const nome =
        card.querySelector(".name").textContent;

      const preco =
        card.querySelector(".price").textContent;

      const imagem =
        card
          .querySelector(".product-image img")
          .getAttribute("src");

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

  carrinho.forEach(produto => {

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

        </div>

      </div>

    `;
  });
}

// QUANDO A PÁGINA CARREGAR
document.addEventListener("DOMContentLoaded", () => {

  configurarProdutos();

  renderizarCarrinho();

});