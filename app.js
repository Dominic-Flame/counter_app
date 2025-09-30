"use strict"; // Enforce stricter JS rules.

/* 1) DOM lookups + state */
const valueE1 = document.getElementById("value");
const incBtn = document.getElementById("inc");
const decBtn = document.getElementById("dec");
const resetBtn = document.getElementById("reset");
const stepInput = document.getElementById("step");
const hintE1 = document.getElementById("hint");

let value = 0; // counter
let step = 1; // step size

const min = 0; // lower bound
const max = 9999; // upper bound

/* 2) helpers (pure) */
const clamp = (n, lo, hi) => Math.min(hi, Math.max(lo, n));

/* 3) render (DOM only here) */
function render() {
  valueE1.textContent = String(value);

  // re-trigger tiny pulse animation each update (optional)
  valueE1.classList.remove("tick");
  void valueE1.offsetWidth; // force reflow to restart animation
  valueE1.classList.add("tick");

  // update button enabled/disabled based on bounds
  decBtn.disabled = value <= min;
  incBtn.disabled = value >= max;
}

/* 4) hint helper */
function showHint(msg) {
  hintE1.textContent = msg;
  hintE1.hidden = !msg;
  stepInput.setAttribute("aria-invalid", msg ? "true" : "false"); // correct ARIA
}

/* 5) events → update state → render */
stepInput.addEventListener("input", (e) => {
  const n = Number.parseInt(e.target.value, 10);
  if (!Number.isFinite(n) || n <= 0) {
    showHint("Step must be a positive integer");
    return;
  }
  showHint("");
  step = n;
});

incBtn.addEventListener("click", () => {
  value = clamp(value + step, min, max);
  render();
});

decBtn.addEventListener("click", () => {
  value = clamp(value - step, min, max);
  render();
});

resetBtn.addEventListener("click", () => {
  value = min; // one source of truth for reset target
  render();
});

/* 6) first paint */
render();
