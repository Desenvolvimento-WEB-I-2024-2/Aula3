$(document).ready(function () {
    // Validação do campo Nome (apenas letras)
    $('#nome').on('input', function () {
        var nomePattern = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
        var nome = $(this).val();
        if (nomePattern.test(nome)) {
            $(this).removeClass('is-invalid');
            $(this).addClass('is-valid');
        } else {
            $(this).removeClass('is-valid');
            $(this).addClass('is-invalid');
        }
    });

    // Validação do campo Email
    $('#email').on('input', function () {
        var emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
        var email = $(this).val();
        if (emailPattern.test(email)) {
            $(this).removeClass('is-invalid');
            $(this).addClass('is-valid');
        } else {
            $(this).removeClass('is-valid');
            $(this).addClass('is-invalid');
        }
    });

    // Validação do campo Senha
    $('#senha').on('input', function () {
        var senhaPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        var senha = $(this).val();
        if (senhaPattern.test(senha)) {
            $(this).removeClass('is-invalid');
            $(this).addClass('is-valid');
            validarConfirmacaoSenha();
        } else {
            $(this).removeClass('is-valid');
            $(this).addClass('is-invalid');
        }
    });

    // Validação da Confirmação de Senha
    $('#confirmarSenha').on('input', function () {
        validarConfirmacaoSenha();
    });

    function validarConfirmacaoSenha() {
        var senha = $('#senha').val();
        var confirmarSenha = $('#confirmarSenha').val();
        if (senha === confirmarSenha && senha !== '') {
            $('#confirmarSenha').removeClass('is-invalid');
            $('#confirmarSenha').addClass('is-valid');
        } else {
            $('#confirmarSenha').removeClass('is-valid');
            $('#confirmarSenha').addClass('is-invalid');
        }
    }

    // Máscara e Validação do campo Telefone
    $('#telefone').on('input', function () {
		var telefonePattern = /^\(\d{2}\) \d{5}-\d{4}$/;
		var telefone = $(this).val();
		
		// Aplicar máscara
		telefone = telefone.replace(/\D/g, '').substring(0, 11);
		telefone = telefone.replace(/^(\d{2})(\d)/g, '($1) $2');
		telefone = telefone.replace(/(\d{5})(\d{4})$/, '$1-$2');
		$(this).val(telefone);
	
		// Validação do formato do telefone
		if (telefonePattern.test(telefone)) {
			$(this).removeClass('is-invalid');
			$(this).addClass('is-valid');
		} else {
			$(this).removeClass('is-valid');
			$(this).addClass('is-invalid');
		}
	});	

   // Validação do campo CPF
	$('#cpf').on('input', function () {
		var cpf = $(this).val();
		
		// Aplicar máscara
		cpf = cpf.replace(/\D/g, '').substring(0, 11);
		cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
		cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
		cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
		$(this).val(cpf);

		// Validação do CPF
		if (validarCPF(cpf)) {
			$(this).removeClass('is-invalid');
			$(this).addClass('is-valid');
		} else {
			$(this).removeClass('is-valid');
			$(this).addClass('is-invalid');
		}
	});

    function validarCPF(cpf) {
        cpf = cpf.replace(/\D/g, '');
        if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
            return false;
        }
        var soma = 0;
        for (var i = 0; i < 9; i++) {
            soma += parseInt(cpf.charAt(i)) * (10 - i);
        }
        var resto = 11 - (soma % 11);
        var digitoVerificador1 = resto === 10 || resto === 11 ? 0 : resto;

        if (digitoVerificador1 !== parseInt(cpf.charAt(9))) {
            return false;
        }

        soma = 0;
        for (i = 0; i < 10; i++) {
            soma += parseInt(cpf.charAt(i)) * (11 - i);
        }
        resto = 11 - (soma % 11);
        var digitoVerificador2 = resto === 10 || resto === 11 ? 0 : resto;

        if (digitoVerificador2 !== parseInt(cpf.charAt(10))) {
            return false;
        }

        return true;
    }

    // Validação do formulário ao submeter
    $('#meuFormulario').on('submit', function (event) {
        event.preventDefault();
        var form = $(this)[0];
        if (form.checkValidity() === false) {
            event.stopPropagation();
            $(form).addClass('was-validated');
        } else {
            // Submeter o formulário ou realizar outra ação
            alert('Formulário válido! Pronto para ser enviado.');
        }
    });
});



// Como era feito "antigamente" (muito usado até hoje - MUITO MESMO)
function validarFormulario() {
    var nome = document.formulario.nome.value;
    var idade = document.formulario.idade.value;
    var email = document.formulario.email.value;

    // Verifica se o nome foi preenchido
    if (nome === "") {
        alert("Por favor, preencha o campo nome.");
        return false;
    }

    // Verifica se a idade é um número
    if (isNaN(idade) || idade === "") {
        alert("Por favor, insira uma idade válida.");
        return false;
    }

    // Verifica se o email contém "@" e "."
    if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
        alert("Por favor, insira um email válido.");
        return false;
    }

    return true; // Tudo certo, envia o formulário
}

// MODEO MAIS MODERNO Arrow Functions, Iteração com forEach, Remoção dos alerts, Array de Objetos para Validações:
document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('meuFormulario');

    formulario.addEventListener('submit', (event) => {
        event.preventDefault();
        let isValid = true;

        // Reseta os estados dos campos
        document.querySelectorAll('.form-control').forEach(campo => {
            campo.classList.remove('is-invalid');
        });

        // Validações
        const campos = [
            { id: 'nome', regex: /^[a-zA-Z\s]+$/, mensagem: 'Nome inválido' },
            { id: 'idade', regex: /^\d+$/, mensagem: 'Idade inválida' },
            { id: 'email', regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, mensagem: 'Email inválido' }
        ];

        campos.forEach(campo => {
            const valor = document.getElementById(campo.id).value.trim();
            if (!campo.regex.test(valor)) {
                document.getElementById(campo.id).classList.add('is-invalid');
                isValid = false;
            }
        });

        // Se tudo estiver válido, envia o formulário
        if (isValid) {
            formulario.submit();
        }
    });
});
