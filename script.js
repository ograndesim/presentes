let selectedItem = "";
let gifts = [];

// URL do seu script do Google Apps
const scriptUrl = 'https://script.google.com/macros/s/AKfycbw8nMqJVoED2xB6ES1xujrint_LtnPHna7TLPA-wydF6KjsnPv-Edugy8QAL4vHOJOpDQ/exec'; // Seu código de implantação

// Função para carregar os dados da planilha via Google Apps Script
async function loadGiftsFromSheet() {
    try {
        const response = await fetch(scriptUrl);
        const data = await response.json();

        if (data && data.gifts) {
            gifts = data.gifts;
            loadGifts();
        } else {
            console.error("Dados não encontrados na resposta.");
        }
    } catch (error) {
        console.error("Erro ao carregar os dados da planilha:", error);
    }
}

// Carregar os itens de presente no HTML
function loadGifts() {
    const giftList = document.getElementById("gift-list");
    giftList.innerHTML = "";

    gifts.forEach(gift => {
        const giftItem = document.createElement("div");
        giftItem.classList.add("gift-item");
        giftItem.innerHTML = `
            <p>${gift.nome_do_presente}</p> <button ${gift.bought ? "disabled" : ""} onclick="selectGift('${gift.nome_do_presente}')">
                ${gift.bought ? "Já Adquirido" : "Presentear"}
            </button>
        `;
        giftList.appendChild(giftItem);
    });
}

function selectGift(item) {
    selectedItem = item;
    document.getElementById("selected-item").innerText = `Você escolheu: ${item}`;
    document.getElementById("modal").style.display = "flex";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

async function sendGift() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const emailError = document.getElementById("email-error");

    if (!name || !email) {
        alert("Preencha todos os campos!");
        return;
    }

    if (!validateEmail(email)) {
        emailError.textContent = "Por favor, insira um e-mail válido. Exemplo: usuario@example.com";
        emailError.style.display = "block";
        return;
    } else {
        emailError.style.display = "none";
    }

    try {
        await emailjs.send('service_0m6kpou', 'template_kup4ovf', { // Substitua pelos seus IDs do EmailJS
            name: name,
            email: email,
            item: selectedItem
        });

        alert("Presente confirmado! Obrigado.");
        closeModal();

        const gift = gifts.find(g => g.nome_do_presente === selectedItem); // Ajustado para usar o nome do presente
        if (gift) gift.bought = true;

        // Não precisa salvar no localStorage, pois os dados estão na planilha
        loadGiftsFromSheet(); // Recarrega os presentes da planilha para atualizar a tela
    } catch (error) {
        console.error("Erro ao enviar o e-mail:", error);
        alert("Erro ao confirmar o presente. Tente novamente.");
    }
}

// Chama a função para carregar os presentes ao iniciar
loadGiftsFromSheet();
