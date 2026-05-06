function getCategoryFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("cat");
}

function renderCategory(category) {
  const container = document.getElementById("category-content");

  if (category === "drag") {
    container.innerHTML = `
      <div class="row align-items-center mb-5">
        <div class="col-md-6">
          <img src="assets/look5.jpg" class="img-fluid rounded">
        </div>
        <div class="col-md-6 text-white">
          <h3>Drag Look 1</h3>
          <p>ADD YOUR TEXT HERE</p>
        </div>
      </div>

      <div class="row align-items-center">
        <div class="col-md-6">
          <img src="assets/look6.jpg" class="img-fluid rounded">
        </div>
        <div class="col-md-6 text-white">
          <h3>Drag Look 2</h3>
          <p>ADD YOUR TEXT HERE</p>
        </div>
      </div>
    `;
  }

  else if (category === "soft") {
    container.innerHTML = `
      <div class="row align-items-center">
        <div class="col-md-6">
          <img src="assets/look7.jpg" class="img-fluid rounded">
        </div>
        <div class="col-md-6 text-white">
          <h3>Soft Glam</h3>
        </div>
      </div>
    `;
  }

  else if (category === "experimental") {
    container.innerHTML = `
      <div class="carousel-container">

        <button class="nav-btn" onclick="prev()">‹</button>

        <img id="carousel-image" src="assets/look8.jpg" class="carousel-img">

        <button class="nav-btn" onclick="next()">›</button>

      </div>

      <div class="text-center text-white mt-4">
        <h3>Experimental Series</h3>
      </div>
    `;
  }
}

const images = [
  "assets/look8.jpg",
  "assets/look9.jpg",
  "assets/look10.jpg",
  "assets/look11.jpg"
];

let current = 0;

function showImage() {
  document.getElementById("carousel-image").src = images[current];
}

function next() {
  current = (current + 1) % images.length;
  showImage();
}

function prev() {
  current = (current - 1 + images.length) % images.length;
  showImage();
}

document.addEventListener("DOMContentLoaded", () => {
  const category = getCategoryFromURL();
  renderCategory(category);
});