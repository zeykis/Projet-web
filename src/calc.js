document.addEventListener("DOMContentLoaded", function () {
  let display = document.getElementById("display");

  window.append = function(character) {
    if (display.innerText === "0" || display.innerText === "Error") {
      display.innerText = character;
    } else {
      display.innerText += character;
    }
  };

  window.clearDisplay = function() {
    display.innerText = "0";
  };

  window.delChar = function() {
    display.innerText = display.innerText.slice(0, -1);
    if (display.innerText === "") {
      display.innerText = "0";
    }
  };

  window.calculate = function() {
    try {
      display.innerText = eval(display.innerText.replace(/×/g, '*').replace(/÷/g, '/'));
    } catch (e) {
      display.innerText = "Error";
    }
  };
});
