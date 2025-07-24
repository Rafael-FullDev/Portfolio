// animação de entrada
var entrada = new IntersectionObserver(
  (entries) => {
    entries.forEach((entrando) => {
      if (entrando.isIntersecting) {
        entrando.target.classList.add("show");
        entrada.unobserve(entrando.target); // melhora performance
      }
    });
  },
  { threshold: 0.1 }
);

// aplica a animação nas sections
document.querySelectorAll("section").forEach((section) => {
  entrada.observe(section);
});

// header aparecendo
let rolagemHeader = 0;
var header = document.querySelector("header");

window.addEventListener("scroll", () => {
  var rolagem = window.pageYOffset;

  if (rolagem > rolagemHeader && rolagem > 100) {
    header.classList.add("hidden");
  } else {
    header.classList.remove("hidden");
  }

  if (rolagem > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  rolagemHeader = rolagem;
});
