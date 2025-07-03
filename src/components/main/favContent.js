import "./mainContent.css";

export function createFavoritesContent() {
  const main = document.createElement("main");

  const title = document.createElement("h1");
  title.textContent = "Mis Favoritos:";
  title.style.textAlign = "center";

  // Sección de gatitos
  const catsTitle = document.createElement("h2");
  catsTitle.textContent = "Michiss :3";
  catsTitle.style.textAlign = "center";

  const catGallery = document.createElement("div");
  catGallery.className = "cat-gallery";

  const storedCats = JSON.parse(localStorage.getItem("favorites")) || [];

  if (storedCats.length === 0) {
    const message = document.createElement("p");
    message.textContent = "Todavía no marcaste gatitos como favoritos (っ◞‸◟c)";
    message.style.textAlign = "center";
    catGallery.appendChild(message);
  } else {
    storedCats.forEach((cat) => {
      const card = document.createElement("div");
      card.className = "cat-card";

      const img = document.createElement("img");
      img.src = cat.url;

      const favBtn = document.createElement("button");
      favBtn.className = "fav-btn favorited";
      favBtn.textContent = "❤";

      favBtn.onclick = () => {
        removeCatFavorite(cat.id);
        card.remove();

        if (catGallery.children.length === 0) {
          const msg = document.createElement("p");
          msg.textContent = "Ya no hay gatitos favoritos.";
          msg.style.textAlign = "center";
          catGallery.appendChild(msg);
        }
      };

      card.append(img, favBtn);
      catGallery.appendChild(card);
    });
  }

  // Sección de cumplidos
  const factsTitle = document.createElement("h2");
  factsTitle.textContent = "Factss";
  factsTitle.style.textAlign = "center";

  const factGallery = document.createElement("div");
  factGallery.className = "cat-gallery";

  const storedFacts = JSON.parse(localStorage.getItem("funfact_favorites")) || [];

  if (storedFacts.length === 0) {
    const message = document.createElement("p");
    message.textContent = "Todavía no guardaste cumplidos favoritos (｡•́︿•̀｡)";
    message.style.color = "gray";
    message.style.textAlign = "center";
    factGallery.appendChild(message);
  } else {
    storedFacts.forEach((fact) => {
      const card = document.createElement("div");
      card.className = "cat-card comment";

      const emoji = document.createElement("span");
      emoji.className = "comment-emoji";
      emoji.textContent = "🐱";

      const text = document.createElement("p");
      text.className = "comment-text";
      text.textContent = fact;

      const favBtn = document.createElement("button");
      favBtn.className = "fav-btn favorited";
      favBtn.textContent = "❤";

      favBtn.onclick = () => {
        removeFactFavorite(fact);
        card.remove();

        if (factGallery.children.length === 0) {
          const msg = document.createElement("p");
          msg.textContent = "Ya no hay cumplidos favoritos.";
          msg.style.color = "gray";
          msg.style.textAlign = "center";
          factGallery.appendChild(msg);
        }
      };

      card.append(emoji, text, favBtn);
      factGallery.appendChild(card);
    });
  }

  main.append(title, catsTitle, catGallery, factsTitle, factGallery);
  return main;
}

function removeCatFavorite(id) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favorites = favorites.filter((cat) => cat.id !== id);
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

function removeFactFavorite(fact) {
  let facts = JSON.parse(localStorage.getItem("funfact_favorites")) || [];
  facts = facts.filter((f) => f !== fact);
  localStorage.setItem("funfact_favorites", JSON.stringify(facts));
}
