import "..css/header.css";

export default function Header() {
  return `
    <header>
        <nav>
            <div class="boton home">
                <p class="icons">⌂</p>
                <a href=""><p class="p-sitio">home</p></a>
            </div>
            <div class="boton cats">
                <p class="icons">=ᗢ=</p>
                <a href="" ><p class="p-sitio">kittens</p></a>
            </div>
            <div class="boton funfact">
                <p class="icons">✰</p>
                <a href=""><p class="p-sitio">funfact</p></a>
            </div>
        </nav>
    </header>
    `;
}
