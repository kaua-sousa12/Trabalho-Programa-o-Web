const filtros = {
    modelo: 'Todos',
    preco: 'Todos',
    ordenacao: 'menor'
};

function extrairPreco(texto) {
    return parseFloat(
        texto.replace('R$', '').trim().replace(/\./g, '').replace(',', '.')
    );
}

function aplicarFiltros() {
    const grid = document.querySelector('.product-grid');
    const cards = [...grid.querySelectorAll('.product-card')];

    cards.forEach(card => {
        const marca = card.dataset.marca;
        const preco = extrairPreco(card.querySelector('.price').textContent);

        const passaModelo = filtros.modelo === 'Todos' || marca === filtros.modelo;

        let passaPreco;
        if (filtros.preco === 'Todos') {
            passaPreco = true;
        } else if (filtros.preco === 'maior500') {
            passaPreco = preco >= 500;
        } else if (filtros.preco === 'menor500') {
            passaPreco = preco < 500;
        }

        card.style.display = (passaModelo && passaPreco) ? '' : 'none';
    });

    cards.sort((a, b) => {
        const precoA = extrairPreco(a.querySelector('.price').textContent);
        const precoB = extrairPreco(b.querySelector('.price').textContent);
        return filtros.ordenacao === 'menor' ? precoA - precoB : precoB - precoA;
    });

    cards.forEach(card => grid.appendChild(card));

    quantidadeTenis();
}

function ordenarPorModelo(opcao = 'Todos') {
    filtros.modelo = opcao;
    aplicarFiltros();
}

function filtrarPorPreco(opcao = 'Todos') {
    filtros.preco = opcao;
    aplicarFiltros();
}

function ordenarPorPreco(opcao = 'menor') {
    filtros.ordenacao = opcao;
    aplicarFiltros();
}

function quantidadeTenis() {
    const cards = [...document.querySelectorAll('.product-card')];
    const visiveis = cards.filter(card => card.style.display != 'none');
    document.getElementById('qtdElementos').textContent = `${visiveis.length} resultados`;
}