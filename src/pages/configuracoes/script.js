function inicializarPagina() {
    carregarDados();
    carregarEndereco();
    carregarPerfil();
    carregarPedidos();
}

// Carregar o perfil do usuario
function carregarPerfil() {

    const usuarioSalvo = JSON.parse(localStorage.getItem('usuarios'));
    const usuario = usuarioSalvo[0];

    const nomeUsuario = document.getElementById('nomeUsuario');
    const emailUsuario = document.getElementById('emailUsuario');

    nomeUsuario.textContent = usuario.nome;
    emailUsuario.textContent = usuario.email;
}

// carregar os dados do usuario
function carregarDados() {
    const genero = document.querySelectorAll('input[name="gender"]');
    const usuarioSalvo = JSON.parse(localStorage.getItem('usuarios'));
    const usuario = usuarioSalvo[0];

    const data = document.getElementById('dataNascimento');
    const telefone = document.getElementById('telefone');

    data.value = usuario.dataNascimento || '';
    telefone.value = usuario.telefone || '';

    genero.forEach(radio => {
        if (radio.value === usuario.genero) {
            radio.checked = true;
        }
    });
}

// Salvar os dados Pessoais dos usuarios.
function salvarDados() {

    const genero = document.querySelectorAll('input[name="gender"]');

    const usuarios = JSON.parse(localStorage.getItem('usuarios'));

    const usuario = usuarios[0];

    const telefone = document.getElementById('telefone').value;

    const dataNascimento = document.getElementById('dataNascimento').value;

    let generoSelecionado = '';

    genero.forEach(radio => {
        if (radio.checked) {
            generoSelecionado = radio.value;
        }
    });
    usuario.telefone = telefone;
    usuario.dataNascimento = dataNascimento;
    usuario.genero = generoSelecionado;


    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    Swal.fire({
        icon: 'success',
        title: 'Salvo!',
        text: 'Dados atualizados',
        confirmButtonText: 'OK'
    });
}

// abrir e fechar o modal de cadastrar endereços.
function abrirModal() {
    const modal = document.getElementById('modalEndereco');
    modal.style.display = 'flex';
}
function fecharModal() {
    const modal = document.getElementById('modalEndereco');
    modal.style.display = 'none';
}



// Carregar o endereço se já cadastradado

function carregarEndereco() {

    const usuarios = JSON.parse(localStorage.getItem('usuarios'));

    const usuario = usuarios[0];

    if (!usuario.endereco) return;

    mostrarEndereco(usuario.endereco);

}

function salvarEndereco() {
    const cep = document.getElementById('cep');
    const rua = document.getElementById('rua');
    const numero = document.getElementById('numeroCasa');
    if (
        cep.value === '' ||
        rua.value === '' ||
        numero.value === ''
    ) {
        Swal.fire({
            icon: 'warning',
            title: 'Campos obrigatórios',
            text: 'Preencha o CEP, a rua e o número da casa.'
        });
        return;
    }
    const usuarioSalvo = JSON.parse(localStorage.getItem('usuarios'));

    const usuario = usuarioSalvo[0];

    const endereco = {
        cep: cep.value,
        rua: rua.value,
        numero: numero.value
    };
    // Salva o endereço no localStorage do usuario
    usuario.endereco = endereco;

    //Atualiza o localStorage
    localStorage.setItem('usuarios', JSON.stringify(usuarioSalvo)
    );
    mostrarEndereco(endereco);
    limparInputsEndereco();
    fecharModal();
    Swal.fire({
        icon: 'success',
        title: 'Endereço salvo!',
        text: 'Seu endereço foi cadastrado com sucesso.',
        timer: 2000,
        showConfirmButton: false
    });
}
function mostrarEndereco(endereco) {
    const caixaEndereco = document.getElementById('caixaEndereco');
    caixaEndereco.innerHTML = `
        <strong>CEP:</strong> ${endereco.cep}<br>
        <strong>Rua:</strong> ${endereco.rua}<br>
        <strong>Número:</strong> ${endereco.numero}
    `;
}

function limparInputsEndereco() {
    document.getElementById('cep').value = '';
    document.getElementById('rua').value = '';
    document.getElementById('numeroCasa').value = '';
}


function carregarPedidos() {
    const usuarios = JSON.parse(localStorage.getItem('usuarios'));
    const usuarioLogadoObj = JSON.parse(localStorage.getItem('usuarioLogado'));

    const usuario = usuarios.find(u => u.email === usuarioLogadoObj.email);

    const listaPedidos = document.getElementById('listaPedidos');

    if (!usuario.ultimosPedidos || usuario.ultimosPedidos.length === 0) {
        listaPedidos.innerHTML = '<p>Nenhum pedido realizado ainda.</p>';
        return;
    }

    listaPedidos.innerHTML = '';

    usuario.ultimosPedidos.forEach(pedido => {
        const produto = pedido.produtos[0];

        listaPedidos.innerHTML += `
        <div class="pedido-item">
            <div class="pedido-header">
                <div class="icon-bg">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="1" y="3" width="15" height="13"></rect>
                        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                        <circle cx="5.5" cy="18.5" r="2.5"></circle>
                        <circle cx="18.5" cy="18.5" r="2.5"></circle>
                    </svg>
                </div>
                <span class="status-tag processando">
                    Pedido #${pedido.id} (${pedido.status})
                </span>
            </div>
            <div class="pedido-produto">
                <img src="${produto.imagem}" alt="${produto.nome}" class="product-thumb">
                <div class="product-info">
                    <strong>R$ ${pedido.total.toFixed(2)}</strong>
                    <span>${produto.nome}</span>
                    <small>${pedido.data}</small>
                </div>
            </div>
        </div>
        `;
    });
}

function sair() {
    localStorage.removeItem('usuarioLogado');

    window.location.href = '../login/index.html';
}

inicializarPagina();