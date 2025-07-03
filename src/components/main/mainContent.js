import "../../css/main.css";

export function createMainContent() {
  const main = document.createElement("main");
  main.innerHTML = `
    <div class="mainContent">
      <div class="cute kitten"></div>
      <div class="cute inicio">
        <h1>Inicio</h1>
        <div>
        <p>Antes solían ser las cosas más faciles, ¿verdad?<br>
        Internet solia ser un lugar bonito en donde las cosas eran más sencillas.<br>
        Las redes sociales pueden ser estresantes, compararse con los demás, ver noticias crueles, odio, amargura…<br>
        pero tienen algo muy bueno… ¡Gatitos! <br>
        Entonces, por que no una pagina con un estilo algo retro, que puede revivir la simpleza de las cosas lindas, como <a class="boton" data-section="kittens"> ver imagenes de gatitos</a>, o <a class="boton" data-section="kittens">aprender cosas acerca de ellos! </a>
        <p>
        
        </div>
      </div>
    </div>
  `;
  return main;
}
