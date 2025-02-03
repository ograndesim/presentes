let selectedItem = "";
let gifts = [];

// URL do seu script do Google Apps Script
const scriptUrl = 'https://script.google.com/macros/s/AKfycbw8nMqJVoED2xB6ES1xujrint_LtnPHna7TLPA-wydF6KjsnPv-Edugy8QAL4vHOJOpDQ/exec'; // Substitua pelo seu URL

// Função para carregar os dados da planilha via Google Apps Script
async function loadGiftsFromSheet() {
    try {
        const response = await fetch(scriptUrl);
        const data = await response.json();

        if (data && Array.isArray(data)) {
            gifts = data;
            loadGifts();
        } else {
            console.error("Dados não encontrados ou formato inválido.");
        }
    } catch (error) {
        console.error("Erro ao carregar os dados da planilha:", error);
    }
}
try {
        await emailjs.send('service_0m6kpou', 'template_kup4ovf', {
            name: name,
            email: email,
            item: selectedItem
        });

        alert("Presente confirmado! Obrigado.");
        closeModal();

        const gift = gifts.find(g => g.name === selectedItem);
        if (gift) gift.bought = true;

        saveGifts(); // Salva o estado atualizado no localStorage
        loadGifts(); // Recarrega a lista de presentes
    } catch (error) {
        console.error("Erro ao enviar o e-mail:", error);
        alert("Erro ao confirmar o presente. Tente novamente.");
    }
}

loadGifts();

// Carregar os itens de presente no HTML
function loadGifts() {
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
}

// Validar e-mail
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Enviar o presente
async function sendGift() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const emailError = document.getElementById("email-error");
    const successMessage = document.getElementById("success-message");
    const errorMessage = document.getElementById("error-message");

    // Limpar mensagens anteriores
    emailError.style.display = "none";
    successMessage.style.display = "none";
    errorMessage.style.display = "none";

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
            body: JSON.stringify({ name: selectedItem }),
        });

        const result = await response.json();

        if (result.status === 'success') {
            successMessage.textContent = "Presente confirmado! Obrigado.";
            successMessage.style.display = "block";
            setTimeout(() => {
                closeModal();
                loadGiftsFromSheet(); // Recarrega os presentes da planilha
            }, 2000); // Fecha o modal após 2 segundos
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

