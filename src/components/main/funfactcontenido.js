import "./mainContent.css";
export function createFunfactsMain() {
  const main = document.createElement("main");
  main.className = "fun-page";

  const title = document.createElement("h1");
  title.textContent = "Cumplidos de Michis 🐾";

  const factList = document.createElement("div");
  factList.className = "fact-list";

  const btn = document.createElement("button");
  btn.textContent = "Cargar más cumplidos";
  btn.className = "btn-load";

  btn.addEventListener("click", async () => {
    btn.disabled = true;
    btn.textContent = "Cargando...";
    const facts = await fetchFacts();
    facts.forEach((fact) => {
      const card = document.createElement("div");
      card.className = "fact-card";
      card.innerHTML = `<p>${fact.text}</p>`;
      factList.appendChild(card);
    });
    btn.textContent = "Cargar más cumplidos";
    btn.disabled = false;
  });

  main.append(title, factList, btn);
  return main;
}

async function fetchFacts() {
  try {
    const res = await fetch(
      "https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=3"
    );
    const data = await res.json();
    return Array.isArray(data) ? data : [data];
  } catch {
    return [{ text: "No se pudieron cargar los cumplidos :(" }];
  }
}
