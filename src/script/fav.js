import { createHeader } from "../components/header/header.js";
import { createFooter } from "../components/footer/footer.js";
import { createFavoritesContent } from "../components/main/favContent.js";

const app = document.querySelector(".app");

app.appendChild(createHeader());
app.appendChild(createFavoritesContent());
app.appendChild(createFooter());
