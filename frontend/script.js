let result = document.getElementById("result");
let body = document.body;
let modeBtn = document.getElementById("modeBtn");

function append(value) {
  result.value += value;
}

function clearResult() {
  result.value = "";
}

function calculate() {
  try {
    result.value = eval(result.value);
  } catch {
    result.value = "Error";
  }
}

/* 🌙 Toggle Dark / Light Mode */
function toggleMode() {
  body.classList.toggle("light");

  if (body.classList.contains("light")) {
    modeBtn.innerText = "☀ Light";
  } else {
    modeBtn.innerText = "🌙 Dark";
  }
}
