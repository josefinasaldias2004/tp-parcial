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

    if (exists) {
      favorites = favorites.filter((f) => f !== fact);
    } else {
      favorites.push(fact);
    }

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
      emoji.textContent = "🐱";

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

  async function fetchFacts(page = 0) {
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
            return data.fact;
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
      console.error("Error al cargar facts:", err);
      renderFacts(["No se pudieron cargar los cumplidos 😿"]);
    } finally {
      hideLoader();
    }
  }

  navButtons.querySelector("#prevBtn").addEventListener("click", () => {
    if (currentPage > 0) {
      currentPage--;
      fetchFacts(currentPage);
    }
  });

  navButtons.querySelector("#nextBtn").addEventListener("click", () => {
    currentPage++;
    fetchFacts(currentPage);
  });

  fetchFacts(currentPage);

  return main;
}
