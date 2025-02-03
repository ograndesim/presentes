document.addEventListener('DOMContentLoaded', function() {
  loadGifts();
});

function loadGifts() {
  google.script.run
    .withSuccessHandler(displayGifts)
    .withFailureHandler(displayError)
    .getGifts();
}

function displayGifts(gifts) {
  const giftList = document.getElementById('gift-list');
  giftList.innerHTML = ''; // Limpa a lista antes de adicionar novos itens

  gifts.forEach(gift => {
    const giftDiv = document.createElement('div');
    giftDiv.className = 'gift-item';
    giftDiv.innerHTML = `
      <h3>${gift.name}</h3>
      <button ${gift.bought ? 'disabled' : ''} onclick="openModal('${gift.name}')">${gift.bought ? 'Presenteado' : 'Presentear'}</button>
    `;
    giftList.appendChild(giftDiv);
  });
}

function displayError(error) {
  alert('Erro ao carregar a lista de presentes: ' + error.message);
}

let selectedGiftName = '';

function openModal(giftName) {
  selectedGiftName = giftName;
  document.getElementById('selected-item').textContent = `Você escolheu: ${giftName}`;
  document.getElementById('modal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('modal').style.display = 'none';
  document.getElementById('name').value = '';
  document.getElementById('email').value = '';
  document.getElementById('email-error').textContent = '';
  document.getElementById('success-message').textContent = '';
  document.getElementById('error-message').textContent = '';
}

function confirmGift() {
  const guestName = document.getElementById('name').value;
  const guestEmail = document.getElementById('email').value;

  // Validação de e-mail simples
  if (!validateEmail(guestEmail)) {
    document.getElementById('email-error').textContent = 'Por favor, insira um e-mail válido.';
    return;
  }

  document.getElementById('success-message').textContent = 'Processando...';
  document.getElementById('error-message').textContent = ''; // Limpa mensagens de erro anteriores

  // Objeto a ser enviado para o Google Apps Script
  const data = {
    name: selectedGiftName,
    nome: guestName,
    email: guestEmail
  };

  google.script.run
    .withSuccessHandler(giftUpdated)
    .withFailureHandler(giftUpdateFailed)
    .updateGiftStatus(data);
}

function giftUpdated(response) {
    document.getElementById('success-message').textContent = 'Presente confirmado com sucesso! Obrigado!';
    document.getElementById('error-message').textContent = ''; // Limpa mensagens de erro
    setTimeout(() => {
        closeModal();
        loadGifts(); // Recarrega a lista de presentes para refletir as mudanças
    }, 2000); // Fecha o modal após 2 segundos
}

function giftUpdateFailed(error) {
    document.getElementById('error-message').textContent = 'Erro ao confirmar o presente. Por favor, tente novamente.';
    document.getElementById('success-message').textContent = ''; // Limpa mensagens de sucesso
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Função para enviar e-mail
function sendEmail(giftName, guestName, guestEmail) {
  const templateParams = {
    gift_name: giftName,
    guest_name: guestName,
    guest_email: guestEmail,
    // Adicione outros parâmetros conforme necessário
  };

  emailjs.send('service_your_service_id', 'template_your_template_id', templateParams) // Substitua pelo ID do seu serviço e template
    .then(function(response) {
      console.log('E-mail enviado com sucesso!', response.status, response.text);
    }, function(error) {
      console.log('Falha ao enviar e-mail.', error);
    });
}
