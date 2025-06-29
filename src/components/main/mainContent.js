import "../../css/main.css";

//pensar una descripcion mas creativa linda y largaa para el p
export function createMainContent() {
  const main = document.createElement("main");
  main.innerHTML = `
    <div class="cute kitten"></div>
    <div class="cute inicio">
      <h1>Inicio</h1>
      <div>
        <a href="#"><p>Mira nuestros michis</p></a>
        <a href="#"><p>Lee nuestros cumplidos de michis</p></a>
      </div>
    </div>
  `;
  return main;
}
