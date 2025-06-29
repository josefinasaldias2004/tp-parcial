import { createHeader } from '../components/header/header.js';
import { createFooter } from '../components/footer/footer.js';
import { createMainContent } from '../components/main/mainContent.js';

const app = document.querySelector('.app');

app.appendChild(createHeader());
app.appendChild(createMainContent());
app.appendChild(createFooter());

import('./kittenAnimation.js');
