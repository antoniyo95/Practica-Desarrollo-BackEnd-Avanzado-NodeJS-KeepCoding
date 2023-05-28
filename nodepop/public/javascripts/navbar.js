  document.addEventListener('DOMContentLoaded', () => {
    // Obtener todos los elementos "navbar-burger"
    const navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    // Verificar si hay elementos "navbar-burger"
    if (navbarBurgers.length > 0) {
      // Agregar eventos de clic a cada elemento "navbar-burger"
      navbarBurgers.forEach((navbarBurger) => {
        navbarBurger.addEventListener('click', () => {
          // Obtener el objetivo del elemento "navbar-burger" según su atributo "data-target"
          const target = navbarBurger.dataset.target;
          const targetElement = document.getElementById(target);

          // Alternar las clases "is-active" en tanto el elemento "navbar-burger" como el objetivo
          navbarBurger.classList.toggle('is-active');
          targetElement.classList.toggle('is-active');
        });
      });
    }
  });
