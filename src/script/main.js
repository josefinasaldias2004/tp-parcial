import { createHeader } from "../components/header/header.js";
import { createFooter } from "../components/footer/footer.js";
import { createKittensContent } from "../components/main/kittenContent.js";
import { createFunfactsMain } from "../components/main/funfactcontenido.js";
import { createMainContent } from "../components/main/mainContent.js";
import { createFavoritesContent } from "../components/main/favContent.js";
import { kittenAnimation } from "./kittenAnimation.js";

const app = document.querySelector(".app");

function renderPage(section) {
  app.innerHTML = "";

  const header = createHeader();
  const footer = createFooter();

  app.appendChild(header);

  let main;
  switch (section) {
    case "kittens":
      main = createKittensContent();
      break;
    case "funfacts":
      main = createFunfactsMain();
      break;
    case "favoritos":
      main = createFavoritesContent();
      break;
    default:
      main = createMainContent();
  }

  app.appendChild(main);
  app.appendChild(footer);
  
  kittenAnimation();


  header.querySelectorAll(".boton").forEach((btn) => {
    btn.addEventListener("click", () => {
      const section = btn.dataset.section;
      renderPage(section);
    })
  });
    
  main.querySelectorAll(".boton").forEach((btn) => {
    btn.addEventListener("click", () => {
      const section = btn.dataset.section;
      renderPage(section);
    });
  });
}

renderPage("home");
