// Função para cadastro de usuário
document.getElementById('cadastroForm')?.addEventListener('submit', function(e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const senha = document.getElementById('senha').value;

    if (!nome || !senha) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Verificar se o nome já está em uso
    const nomeExistente = usuarios.find(usuario => usuario.nome === nome);
    if (nomeExistente) {
        alert('Nome de usuário já existe. Escolha outro.');
        return;
    }

    // Adicionar novo usuário
    usuarios.push({ nome, senha });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    alert('Cadastro realizado com sucesso!');
    window.location.href = 'login.html';
});

// Função para login de usuário
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const senha = document.getElementById('senha').value;

    if (!nome || !senha) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Verificar se o nome e senha estão corretos
    const usuario = usuarios.find(usuario => usuario.nome === nome && usuario.senha === senha);
    if (usuario) {
        localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
        alert('Login bem-sucedido!');
        window.location.href = 'contribuicoes.html';
    } else {
        alert('Nome de usuário ou senha incorretos.');
    }
});

// Função para verificar se o usuário está logado
function verificarLogin() {
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    if (!usuarioLogado) {
        window.location.href = 'login.html';
    }
}

// Função para exibir contribuições
function exibirContribuicoes() {
    const contribuicoes = JSON.parse(localStorage.getItem('contribuicoes')) || [];
    const listaContribuicoes = document.getElementById('listaContribuicoes');
    listaContribuicoes.innerHTML = '';

    contribuicoes.forEach((contribuicao, index) => {
        const item = document.createElement('div');
        item.className = 'contribuicao-item';

        let conteudoHTML = '';

        switch (contribuicao.tipo) {
            case 'youtube':
                conteudoHTML = `<a href="${contribuicao.conteudo}" target="_blank">Link do YouTube: ${contribuicao.conteudo}</a>`;
                break;
            case 'texto':
                conteudoHTML = `<p>Texto: ${contribuicao.conteudo}</p>`;
                break;
            case 'foto':
                conteudoHTML = `<img src="${contribuicao.conteudo}" alt="Foto compartilhada" style="max-width: 100%;">`;
                break;
            case 'livro':
                conteudoHTML = `<p>Livro: ${contribuicao.conteudo}</p>`;
                break;
        }

        item.innerHTML = `<h3>${contribuicao.tipo.charAt(0).toUpperCase() + contribuicao.tipo.slice(1)}</h3>${conteudoHTML}`;

        // Exibir comentários
        const comentariosSection = document.createElement('div');
        comentariosSection.className = 'comentarios';
        comentariosSection.innerHTML = `<h4>Comentários:</h4>`;

        contribuicao.comentarios.forEach(comentario => {
            const comentarioItem = document.createElement('p');
            comentarioItem.textContent = comentario;
            comentariosSection.appendChild(comentarioItem);
        });

        // Formulário para adicionar novos comentários
        const comentarioForm = document.createElement('form');
        comentarioForm.className = 'comentarios-form';
        comentarioForm.innerHTML = `
            <textarea placeholder="Adicione um comentário"></textarea>
            <button type="button">Comentar</button>
        `;

        comentarioForm.querySelector('button').addEventListener('click', function() {
            const comentarioTexto = comentarioForm.querySelector('textarea').value;
            if (comentarioTexto) {
                const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
                if (!usuarioLogado) {
                    alert('Você precisa estar logado para comentar.');
                    return;
                }
                contribuicoes[index].comentarios.push(comentarioTexto);
                localStorage.setItem('contribuicoes', JSON.stringify(contribuicoes));
                exibirContribuicoes();
            }
        });

        comentariosSection.appendChild(comentarioForm);
        item.appendChild(comentariosSection);

        listaContribuicoes.appendChild(item);
    });
}

// Chamar a função de verificação no início das páginas onde o login é obrigatório
document.addEventListener('DOMContentLoaded', verificarLogin);

// Chamar a função para exibir as contribuições na página de contribuições
if (document.getElementById('listaContribuicoes')) {
    exibirContribuicoes();
}
