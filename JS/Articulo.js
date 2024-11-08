document.querySelector(".botonEnviar").addEventListener("click", function() {
    console.log("El botón 'Enviar Correo' fue clickeado.");
    alert("Estás a punto de enviar un correo electrónico.");
});

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}