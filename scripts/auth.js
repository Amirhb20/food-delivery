function saveActiveForm(formType) {
  localStorage.setItem("activeForm", formType);
}

function showForm(formType) {
  const signupForm = document.getElementById("signup-form");
  const loginForm = document.getElementById("login-form");

  if (formType === "login") {
    signupForm.style.display = "none";
    loginForm.style.display = "block";
  } else {
    loginForm.style.display = "none";
    signupForm.style.display = "block";
  }
  saveActiveForm(formType);
}

function getURLParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

window.onload = function () {
  const urlForm = getURLParameter("form");

  if (urlForm === "login") {
    showForm("login");
  } else if (urlForm === "signup") {
    showForm("signup");
  } else {
    const savedForm = localStorage.getItem("activeForm");
    if (savedForm === "login") {
      showForm("login");
    } else {
      showForm("signup");
    }
  }
};
