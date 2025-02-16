let scrollers = null;
let scrollerInners = null;
let imageElements = null;
let numRows = 1;
let numImages = 0;
const userSubmitButton = document.getElementById("user-submit");
const userImagesInput = document.getElementById("user-images-input");
const userRowsInput = document.getElementById("user-rows-input");
const userRoundedSelect = document.getElementById("user-rounded-select");
const userReverseSelect = document.getElementById("user-reverse-select");
const userSlowdownSelect = document.getElementById("user-slowdown-select");
const errorAlert = document.getElementById("error-alert");
const errorAlertMessage = document.getElementById("error-alert-message");

// on submit button click, get images from file input and store in images array
userSubmitButton.addEventListener("click", function () {
  const files = userImagesInput.files;
  if (!files.length) {
    setErrorAlert("Please upload at least 1 image.");
    return;
  }  

  let userImages = [];
  let promises = [];

  for (let i = 0; i < files.length; i++) {
    let filePromise = new Promise((resolve, reject) => {
      const file = files[i];

      if (!file.type.startsWith("image/")) {
        setErrorAlert("Please upload only image files.");
        return;
      }
      const reader = new FileReader();

      reader.onload = function (e) {
        userImages.push(e.target.result);
        resolve();
      };

      reader.readAsDataURL(file);
    });

    promises.push(filePromise);
  }

  Promise.all(promises).then(() => {
    createGallery(userImages);
  });

  numRows = userRowsInput.value;
  numImages = userImages.length;

  userImagesInput.value = "";
  userRowsInput.value = 3;
});

userRoundedSelect.addEventListener("change", function () {
  if (!imageElements) {
    return;
  }

  imageElements.forEach((image) => {
    roundedCorners(image)
  });
});

userReverseSelect.addEventListener("change", function () {
  if (!scrollers) {
    return;
  }

  scrollers.forEach((scroller) => {
    reverseAnimationDirection(scroller);
  });
});

userSlowdownSelect.addEventListener("change", function () {
  if (!scrollers) {
    return;
  }

  scrollers.forEach((scroller) => {
    changeAnimationSpeed(scroller);
  });
});

userRowsInput.addEventListener("change", function () {
  numRows = userRowsInput.value;
});

function setErrorAlert(message) {
  errorAlert.classList.remove("hidden");
  errorAlertMessage.textContent = message;

  setTimeout(() => {
    errorAlert.classList.add("hidden");
    errorAlertMessage.textContent = "";
  }, 3000);
}

function createGallery(userImages) {
  clearExistingGallery();
  
  const gallery = document.getElementById("gallery");
  for (let i = 0; i < numRows; i++) {
    const scroller = document.createElement("div");
    scroller.classList.add("scroller");
    changeAnimationSpeed(scroller);
    reverseAnimationDirection(scroller);
    scroller.setAttribute("data-length", numImages);

    const scrollerInner = document.createElement("div");
    scrollerInner.classList.add("scroller__inner");

    scroller.appendChild(scrollerInner);
    gallery.appendChild(scroller);
  }

  scrollers = document.querySelectorAll(".scroller");
  scrollerInners = document.querySelectorAll(".scroller__inner");

  const dividedImages = divideArrayEqually(userImages, numRows);

  // for each scrollerInner, create img elements and append them to the scrollerInner
  scrollerInners.forEach((scrollerInner, index) => {
    let imagesArray;
    if (index < dividedImages.length) {
      imagesArray = dividedImages[index];
    } else {
      imagesArray = dividedImages[0];
    }

    imagesArray.forEach((image) => {
      const img = document.createElement("img");
      img.src = image;
      scrollerInner.appendChild(img);
      roundedCorners(img);
    });
  });

  addAnimation();
}

function roundedCorners(image) {
  if (userRoundedSelect.checked) {
    image.setAttribute("data-rounded", "true");
  } else {
    image.setAttribute("data-rounded", "false");
  }
}

function reverseAnimationDirection(scroller) {
  if (userReverseSelect.checked) {
    scroller.setAttribute("data-direction", "left");
  } else {
    scroller.setAttribute("data-direction", "right");
  }
}

function changeAnimationSpeed(scroller) {
  if (userSlowdownSelect.checked) {
    scroller.setAttribute("data-speed", "slow");
  } else {
    scroller.setAttribute("data-speed", "fast");
  }
}

function checkUserPreferences(scroller) {
  reverseAnimationDirection(scroller);
  changeAnimationSpeed(scroller);
}

function divideArrayEqually(arr, numRows) {
  let total = arr.length;
  if (total === 1) {
    return [arr];
  }

  let partSize = Math.ceil(total / numRows);
  let parts = [];

  if (partSize === 1) {
    // Repeat and alternate images
    for (let i = 0; i < numRows; i++) {
      let part = [];
      for (let j = 0; j < total; j++) {
        part.push(arr[j]);
      }

      if (i % 2 === 0) {
        part.reverse();
      }

      parts.push(part);
    }

    return parts;
  } else {
  
    for (let i = 0; i < numRows; i++) {
      let start = i * partSize;
      let end = start + partSize;
      let part = arr.slice(start, end);
  
      while (part.length < partSize) {
        part.push(arr[0]); // Duplicate the first element if needed
      }
  
      parts.push(part);
    }
  
    return parts;
  }
}

function addAnimation() {
  scrollers.forEach((scroller) => {
    checkUserPreferences(scroller);

    scrollerInners.forEach((scrollerInner) => {
      const scrollerContent = Array.from(scrollerInner.children);
      // For each item in the array, clone it
      // add aria-hidden to it
      // add it into the `.scroller-inner`
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        duplicatedItem.setAttribute("aria-hidden", true);
        scrollerInner.appendChild(duplicatedItem);

        roundedCorners(duplicatedItem);
      });
    });
  });

  imageElements = document.querySelectorAll("img");
}

function clearExistingGallery() {
  const gallery = document.getElementById("gallery");
  gallery.innerHTML = "";
}