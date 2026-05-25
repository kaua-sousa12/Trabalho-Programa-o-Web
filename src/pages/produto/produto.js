const produto = JSON.parse(sessionStorage.getItem("produtoAtual"));
 
if (!produto) {
    window.location.href = "../landing-page/index.html";
}
 
document.getElementById("produto-img").src = produto.imagem;
document.getElementById("produto-img").alt = produto.nome;
document.getElementById("produto-nome").textContent = produto.nome;
document.getElementById("produto-preco").textContent = produto.preco;
 
function adicionarProduto() {
    const tamanho = document.getElementById("tamanho").value;
 
    if (!tamanho) {
        alert("Selecione um tamanho!");
        return;
    }
 
    const produtoComTamanho = { ...produto, tamanho };
    adicionarAoCarrinho(produtoComTamanho);
}