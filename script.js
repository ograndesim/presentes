let selectedItem = "";

// Lista de presentes
let gifts = [
    { "name": "Forno elétrico", "bought": false, "category": "ELETRODOMÉSTICOS" },
    { "name": "Coifa", "bought": false, "category": "ELETRODOMÉSTICOS" },
    { "name": "Liquidificador", "bought": false, "category": "ELETRODOMÉSTICOS" },
    { "name": "Batedeira", "bought": false, "category": "ELETRODOMÉSTICOS" },
    { "name": "Cafeteira", "bought": false, "category": "ELETRODOMÉSTICOS" },
    { "name": "Espremedor de frutas", "bought": false, "category": "ELETRODOMÉSTICOS" },
    { "name": "Mixer", "bought": false, "category": "ELETRODOMÉSTICOS" },
    { "name": "Sanduicheira", "bought": false, "category": "ELETRODOMÉSTICOS" },
    { "name": "Torradeira", "bought": false, "category": "ELETRODOMÉSTICOS" },
    { "name": "Processador de alimentos", "bought": false, "category": "ELETRODOMÉSTICOS" },
    { "name": "Air fryer", "bought": false, "category": "ELETRODOMÉSTICOS" },
    { "name": "Máquina de lavar louça", "bought": false, "category": "ELETRODOMÉSTICOS" },
    { "name": "Bebedouro/Purificador de água", "bought": false, "category": "ELETRODOMÉSTICOS" },
    { "name": "Ferro de passar", "bought": false, "category": "ELETRODOMÉSTICOS" },
    { "name": "Aspirador de pó", "bought": false, "category": "ELETRODOMÉSTICOS" },
    { "name": "Máquina de lavar roupa", "bought": false, "category": "ELETRODOMÉSTICOS" },
    { "name": "Máquina de secar roupa", "bought": false, "category": "ELETRODOMÉSTICOS" },
    { "name": "Climatizador/Ventilador", "bought": false, "category": "ELETRODOMÉSTICOS" },
    { "name": "Colchão", "bought": false, "category": "MÓVEIS" },
    { "name": "Criado-mudo", "bought": false, "category": "MÓVEIS" },
    { "name": "Cômoda", "bought": false, "category": "MÓVEIS" },
    { "name": "Mesa de jantar", "bought": false, "category": "MÓVEIS" },
    { "name": "Cadeiras", "bought": false, "category": "MÓVEIS" },
    { "name": "Sofá", "bought": false, "category": "MÓVEIS" },
    { "name": "Rack/Estante para TV", "bought": false, "category": "MÓVEIS" },
    { "name": "Mesa de centro", "bought": false, "category": "MÓVEIS" },
    { "name": "Poltronas/Puffs", "bought": false, "category": "MÓVEIS" },
    { "name": "Aparador", "bought": false, "category": "MÓVEIS" },
    { "name": "Escrivaninha", "bought": false, "category": "MÓVEIS" },
    { "name": "Mesa/bancada para cozinha", "bought": false, "category": "MÓVEIS" },
    { "name": "Banquetas", "bought": false, "category": "MÓVEIS" },
    { "name": "Jogos de lençol", "bought": false, "category": "CAMA, MESA E BANHO" },
    { "name": "Travesseiros", "bought": false, "category": "CAMA, MESA E BANHO" },
    { "name": "Fronhas", "bought": false, "category": "CAMA, MESA E BANHO" },
    { "name": "Edredom", "bought": false, "category": "CAMA, MESA E BANHO" },
    { "name": "Cobertor/Manta", "bought": false, "category": "CAMA, MESA E BANHO" },
    { "name": "Protetor de colchão", "bought": false, "category": "CAMA, MESA E BANHO" },
    { "name": "Toalhas de banho", "bought": false, "category": "CAMA, MESA E BANHO" },
    { "name": "Toalhas de rosto", "bought": false, "category": "CAMA, MESA E BANHO" },
    { "name": "Tapete para banheiro", "bought": false, "category": "CAMA, MESA E BANHO" },
    { "name": "Toalhas de mesa", "bought": false, "category": "CAMA, MESA E BANHO" },
    { "name": "Jogos americanos", "bought": false, "category": "CAMA, MESA E BANHO" },
    { "name": "Guardanapos de pano", "bought": false, "category": "CAMA, MESA E BANHO" },
    { "name": "Jogo de panelas", "bought": false, "category": "UTENSÍLIOS DE COZINHA" },
    { "name": "Panela de pressão", "bought": false, "category": "UTENSÍLIOS DE COZINHA" },
    { "name": "Frigideira", "bought": false, "category": "UTENSÍLIOS DE COZINHA" },
    { "name": "Assadeiras", "bought": false, "category": "UTENSÍLIOS DE COZINHA" },
    { "name": "Jogo de facas", "bought": false, "category": "UTENSÍLIOS DE COZINHA" },
    { "name": "Tábuas de corte", "bought": false, "category": "UTENSÍLIOS DE COZINHA" },
    { "name": "Utensílios diversos (colheres, espátulas, conchas)", "bought": false, "category": "UTENSÍLIOS DE COZINHA" },
    { "name": "Escorredor de louça", "bought": false, "category": "UTENSÍLIOS DE COZINHA" },
    { "name": "Jogo de pratos", "bought": false, "category": "UTENSÍLIOS DE COZINHA" },
    { "name": "Copos e taças", "bought": false, "category": "UTENSÍLIOS DE COZINHA" },
    { "name": "Xícaras e pires", "bought": false, "category": "UTENSÍLIOS DE COZINHA" },
    { "name": "Jarra para suco/água", "bought": false, "category": "UTENSÍLIOS DE COZINHA" },
    { "name": "Saleiro/Pimenteiro", "bought": false, "category": "UTENSÍLIOS DE COZINHA" },
    { "name": "Potes para mantimentos", "bought": false, "category": "UTENSÍLIOS DE COZINHA" },
    { "name": "Forminhas de gelo", "bought": false, "category": "UTENSÍLIOS DE COZINHA" },
    { "name": "Quadros decorativos", "bought": false, "category": "DECORAÇÃO E OUTROS" },
    { "name": "Espelhos", "bought": false, "category": "DECORAÇÃO E OUTROS" },
    { "name": "Vasos de plantas/flores", "bought": false, "category": "DECORAÇÃO E OUTROS" },
    { "name": "Cortinas/Persianas", "bought": false, "category": "DECORAÇÃO E OUTROS" },
    { "name": "Luminárias", "bought": false, "category": "DECORAÇÃO E OUTROS" },
    { "name": "Churrasqueira elétrica ou a carvão", "bought": false, "category": "DECORAÇÃO E OUTROS" },
    { "name": "Itens para área externa", "bought": false, "category": "DECORAÇÃO E OUTROS" }
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

    const groupedGifts = {};

    gifts.forEach(gift => {
        if (!groupedGifts[gift.category]) {
            groupedGifts[gift.category] = [];
        }
        groupedGifts[gift.category].push(gift);
    });

    for (const category in groupedGifts) {
        const categoryHeader = document.createElement("h3");
        categoryHeader.textContent = category;
        giftList.appendChild(categoryHeader);

        groupedGifts[category].forEach(gift => {
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

// Carregar a lista ao inicializar a página
loadGifts();
