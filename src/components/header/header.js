import "./header.css"; 

export function createHeader() {
  const header = document.createElement("header");
  header.innerHTML = `
    <nav>
      <div class="boton home">
        <p class="icons">⌂</p>
        <a href="/index.html"><p class="p-sitio">home</p></a>
      </div>
      <div class="boton cats">
        <p class="icons">=ᗢ=</p>
        <a href="/paginas/kittens.html"><p class="p-sitio">kittens</p></a>
      </div>
      <div class="boton funfact">
        <p class="icons">✰</p>
        <a href="/paginas/funfact.html"><p class="p-sitio">funfact</p></a>
      </div>
      <div class="boton favorito">
        <p class="icons">✰</p>
        <a href="/paginas/favoritos.html"><p class="p-sitio">fav</p></a>
      </div>
    </nav>
  `;
  return header;
}
