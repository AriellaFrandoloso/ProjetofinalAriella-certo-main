/* =====================================================
   JAVASCRIPT DO SITE DE MITOLOGIA GREGA
   - Limita a idade a números inteiros entre 4 e 110.
   - Confere se o nome tem pelo menos duas palavras.
   - Valida e-mail, origem do acesso e dúvida.
   - Abre o modal do Bootstrap quando tudo está correto.
   ===================================================== */
document.addEventListener('DOMContentLoaded', function () {
  const formulario = document.getElementById('formDuvidas');

  // O formulário existe somente na página questionario.html.
  if (!formulario) return;

  const campoNome = document.getElementById('nome');
  const campoIdade = document.getElementById('idade');
  const campoDuvida = document.getElementById('duvida');

  // Permite digitar somente números no campo idade.
  campoIdade.addEventListener('input', function () {
    this.value = this.value.replace(/[^0-9]/g, '').slice(0, 3);
    this.setCustomValidity('');
  });

  // A validação acontece ao enviar o formulário.
  formulario.addEventListener('submit', function (evento) {
    evento.preventDefault(); // impede o envio para outra página
    evento.stopPropagation();

    // Nome precisa ter pelo menos duas palavras.
    const nomeValido = campoNome.value.trim().split(/\s+/).filter(Boolean).length >= 2;
    campoNome.setCustomValidity(nomeValido ? '' : 'Informe nome e sobrenome.');

    // Idade deve ser um número inteiro de 4 a 110.
    const idade = Number(campoIdade.value);
    const idadeValida = /^\d+$/.test(campoIdade.value) && idade >= 4 && idade <= 110;
    campoIdade.setCustomValidity(idadeValida ? '' : 'Informe uma idade entre 4 e 110 anos.');

    // A dúvida precisa ter pelo menos 10 caracteres.
    campoDuvida.setCustomValidity(campoDuvida.value.trim().length >= 10 ? '' : 'Escreva uma dúvida com pelo menos 10 caracteres.');

    formulario.classList.add('was-validated');

    // checkValidity também verifica o formato do e-mail e a opção selecionada.
    if (formulario.checkValidity()) {
      const elementoModal = document.getElementById('modalSucesso');
      const modalSucesso = bootstrap.Modal.getOrCreateInstance(elementoModal);
      modalSucesso.show();
      formulario.reset();
      formulario.classList.remove('was-validated');
    }
  });

  // Ao limpar, remove as mensagens de erro personalizadas.
  formulario.addEventListener('reset', function () {
    campoNome.setCustomValidity('');
    campoIdade.setCustomValidity('');
    campoDuvida.setCustomValidity('');
    formulario.classList.remove('was-validated');
  });
});
