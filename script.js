let selectedItem = "";

let gifts = [
    async function saveGift(giftName) {
  const response = await fetch('https://script.google.com/macros/s/1y0cWP_AZg_9p7AomO0gucAdl4GWLYq0GqN08qhdLrUI/exec', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: giftName })
  });

  const data = await response.json();
  if (data.status === 'success') {
    alert("Presente confirmado!");
    loadGifts();
  } else {
    alert("Erro ao confirmar o presente.");
  }
}

async function loadGifts() {
  const response = await fetch('https://script.google.com/macros/s/1y0cWP_AZg_9p7AomO0gucAdl4GWLYq0GqN08qhdLrUI/exec');
  const gifts = await response.json();

  // Atualize a lista de presentes com os dados recebidos
  // e marque os itens conforme seu status 'bought'
}

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
