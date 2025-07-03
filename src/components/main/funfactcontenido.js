import "./mainContent.css";

export function createFunfactsMain() {
  const main = document.createElement("main");

  const topBar = document.createElement("div");
  topBar.className = "top-bar";
  topBar.innerHTML = `<h1>Michi facts</h1>`;

  const gallery = document.createElement("div");
  gallery.className = "cat-gallery";

  const loader = document.createElement("div");
  loader.className = "loader";
  loader.textContent = "Cargando...";
  loader.style.display = "none";

  const navButtons = document.createElement("div");
  navButtons.className = "nav-buttons";
  navButtons.innerHTML = `
    <button id="prevBtn">⟨ Anterior</button>
    <button id="nextBtn">Siguiente ⟩</button>
  `;

  const prevBtn = navButtons.querySelector("#prevBtn");
  const nextBtn = navButtons.querySelector("#nextBtn");

  main.append(topBar, loader, gallery, navButtons);

  let currentPage = 0;
  const limit = 6;
  const pageCache = {};

  function getFavorites() {
    return JSON.parse(localStorage.getItem("funfact_favorites")) || [];
  }

  function toggleFavorite(fact) {
    let favorites = getFavorites();
    const exists = favorites.includes(fact);
    favorites = exists
      ? favorites.filter((f) => f !== fact)
      : [...favorites, fact];
    localStorage.setItem("funfact_favorites", JSON.stringify(favorites));
  }

  function renderFacts(factsList) {
    gallery.innerHTML = "";
    const favorites = getFavorites();

    factsList.forEach((fact) => {
      const card = document.createElement("div");
      card.className = "cat-card comment";

      const emoji = document.createElement("span");
      emoji.className = "comment-emoji";
      emoji.textContent = "₊˚ʚ ᗢ₊˚✧.";

      const text = document.createElement("p");
      text.className = "comment-text";
      text.textContent = fact;

      const favBtn = document.createElement("button");
      favBtn.className = "fav-btn";
      favBtn.textContent = "❤";
      if (favorites.includes(fact)) favBtn.classList.add("favorited");

      favBtn.onclick = () => {
        toggleFavorite(fact);
        favBtn.classList.toggle("favorited");
      };

      card.append(emoji, text, favBtn);
      gallery.appendChild(card);
    });
  }

  function showLoader() {
    loader.style.display = "block";
    gallery.style.display = "none";
  }

  function hideLoader() {
    loader.style.display = "none";
    gallery.style.display = "flex";
  }

  async function translateText(text) {
    try {
      const res = await fetch("https://libretranslate.de/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          q: text,
          source: "en",
          target: "es",
          format: "text"
        })
      });
      const data = await res.json();
      return data.translatedText || text;
    } catch {
      return text;
    }
  }

  async function fetchFacts(page = 0) {
    prevBtn.style.display = page === 0 ? "none" : "inline-block";

    if (pageCache[page]) {
      renderFacts(pageCache[page]);
      return;
    }

    showLoader();

    try {
      const breedsRes = await fetch("https://api.thecatapi.com/v1/breeds");
      const breeds = await breedsRes.json();

      const selectedBreeds = breeds
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.ceil(limit / 2));

      const breedFacts = selectedBreeds.map((breed) => {
        if (breed.temperament) {
          return `El ${breed.name} es ${breed.temperament.toLowerCase()}.`;
        } else if (breed.description) {
          return `El ${breed.name}: ${breed.description}`;
        } else {
          return `El ${breed.name} es un michi muy especial.`;
        }
      });

      const factPromises = Array.from(
        { length: limit - breedFacts.length },
        async () => {
          try {
            const res = await fetch("https://catfact.ninja/fact");
            const data = await res.json();
            return await translateText(data.fact);
          } catch {
            return "No se pudo cargar el cumplido 😿";
          }
        }
      );

      const catFacts = await Promise.all(factPromises);
      const combined = [...breedFacts, ...catFacts].sort(() => 0.5 - Math.random());

      pageCache[page] = combined;
      renderFacts(combined);
    } catch (err) {
      renderFacts(["No se pudieron cargar los cumplidos 😿"]);
    } finally {
      hideLoader();
    }
  }

  prevBtn.addEventListener("click", () => {
    if (currentPage > 0) {
      currentPage--;
      fetchFacts(currentPage);
    }
  });

  nextBtn.addEventListener("click", () => {
    currentPage++;
    fetchFacts(currentPage);
  });

  fetchFacts(currentPage);

  return main;
}
