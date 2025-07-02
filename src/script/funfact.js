import { createHeader } from "../components/header/header.js";
import { createFooter } from "../components/footer/footer.js";
import { createFunfactsMain } from "../components/main/funfactcontenido.js";

const app = document.querySelector(".app");

app.appendChild(createHeader());
app.appendChild(createFunfactsMain());
app.appendChild(createFooter());
