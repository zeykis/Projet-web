newSrc = "src/assets/200w.gif";
// Change image source on hover
function changeImageOnHover() {
  const images = document.getElementById("tibo").querySelectorAll("img");
  images.forEach((image) =>
    image.addEventListener("mouseover", () => {
      const newSrc = image.getAttribute("data-hover");
      if (newSrc) {
        image.setAttribute("src", newSrc);
      }
    })
  );
}