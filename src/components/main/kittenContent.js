import "./mainContent.css";

export function createKittensContent() {
  const main = document.createElement("main");

  const topBar = document.createElement("div");
  topBar.classList.add("top-bar");
  topBar.innerHTML = `
    <h1>Galería de Gatitos</h1>
    <div class="search-box">
      <input type="text" id="search" placeholder="Buscar raza..." autocomplete="off" />
      <ul id="suggestions" class="suggestions"></ul>
    </div>
  `;
  //agregar luego un icono con una lupa el cual si le haces click se envia

  const gallery = document.createElement("div");
  gallery.classList.add("cat-gallery");

  const loader = document.createElement("div");
  loader.classList.add("loader");
  loader.textContent = "Cargando...";
  loader.style.display = "none";

  const navButtons = document.createElement("div");
  navButtons.classList.add("nav-buttons");
  navButtons.innerHTML = `
    <button id="prevBtn">⟨ Anterior</button>
    <button id="nextBtn">Siguiente ⟩</button>
  `;

  main.appendChild(topBar);
  main.appendChild(loader);
  main.appendChild(gallery);
  main.appendChild(navButtons);

  let breeds = [];
  let currentPage = 0;
  const limit = 12;
  const pageCache = {}; // ← Cache de páginas

  fetch("https://api.thecatapi.com/v1/breeds")
    .then((res) => res.json())
    .then((data) => {
      breeds = data;
    });

  function renderCats(data) {
    gallery.innerHTML = "";
    const maxCards = 8;

    data.slice(0, maxCards).forEach((cat) => {
      const card = document.createElement("div");
      card.classList.add("cat-card");
      card.innerHTML = `<img src="${cat.url}" alt="Cat" />`;
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

  function fetchCats(page = 0) {
    if (pageCache[page]) {
      renderCats(pageCache[page]);
      return;
    }

    showLoader();

    fetch(
      `https://api.thecatapi.com/v1/images/search?limit=${limit}&page=${page}&order=Desc`
    )
      .then((res) => res.json())
      .then((data) => {
        pageCache[page] = data;
        renderCats(data);
      })
      .catch((err) => {
        gallery.innerHTML = `<p style="color:red">Error al cargar gatitos ᓚ₍ ^. _.^₎</p>`;
        console.error(err);
      })
      .finally(() => {
        hideLoader();
      });
  }

  navButtons.querySelector("#prevBtn").addEventListener("click", () => {
    if (currentPage > 0) {
      currentPage--;
      fetchCats(currentPage);
    }
  });

  navButtons.querySelector("#nextBtn").addEventListener("click", () => {
    currentPage++;
    fetchCats(currentPage);
  });

  const searchInput = topBar.querySelector("#search");
  const suggestions = topBar.querySelector("#suggestions");

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase().trim();
    suggestions.innerHTML = "";
    suggestions.classList.remove("show");

    if (query.length < 2) return;

    const filtered = breeds.filter((b) => b.name.toLowerCase().includes(query));

    if (filtered.length === 0) return;

    filtered.slice(0, 5).forEach((breed) => {
      const li = document.createElement("li");
      li.textContent = breed.name;
      li.addEventListener("click", () => {
        searchInput.value = breed.name;
        suggestions.innerHTML = "";
        suggestions.classList.remove("show");
      });
      suggestions.appendChild(li);
    });

    suggestions.classList.add("show");
  });

  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = searchInput.value.trim().toLowerCase();
      const match = breeds.find((b) => b.name.toLowerCase() === value);

      if (match) {
        showLoader();
        fetch(
          `https://api.thecatapi.com/v1/images/search?limit=${limit}&breed_ids=${match.id}`
        )
          .then((res) => res.json())
          .then(renderCats)
          .catch((err) => {
            gallery.innerHTML = `<p style="color:red">Error al buscar raza /ᐠ╥ ˕ ╥;マ </p>`;
            console.error(err);
          })
          .finally(() => {
            hideLoader();
          });
      } else {
        suggestions.innerHTML = `<li style="color:red">No se encontró la raza exacta</li>`;
        suggestions.classList.add("show");
      }
    }
  });

  document.addEventListener("click", (e) => {
    if (!topBar.contains(e.target)) {
      suggestions.classList.remove("show");
    }
  });

  fetchCats(currentPage);

  return main;
}
