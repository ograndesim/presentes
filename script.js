let selectedItem = "";

let gifts = [
    { "name": "Forno elétrico", "bought": false },
    { "name": "Coifa", "bought": false },
    { "name": "Liquidificador", "bought": false },
    { "name": "Batedeira", "bought": false },
    { "name": "Cafeteira", "bought": false },
    { "name": "Espremedor de frutas", "bought": false },
    { "name": "Mixer", "bought": false },
    { "name": "Sanduicheira", "bought": false },
    { "name": "Torradeira", "bought": false },
    { "name": "Processador de alimentos", "bought": false },
    { "name": "Air fryer", "bought": false },
    { "name": "Máquina de lavar louça", "bought": false },
    { "name": "Bebedouro/Purificador de água", "bought": false },
    { "name": "Ferro de passar", "bought": false },
    { "name": "Aspirador de pó", "bought": false },
    { "name": "Máquina de lavar roupa", "bought": false },
    { "name": "Máquina de secar roupa", "bought": false },
    { "name": "Climatizador/Ventilador", "bought": false },
    { "name": "Colchão", "bought": false },
    { "name": "Mesa De Cabeceira", "bought": false },
    { "name": "Cômoda", "bought": false },
    { "name": "Mesa de jantar", "bought": false },
    { "name": "Cadeiras", "bought": false },
    { "name": "Sofá", "bought": false },
    { "name": "Rack/Estante para TV", "bought": false },
    { "name": "Mesa de centro", "bought": false },
    { "name": "Poltronas/Puffs", "bought": false },
    { "name": "Aparador", "bought": false },
    { "name": "Escrivaninha", "bought": false },
    { "name": "Mesa/bancada para cozinha", "bought": false },
    { "name": "Banquetas", "bought": false },
    { "name": "Jogos de lençol", "bought": false },
    { "name": "Travesseiros", "bought": false },
    { "name": "Fronhas", "bought": false },
    { "name": "Edredom", "bought": false },
    { "name": "Cobertor/Manta", "bought": false },
    { "name": "Protetor de colchão", "bought": false },
    { "name": "Toalhas de banho", "bought": false },
    { "name": "Toalhas de rosto", "bought": false },
    { "name": "Tapete para banheiro", "bought": false },
    { "name": "Toalhas de mesa", "bought": false },
    { "name": "Jogos americanos", "bought": false },
    { "name": "Guardanapos de pano", "bought": false },
    { "name": "Jogo de panelas", "bought": false },
    { "name": "Panela de pressão", "bought": false },
    { "name": "Frigideira", "bought": false },
    { "name": "Assadeiras", "bought": false },
    { "name": "Jogo de facas", "bought": false },
    { "name": "Tábuas de corte", "bought": false },
    { "name": "Utensílios diversos (colheres, espátulas, conchas)", "bought": false },
    { "name": "Escorredor de louça", "bought": false },
    { "name": "Jogo de pratos", "bought": false },
    { "name": "Copos e taças", "bought": false },
    { "name": "Xícaras e pires", "bought": false },
    { "name": "Jarra para suco/água", "bought": false },
    { "name": "Saleiro/Pimenteiro", "bought": false },
    { "name": "Potes para mantimentos", "bought": false },
    { "name": "Forminhas de gelo", "bought": false },
    { "name": "Quadros decorativos", "bought": false },
    { "name": "Espelhos", "bought": false },
    { "name": "Vasos de plantas/flores", "bought": false },
    { "name": "Cortinas/Persianas", "bought": false },
    { "name": "Luminárias", "bought": false },
    { "name": "Churrasqueira elétrica ou a carvão", "bought": false },
    { "name": "Itens para área externa", "bought": false }
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
