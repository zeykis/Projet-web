function changeImageOnHover() {
  const img = document.getElementById('tibo');
  img.src = 'src/assets/200w.gif';
}

function restoreOriginalImage() {
  const img = document.getElementById('tibo');
  img.src = 'src/assets/Shuichi_Saihara_Portrait.webp';
}
/* 
function goToCalculatrice(event) {
    event.preventDefault();
    document.getElementById("body_index").style.display = "none";
    const target = document.getElementById('Calculatrice');
    target.className = "";
    target.scrollIntoView({ behavior: 'smooth' });
  }

function goToIndex(event) {
    event.preventDefault();
    document.getElementById("Calculatrice").className = "hidden";
    const target = document.getElementById("body_index");
    target.style.display = "block";
    target.scrollIntoView({ behavior: 'smooth' });
  }
 */