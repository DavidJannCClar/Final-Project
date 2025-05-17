document.getElementById("signupForm").addEventListener("submit", function(event) {
  event.preventDefault();

  let valid = true;
  const errors = document.querySelectorAll(".error");
  errors.forEach(e => e.textContent = "");

  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const contact = document.getElementById("contact").value.trim();
  const whySupport = document.getElementById("whySupport").value.trim();
  const sex = document.querySelector("input[name='sex']:checked");

  if (!firstName) { showError(0); valid = false; }
  if (!lastName) { showError(1); valid = false; }
  if (!sex) { showError(2); valid = false; }
  if (!email) { showError(3); valid = false; }
  if (!password) { showError(4); valid = false; }
  if (!whySupport) { showError(6); valid = false; }

  if (valid) {
    localStorage.setItem("firstName", firstName);
    localStorage.setItem("lastName", lastName);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
    localStorage.setItem("contact", contact);
    localStorage.setItem("whySupport", whySupport);
    localStorage.setItem("sex", sex.value);
    window.location.href = "profile.html";
  }

  function showError(index) {
    document.querySelectorAll(".error")[index].textContent = "required";
  }
});
