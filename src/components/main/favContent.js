import "./mainContent.css";
export function createFavoritesContent() {
  const main = document.createElement("main");

  const title = document.createElement("h1");
  title.textContent = "Mis Gatitos Favoritos";
  title.style.textAlign = "center";

  const gallery = document.createElement("div");
  gallery.className = "cat-gallery";

  const stored = JSON.parse(localStorage.getItem("favorites")) || [];

  if (stored.length === 0) {
    const message = document.createElement("p");
    message.textContent = "Todavía no marcaste gatitos como favoritos (っ◞‸◟c)";
    message.style.color = "gray";
    message.style.textAlign = "center";
    gallery.appendChild(message);
  } else {
    stored.forEach((cat) => {
      const card = document.createElement("div");
      card.className = "cat-card";

      const img = document.createElement("img");
      img.src = cat.url;

      const favBtn = document.createElement("button");
      favBtn.className = "fav-btn favorited";
      favBtn.textContent = "❤";

      favBtn.onclick = () => {
        removeFavorite(cat.id);
        card.remove();

        if (gallery.children.length === 0) {
          const msg = document.createElement("p");
          msg.textContent = "Ya no hay favoritos.";
          msg.style.color = "gray";
          msg.style.textAlign = "center";
          gallery.appendChild(msg);
        }
      };

      card.append(img, favBtn);
      gallery.appendChild(card);
    });
  }

  main.append(title, gallery);
  return main;
}

function removeFavorite(id) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favorites = favorites.filter((cat) => cat.id !== id);
  localStorage.setItem("favorites", JSON.stringify(favorites));
}
