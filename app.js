document.addEventListener("DOMContentLoaded", function () {
  const mail = {
    email: "",
    asunto: "",
    mensaje: "",
  };

  const inputEmail = document.querySelector("#email");
  const inputAsunto = document.querySelector("#asunto");
  const inputMessage = document.querySelector("#mensaje");
  const form = document.querySelector("#form");
  const btnSubmit = document.querySelector('#form button[type="submit"]');
  const btnReset = document.querySelector('#form button[type="reset"]');
  const spinner = document.querySelector("#spinner");

  inputEmail.addEventListener("input", validate);
  inputAsunto.addEventListener("input", validate);
  inputMessage.addEventListener("input", validate);

  form.addEventListener("submit", sendEmail);

  btnReset.addEventListener("click", function (e) {
    e.preventDefault();

    resetform();
  });

  function sendEmail(e) {
    e.preventDefault();
    spinner.classList.add("d-flex");
    spinner.classList.remove("visually-hidden");

    setTimeout(() => {
      spinner.classList.remove("d-flex");
      spinner.classList.add("visually-hidden");

      resetform();

      const alertSuccessful = document.createElement("P");
      alertSuccessful.classList.add(
        "bg-success", "bg-opacity-75", "text-white",
        "p-2",
        "text-center",
        "rounded",
        "mt-2",
        "fw-semibold",
        "uppercase"
      );
      alertSuccessful.textContent = "Mensaje enviado correctamente";

      form.appendChild(alertSuccessful);

        setTimeout(() => {
             alertSuccessful.remove();
        }, 2000);

    }, 2000);
  }

  function validate(e) {
    if (e.target.value.trim() === "") {
      showAlert(
        `El campo ${e.target.id} es obligatorio`,
        e.target.parentElement
      );
      email[e.target.name] = "";
      validateEmail();
      return;
    }

    if (e.target.id === "email" && !validarEmail(e.target.value)) {
      showAlert("El email no es valido", e.target.parentElement);
      email[e.target.name] = "";
      validateEmail();
      return;
    }

    emptyAlert(e.target.parentElement);

    email[e.target.name] = e.target.value.trim().toLowerCase();

    validateEmail();
  }

  function showAlert(message, reference) {
    emptyAlert(reference);

    const error = document.createElement("P");
    error.textContent = message;
    error.classList.add("bg-danger", "text-white", "text-center","rounded", "mt-2", "p-1", "bg-opacity-75" );

    reference.appendChild(error);
  }

  function emptyAlert(reference) {
    const alert = reference.querySelector(".bg-danger");
    if (alert) {
      alert.remove();
    }
  }

  function validarEmail(email) {
    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const result = regex.test(email);
    return result;
  }

  function validateEmail() {
    if (Object.values(email).includes("")) {
      btnSubmit.disabled = true;
      return;
    }
    btnSubmit.disabled = false;
  }

  function resetform(params) {
    mail.email = "";
    mail.asunto = "";
    mail.mensaje = "";

    form.reset();
    validateEmail();
  }
});
