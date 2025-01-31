let selectedItem = "";

let gifts = [
    { "name": "Forno Elétrico", "bought": false },
    { "name": "Televisão", "bought": false },
    { "name": "Aspirador de Pó", "bought": false },
    { "name": "Panela de Pressão Elétrica", "bought": false },
    { "name": "Batedeira Planetária", "bought": false },
    { "name": "Batedeira", "bought": false },
    { "name": "Cafeteira Elétrica", "bought": false },
    { "name": "Chaleira Elétrica", "bought": false },
    { "name": "Espremedor de Frutas", "bought": false },
    { "name": "Liquidificador", "bought": false },
    { "name": "Purificador de Água", "bought": false },
    { "name": "Sanduicheira", "bought": false },
    { "name": "Armário de Cozinha", "bought": false },
    { "name": "Sofá (marrom ou cinza)", "bought": false },
    { "name": "Mesa de Jantar", "bought": false },
    { "name": "Rack ou Painel para TV", "bought": false },
    { "name": "Aparelho de Jantar", "bought": false },
    { "name": "Bule para Café", "bought": false },
    { "name": "Conjunto de Frigideiras", "bought": false },
    { "name": "Conjunto de Potes", "bought": false },
    { "name": "Conjunto de Talheres (Inox)", "bought": false },
    { "name": "Conjunto de Tigelas", "bought": false },
    { "name": "Conjunto de Travessas", "bought": false },
    { "name": "Conjunto de Xícaras", "bought": false },
    { "name": "Faqueiro", "bought": false },
    { "name": "Formas de Bolo", "bought": false },
    { "name": "Fruteira", "bought": false },
    { "name": "Galheteiro", "bought": false },
    { "name": "Jogo de Facas", "bought": false },
    { "name": "Jogo de Panelas", "bought": false },
    { "name": "Kit para Churrasco", "bought": false },
    { "name": "Manteigueira", "bought": false },
    { "name": "Petisqueira", "bought": false },
    { "name": "Saladeira", "bought": false }
];

function saveGifts() {
    localStorage.setItem('gifts', JSON.stringify(gifts));
}

function loadGifts() {
    const savedGifts = localStorage.getItem('gifts');
    if (savedGifts) {
        gifts = JSON.parse(savedGifts);
    }

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
        emailError.style.display = "block"; // Mostra a mensagem de erro
        return;
    } else {
        emailError.style.display = "none"; // Oculta a mensagem de erro se o e-mail for válido
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