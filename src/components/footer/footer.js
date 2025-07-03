import './footer.css';


export function createFooter() {
  const footer = document.createElement('footer');
  footer.innerHTML = '&copy; 2025 Mi sitio. Todos los derechos reservados.';
  return footer;
}
