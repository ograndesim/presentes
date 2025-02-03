let selectedItem = "";

// URL do seu script do Google Apps Script (Substitua pela URL correta após implantar)
const scriptUrl = 'https://script.google.com/macros/s/AKfycbw_M-Hd3P_Ikg5hz6U5fO-7LIP-P7xVOO4Jd15s55iC9H4Y-qJ6Uu5k2qU2lS1dJ2gY0w/exec'; // **SUBSTITUA PELA URL DO SEU SCRIPT IMPLANTADO**

// Função para carregar os presentes
async function loadGifts() {
    console.log("Função loadGifts() chamada.");

    try {
        const response = await fetch(scriptUrl);

        console.log("Resposta do servidor (loadGifts):", response);

        const data = await response.json();

        console.log("Dados recebidos (loadGifts):", data);

        if (data && Array.isArray(data)) {
            displayGifts(data);
        } else {
            console.error("Dados não encontrados ou formato inválido.", data);
        }
    } catch (error) {
        console.error("Erro ao carregar os dados da planilha:", error);
    }
}

// Exibir os presentes na página
function displayGifts(gifts) {
    console.log("Função displayGifts() chamada com os dados:", gifts);

    const giftList = document.getElementById("gift-list");
    giftList.innerHTML = ""; // Limpa a lista

    if (gifts.length === 0) {
        console.warn("Nenhum presente encontrado para exibir.");
        giftList.innerHTML = "<p>Nenhum presente encontrado.</p>"; // Mensagem para lista vazia
        return;
    }

    gifts.forEach(gift => {
        console.log("Processando presente:", gift);

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

// Enviar o presente
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

    console.log("Dados a serem enviados:", { name: selectedItem, nome: name, email: email });

    try {
        // Envia o presente para o Google Apps Script
        const response = await fetch(scriptUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: selectedItem, nome: name, email: email }),
        });

        console.log("Resposta completa do servidor:", response);

        const result = await response.json();

        console.log("Resultado da requisição:", result);

        if (result.status === 'success') {
            successMessage.textContent = "Presente confirmado! Obrigado.";
            successMessage.style.display = "block";

            loadGifts();

            setTimeout(() => {
                closeModal();
            }, 2000);
        } else {
            console.error("Erro ao confirmar o presente:", result.message);
            errorMessage.textContent = `Erro ao confirmar o presente: ${result.message}`;
            errorMessage.style.display = "block";
        }
    } catch (error) {
        console.error("Erro ao enviar o presente:", error);
        errorMessage.textContent = "Erro ao confirmar o presente. Verifique o console para mais detalhes.";
        errorMessage.style.display = "block";
    }
}

// Carregar os presentes ao iniciar
loadGifts();
