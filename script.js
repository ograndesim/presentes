// Dados de presentes
const presents = [
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

// Função para renderizar a lista de presentes
function renderPresents() {
    // Cria um objeto para agrupar presentes por categoria
    const groupedPresents = presents.reduce((groups, present) => {
        if (!groups[present.category]) {
            groups[present.category] = [];
        }
        groups[present.category].push(present);
        return groups;
    }, {});

    // Seleciona o contêiner da página
    const container = document.getElementById("present-list");

    // Limpa o conteúdo atual
    container.innerHTML = "";

    // Cria as categorias e itens dentro delas
    Object.keys(groupedPresents).forEach(category => {
        const categoryDiv = document.createElement("div");
        categoryDiv.classList.add("category");

        const categoryTitle = document.createElement("h2");
        categoryTitle.textContent = category;
        categoryDiv.appendChild(categoryTitle);

        groupedPresents[category].forEach(present => {
            const presentDiv = document.createElement("div");
            presentDiv.classList.add("present");

            const name = document.createElement("span");
            name.textContent = present.name;
            presentDiv.appendChild(name);

            const boughtCheckbox = document.createElement("input");
            boughtCheckbox.type = "checkbox";
            boughtCheckbox.checked = present.bought;
            boughtCheckbox.addEventListener("change", () => {
                present.bought = boughtCheckbox.checked;
            });
            presentDiv.appendChild(boughtCheckbox);

            categoryDiv.appendChild(presentDiv);
        });

        container.appendChild(categoryDiv);
    });
}

// Chama a função para renderizar os presentes ao carregar a página
document.addEventListener("DOMContentLoaded", renderPresents);
