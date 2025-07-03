import "./header.css";
export function createHeader() {
  const header = document.createElement("header");
  header.innerHTML = `
    <nav>
      <div class="boton home" data-section="home">
        <p class="icons">⌂</p>
        <p class="p-sitio">home</p>
      </div>
      <div class="boton cats" data-section="kittens">
        <p class="icons">=ᗢ=</p>
        <p class="p-sitio">kittens</p>
      </div>
      <div class="boton funfact" data-section="funfacts">
        <p class="icons">✰</p>
        <p class="p-sitio">funfact</p>
      </div>
      <div class="boton favoritos" data-section="favoritos">
        <p class="icons">❤</p>
        <p class="p-sitio">favoritos</p>
      </div>
    </nav>
  `;

  header.querySelectorAll(".boton").forEach((btn) => {
    btn.addEventListener("click", () => {
      const section = btn.dataset.section;
      history.pushState({}, "", `#${section}`);
      window.dispatchEvent(new Event("popstate"));
    });
  });

  return header;
}
