document.addEventListener("DOMContentLoaded", function () {
    console.log("Script cargado correctamente"); // 👈 Verificación
  
    const accordionButtons = document.querySelectorAll(".accordion-btn");
  
    accordionButtons.forEach((btn) => {
      btn.addEventListener("click", function () {
        console.log("Botón de acordeón clickeado"); // 👈 Verificación
  
        const accordion = this.closest(".accordion");
        accordion.classList.toggle("active");
      });
    });
  });
  