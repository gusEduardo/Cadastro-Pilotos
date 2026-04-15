const form = document.getElementById('pilotoForm');
const cepInput = document.getElementById('cep');
const cepStatus = document.getElementById('cep-status');
const ruaInput = document.getElementById('rua');
const numeroInput = document.getElementById('numero');
const ufInput = document.getElementById('uf');
const cidadeInput = document.getElementById('cidade');
const modal = document.getElementById('sucessoModal');
const closeModalBtn = document.getElementById('sucessoFechar');
const successMessage = document.getElementById('sucessoMensagem');

cepInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');

    value = value.substring(0, 8);

    if (value.length > 5) {
        value = value.replace(/(\d{5})(\d)/, '$1-$2');
    }

    e.target.value = value;

    cepStatus.textContent = '';

    if (value.replace('-', '').length === 8) {
        buscarCEP(value);
    }
});

ufInput.addEventListener('input', (e) => {
    e.target.value = e.target.value.toUpperCase();
});

numeroInput.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, '');
});


// Busca de CEP via API ViaCEP

async function buscarCEP(cep) {
    const cepLimpo = cep.replace('-', '');

    cepStatus.textContent = '⏳';

    try {
        const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
        const data = await response.json();

        if (data.erro) {
            cepStatus.textContent = '❌';
            mostrarErro('cep', 'CEP não encontrado');
            limparCamposEndereco();
            return
        }

        cepStatus.textContent = '✅';
        limparErro('cep');

        ruaInput.value = data.logradouro || '';
        cidadeInput.value = data.localidade || '';
        ufInput.value = data.uf || '';

        numeroInput.focus();
    } catch (error) {
        cepStatus.textContent = '❌';
        mostrarErro('cep', 'Erro ao buscar CEP');
        console.error('Erro ao buscar CEP:', error);
    }
}

function limparCamposEndereco() {
    ruaInput.value = '';
    cidadeInput.value = '';
    ufInput.value = '';
}



// Validação de Formulário


function mostrarErro(campo, mensagem) {
    const errorElement = document.getElementById(`erro-${campo}`);
    const inputElement = document.getElementById(campo);

    if (errorElement) {
        errorElement.textContent = mensagem;
    }
    if (inputElement) {
        inputElement.classList.add('error');
        inputElement.classList.remove('valid');
    }
}

function limparErro(campo) {
    const errorElement = document.getElementById(`erro-${campo}`);
    const inputElement = document.getElementById(campo);

    if (errorElement) {
        errorElement.textContent = '';
    }
    if (inputElement) {
        inputElement.classList.remove('error');
    }
};

function marcarValido(campo) {
    const inputElement = document.getElementById(campo);
    if (inputElement) {
        inputElement.classList.remove('error');
        inputElement.classList.add('valid');
    }
};

function validarFormulario() {
    let valido = true;

    const nome = document.getElementById('nome').value.trim();
    if (nome === '') {
        mostrarErro('nome', 'Nome é obrigatório');
        valido = false;
    } else {
        limparErro('nome');
        marcarValido('nome');
    }

    const equipe = document.getElementById('equipe').value;
    if (equipe === '') {
        mostrarErro('equipe', 'Selecione uma equipe');
        valido = false;
    } else {
        limparErro('equipe');
        marcarValido('equipe');
    }

    const cep = cepInput.value;
    const cepRegex = /^\d{5}-\d{3}$/;
    if (!cepRegex.test(cep)) {
        mostrarErro('cep', 'CEP inválido. Use o formato 00000-000');
        valido = false;
    } else {
        limparErro('cep');
        marcarValido('cep');
    }

    const rua = ruaInput.value.trim();
    if (rua.length < 5) {
        mostrarErro('rua', 'Logradouro deve ter no mínimo 5 caracteres');
        valido = false;
    } else {
        limparErro('rua');
        marcarValido('rua');
    }

    const numero = numeroInput.value.trim();
    const numeroRegex = /^\d+$/;
    if (!numeroRegex.test(numero)) {
        mostrarErro('numero', 'Número deve conter apenas dígitos');
        valido = false;
    } else {
        limparErro('numero');
        marcarValido('numero');
    }

    const uf = ufInput.value.trim();
    const ufRegex = /^[A-Z]{2}$/;
    if (!ufRegex.test(uf)) {
        mostrarErro('uf', 'UF deve ter 2 letras (ex: SP)');
        valido = false;
    } else {
        limparErro('uf');
        marcarValido('uf');
    }

    return valido;
};

form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (validarFormulario()) {
        const dados = {
            nome: document.getElementById('nome').value.trim(),
            equipe: document.getElementById('equipe').value,
            equipeNome: document.getElementById('equipe').options[document.getElementById('equipe').selectedIndex].text,
            cep: cepInput.value,
            logradouro: ruaInput.value,
            numero: numeroInput.value,
            uf: ufInput.value,
            complemento: document.getElementById('complemento').value,
            cidade: cidadeInput.value
        }

        successMessage.innerHTML = `
            <strong>${dados.nome}</strong> foi cadastrado na equipe 
            <strong>${dados.equipeNome}</strong>!<br><br>
            <small>Endereço: ${dados.logradouro}, ${dados.numero} - ${dados.cidade}/${dados.uf}</small>
        `;
        modal.classList.remove('hidden');
    }
})

closeModalBtn.addEventListener('click', function () {
    modal.classList.add('hidden');
    // Limpa o formulário após fechar
    form.reset();
    // Remove classes de validação
    document.querySelectorAll('.valid, .error').forEach(el => {
        el.classList.remove('valid', 'error');
    });
    cepStatus.textContent = '';
});

modal.addEventListener('click', function (e) {
    if (e.target === modal) {
        closeModalBtn.click();
    }
});