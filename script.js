const scriptUrl = "https://script.googleusercontent.com/macros/echo?user_content_key=jIdznm2XqCSw23gF7-Nv1NedGlolMA0Pc7nKWvsHN-7Zp4ESSp1zUyylvvQqYZWQYjF8aSmWFw0kI2x0mmO9U0fWdS8yLsyxm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnGH5j2Z3VrH0WyWJ5YT0_PXoCYa7A8K1XpsLGUgp9cmAdnkYakw0z1SBU9sMJ3oc1I1x0HeU5209yKyYW7jLS76pBOME7-uH0w&lib=MR85yW7MotaXkM2qQW6I_2FUoDjZ3aXxZ"; // Substitua pelo URL do seu script
let gifts = [];
let selectedItem = "";

async function loadGiftsFromSheet() {
  try {
    const response = await fetch(scriptUrl + "?action=getGiftList");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`); // Melhor tratamento de erros
    }
    const data = await response.json();

    if (data && Array.isArray(data)) {
      gifts = data;
      loadGifts();
    } else {
      console.error("Dados não encontrados ou formato inválido:", data); // Mensagem de erro mais informativa
    }
  } catch (error) {
    console.error("Erro ao carregar os dados da planilha:", error);
  }
}

function loadGifts() {
  const giftList = document.getElementById("gift-list");
  giftList.innerHTML = "";

  gifts.forEach(gift => {
    const giftItem = document.createElement("div");
    giftItem.classList.add("gift-item");
    giftItem.innerHTML = `
      <p>${gift.name}</p>
      <button ${gift.bought ? "disabled" : ""} onclick="openModal('${gift.name}')">
        ${gift.bought ? "Já Adquirido" : "Presentear"}
      </button>
    `;
    giftList.appendChild(giftItem);
  });
}

function openModal(giftName) {
  selectedItem = giftName;
  document.getElementById("selected-item").textContent = `Deseja presentear ${giftName}?`;
  document.getElementById("modal").style.display = "block";
  // Limpa mensagens de sucesso/erro ao abrir o modal
  document.getElementById("success-message").textContent = "";
  document.getElementById("error-message").textContent = "";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

async function sendGift() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const emailError = document.getElementById("email-error");
  const successMessage = document.getElementById("success-message");
  const errorMessage = document.getElementById("error-message");

  // Validação de email (exemplo básico)
  if (!isValidEmail(email)) {
    emailError.textContent = "Email inválido.";
    return;
  }
  emailError.textContent = ""; // Limpa mensagem de erro

  try {
    const response = await fetch(scriptUrl + "?action=markAsBought&name=" + selectedItem + "&nameUser=" + name + "&emailUser=" + email);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`); // Melhor tratamento de erros
    }

    const data = await response.json(); // Espera a resposta do servidor (se houver)

    if (data && data.success) { // Verifica se a resposta indica sucesso
      successMessage.textContent = "Obrigado por presentear! Seu nome e email foram registrados.";
      errorMessage.textContent = "";
      loadGiftsFromSheet(); // Atualiza a lista
      closeModal();
    } else {
      errorMessage.textContent = data && data.message ? data.message : "Ocorreu um erro ao registrar o presente."; // Mensagem de erro do servidor
      successMessage.textContent = "";
    }
  } catch (error) {
    console.error("Erro ao enviar presente:", error);
    errorMessage.textContent = "Ocorreu um erro ao enviar o presente.";
    successMessage.textContent = "";
  }
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

loadGiftsFromSheet();
