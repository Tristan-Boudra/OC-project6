function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    var modalOverlay = document.getElementById("modal-overlay");
    modalOverlay.style.display = "none";
}

function sendFormContact() {
    
    const name = document.getElementById("name").value;
    const lastname = document.getElementById("lastname").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    
    console.log("Prénom:", name);
    console.log("Nom:", lastname);
    console.log("Email:", email);
    console.log("Message:", message);
}

const form = document.querySelector(".contact_form");
form.addEventListener("submit", function(event) {
    event.preventDefault();
    sendFormContact();
    closeModal();
});

const closeForm = document.querySelector(".closeForm");
closeForm.addEventListener("click", function(event) {
    event.preventDefault();
    closeModal();
});