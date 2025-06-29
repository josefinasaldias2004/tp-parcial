import { createHeader } from '../components/header/header.js';
import { createFooter } from '../components/footer/footer.js';
import { createKittensContent } from '../components/main/kittenContent.js';

const app = document.querySelector('.app');

app.appendChild(createHeader());
app.appendChild(createKittensContent());
app.appendChild(createFooter());

