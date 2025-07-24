document.addEventListener("DOMContentLoaded", () => {
  var modalContainer = document.getElementById("modalContainer");
  var modal = Array.from(document.querySelectorAll(".modal")).slice(0, 4);
  var radioButtons = document.querySelectorAll(".radioButton input");

  var modalLargura = 370 + 40; // largura + margem (20*2)
  let localizacao = 0;
  let pontoAlvo = 0;
  let animacao;
  let rolagem = true;
  let ultimoRadio = 0;

  // clona os modais
  modal.forEach((modal) => {
    var clone = modal.cloneNode(true);
    modalContainer.appendChild(clone);
  });

  // rolagem contínua
  function animate() {
    if (!rolagem) return;

    pontoAlvo -= 0.7;

    // loop infinito
    if (pontoAlvo <= -(modal.length * modalLargura)) {
      pontoAlvo = 0;
      localizacao = 0;
      modalContainer.style.transition = "none";
      modalContainer.style.transform = "translateX(0px)";
      void modalContainer.offsetWidth;
    }

    // animação css
    localizacao += (pontoAlvo - localizacao) * 0.1;
    modalContainer.style.transition = "transform 0.05s linear";
    modalContainer.style.transform = `translateX(${localizacao}px)`;

    atualizarRadio();
    animacao = requestAnimationFrame(animate);
  }

  // para a rolagem
  function pararRolagem() {
    rolagem = false;
    cancelAnimationFrame(animacao);
  }

  // ativa o radio button ao modal correspondente chegar ao centro
  function atualizarRadio() {
    var indiceAtivo = Math.round(-localizacao / modalLargura) % modal.length;

    if (indiceAtivo !== ultimoRadio) {
      radioButtons.forEach((rb) => (rb.checked = false));
      radioButtons[indiceAtivo].checked = true;
      ultimoRadio = indiceAtivo;
    }
  }

  // para no modal do radio button correspondente ativado
  function irParaModal(index) {
    pontoAlvo = -(index * modalLargura);
    localizacao = pontoAlvo;
    modalContainer.style.transition = "transform 0.5s ease-in-out";
    modalContainer.style.transform = `translateX(${localizacao}px)`;
    ultimoRadio = index;
  }

  // ativa rádio button ao clickar
  let pausar;
  radioButtons.forEach((radio, index) => {
    radio.addEventListener("click", () => {
      pararRolagem();
      irParaModal(index);
      clearTimeout(pausar);
      pausar = setTimeout(() => {
        rolagem = true;
        animate();
      }, 5000);
    });
  });

  animate();
});
// fim carroussel

