let theme = localStorage.getItem("theme-color");
if (theme === null) {
  setTheme("blue");
} else {
  setTheme(theme);
}
let themeDots = document.getElementsByClassName("theme-dot");

for (let i = 0; i < themeDots.length; i++) {
  const dot = themeDots[i];
  dot.addEventListener("click", () => {
    let mode = dot.dataset.mode;
    setTheme(mode);
  });
}

function setTheme(mode) {
  switch (mode) {
    case "light":
      document.getElementById("theme-style").href = "style.css";
      break;
    case "blue":
      document.getElementById("theme-style").href = "blue.css";
      break;
    case "green":
      document.getElementById("theme-style").href = "green.css";
      break;
    case "purple":
      document.getElementById("theme-style").href = "purple.css";
      break;
    default:
      document.getElementById("theme-style").href = "style.css";
      break;
  }
  localStorage.setItem("theme-color", mode);
}
