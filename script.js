let selectedItem = "";

// URL do seu script do Google Apps Script (Substitua pela sua URL)
const scriptUrl = 'https://script.google.com/macros/s/AKfycbxs-B1NF6GNuR94VkJvpsjcA3484QzRAWxC6xW89zHsiXbagRyjsICnUn6rkW5tlAcV/exec'; // **Substitua pela sua URL**

// Função para carregar os presentes
async function loadGifts() {
    try {
        const response = await fetch(scriptUrl);
        const data = await response.json();

        if (data && Array.isArray(data)) {
            displayGifts(data);
        } else {
            console.error("Dados não encontrados ou formato inválido.");
        }
    } catch (error) {
        console.error("Erro ao carregar os dados da planilha:", error);
    }
}

// Exibir os presentes na página
function displayGifts(gifts) {
    const giftList = document.getElementById("gift-list");
    giftList.innerHTML = "";

    gifts.forEach(gift => {
        const giftItem = document.createElement("div");
        giftItem.classList.add("gift-item");
        giftItem.innerHTML = `
            <p>${gift.name}</p>
            <button ${gift.bought ? "disabled" : ""} onclick="selectGift('${gift.name}')">
                ${gift.bought ? "Já Adquirido" : "Presentear"}
            </button>
        `;
        giftList.appendChild(giftItem);
    });
}

// Selecionar um presente
function selectGift(item) {
    selectedItem = item;
    document.getElementById("selected-item").innerText = `Você escolheu: ${item}`;
    document.getElementById("modal").style.display = "flex";
}

// Fechar o modal
function closeModal() {
    document.getElementById("modal").style.display = "none";
    // Limpa os campos do modal quando ele é fechado
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("email-error").style.display = "none";
    document.getElementById("success-message").style.display = "none";
    document.getElementById("error-message").style.display = "none";
}

// Validar e-mail (melhorável, mas funcional)
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Enviar o presente (função renomeada para confirmGift)
async function confirmGift() { 
    console.log("Função confirmGift() chamada!");

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const emailError = document.getElementById("email-error");
    const successMessage = document.getElementById("success-message");
    const errorMessage = document.getElementById("error-message");

    // Limpar mensagens anteriores
    emailError.style.display = "none";
    successMessage.style.display = "none";
    errorMessage.style.display = "none";

    // Validação dos Campos
    if (!name || !email) {
        errorMessage.textContent = "Preencha todos os campos!";
        errorMessage.style.display = "block";
        return; 
    }

    if (!validateEmail(email)) {
        emailError.textContent = "Por favor, insira um e-mail válido. Exemplo: usuario@example.com";
        emailError.style.display = "block";
        return;
    }

    try {
        // Envia o presente para o Google Apps Script
        const response = await fetch(scriptUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: selectedItem, nome: name, email: email }),
        });

        console.log("Resposta do servidor:", response);

        const result = await response.json();

        console.log("Resultado:", result);

        if (result.status === 'success') {
            successMessage.textContent = "Presente confirmado! Obrigado.";
            successMessage.style.display = "block";

            loadGifts();

            setTimeout(() => {
                closeModal();
            }, 2000);
        } else {
            throw new Error("Erro ao confirmar o presente.");
        }
    } catch (error) {
        console.error("Erro ao enviar o presente:", error);
        errorMessage.textContent = "Erro ao confirmar o presente. Tente novamente.";
        errorMessage.style.display = "block";
    }
}

// Carregar os presentes ao iniciar
loadGifts();
