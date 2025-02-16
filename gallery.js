const gallery = document.getElementById("gallery");

function createGallery(userImages) {
    /*Internal*/clearExistingGallery(gallery);/*Internal*/
    numRows = userRowsInput.value;

    for (let i = 0; i < numRows; i++) {
        const scroller = document.createElement("div");
        scroller.classList.add("scroller");
        /*Internal*/changeAnimationSpeed(scroller);/*Internal*/
        /*Internal*/reverseAnimationDirection(scroller);/*Internal*/

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
        /*Internal*/roundedCorners(img);/*Internal*/
        });
    });

    addAnimation();
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

            let j = 0;
            while (part.length < partSize) {
                part.push(arr[j]); // Duplicate the element from the start to fill the gaps
                j++;
            }

            parts.push(part);
        }

        return parts;
    }
}

function addAnimation() {
    scrollers.forEach((scroller) => {
      /*Internal*/checkUserPreferences(scroller);/*Internal*/

        scrollerInners.forEach((scrollerInner) => {
            const scrollerContent = Array.from(scrollerInner.children);
            scrollerContent.forEach((item) => {
                const duplicatedItem = item.cloneNode(true);
                duplicatedItem.setAttribute("aria-hidden", true);
                scrollerInner.appendChild(duplicatedItem);

          /*Internal*/roundedCorners(duplicatedItem);/*Internal*/
            });
        });
    });

    /*Internal*/imageElements = document.querySelectorAll("img");/*Internal*/

    /*Internal*/prepareGalleryCode();/*Internal*/
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

export { createGallery, divideArrayEqually, addAnimation, roundedCorners, reverseAnimationDirection, changeAnimationSpeed };