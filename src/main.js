function changeImageOnHover() {
  const img = document.getElementById('tibo');
  img.src = 'src/assets/200w.gif';
}

function restoreOriginalImage() {
  const img = document.getElementById('tibo');
  img.src = 'src/assets/Shuichi_Saihara_Portrait.webp';
}

function goToCalculatrice(event) {
    event.preventDefault();
    document.getElementById("body_index").style.display = "none";
    const target = document.getElementById('Calculatrice');
    target.style.display = 'block';
    target.scrollIntoView({ behavior: 'smooth' });
  }