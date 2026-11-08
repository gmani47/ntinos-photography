/* Renders the gallery from PORTFOLIO.photos and opens an accessible viewer. */
(function () {
  "use strict";

  var portfolio = window.PORTFOLIO;
  var photos = portfolio && portfolio.photos;
  var gallery = document.getElementById("gallery");
  var dialog = document.getElementById("viewer");
  var viewerImg = document.getElementById("viewer-img");
  var viewerCount = document.getElementById("viewer-count");
  var viewerCaption = document.getElementById("viewer-caption");
  var closeButton = document.getElementById("viewer-close");
  var prevButton = document.getElementById("viewer-prev");
  var nextButton = document.getElementById("viewer-next");

  var index = 0;
  var opener = null;

  function validPhoto(photo) {
    return Boolean(
      photo &&
      typeof photo.file === "string" &&
      photo.file &&
      typeof photo.alt === "string" &&
      photo.alt &&
      photo.width > 0 &&
      photo.height > 0
    );
  }

  function showMessage(text) {
    var p = document.createElement("p");
    p.className = "notice";
    p.textContent = text;
    gallery.appendChild(p);
  }

  function srcFor(photo) {
    return "photos/" + photo.file;
  }

  function renderGallery() {
    var fragment = document.createDocumentFragment();

    photos.forEach(function (photo, photoIndex) {
      var button = document.createElement("button");
      button.type = "button";
      button.className = "frame";
      button.setAttribute("data-file", photo.file);
      button.setAttribute("aria-haspopup", "dialog");

      var img = document.createElement("img");
      img.src = srcFor(photo);
      img.alt = photo.alt;
      img.width = photo.width;
      img.height = photo.height;
      img.loading = "lazy";
      img.decoding = "async";

      button.appendChild(img);
      button.addEventListener("click", function () {
        openAt(photoIndex, button);
      });
      fragment.appendChild(button);
    });

    gallery.appendChild(fragment);
  }

  function show(nextIndex) {
    index = (nextIndex + photos.length) % photos.length;
    var photo = photos[index];
    viewerImg.src = srcFor(photo);
    viewerImg.alt = photo.alt;
    viewerImg.width = photo.width;
    viewerImg.height = photo.height;
    viewerCount.textContent = (index + 1) + " από " + photos.length;
    viewerCaption.textContent = photo.alt;
  }

  function openAt(photoIndex, trigger) {
    opener = trigger || document.activeElement;
    show(photoIndex);
    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    } else {
      dialog.setAttribute("open", "");
    }
    closeButton.focus();
  }

  function onKeydown(event) {
    if (!dialog.open) {
      return;
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      show(index + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      show(index - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      show(0);
    } else if (event.key === "End") {
      event.preventDefault();
      show(photos.length - 1);
    }
  }

  if (!gallery || !dialog || !viewerImg) {
    return;
  }

  if (!photos || photos.length !== 15 || !photos.every(validPhoto)) {
    showMessage("Η συλλογή δεν είναι διαθέσιμη.");
    return;
  }

  var hero = document.getElementById("hero-photo");
  var heroPhoto = null;
  photos.forEach(function (photo) {
    if (photo.file === portfolio.hero) {
      heroPhoto = photo;
    }
  });
  if (!hero || !heroPhoto || hero.getAttribute("src") !== srcFor(heroPhoto)) {
    console.error("Hero image does not match the photo manifest.");
  }

  renderGallery();

  prevButton.addEventListener("click", function () {
    show(index - 1);
  });
  nextButton.addEventListener("click", function () {
    show(index + 1);
  });
  closeButton.addEventListener("click", function () {
    dialog.close();
  });

  dialog.addEventListener("close", function () {
    var target = opener;
    opener = null;
    if (!target || typeof target.focus !== "function") {
      return;
    }
    /* After a click, the dialog's own focus restore runs in the same turn. */
    window.setTimeout(function () {
      target.focus();
    }, 0);
  });

  document.addEventListener("keydown", onKeydown);
})();
