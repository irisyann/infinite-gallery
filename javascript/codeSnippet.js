const galleryCodeHtml = document.getElementById("gallery-code-html");
const galleryCodeCss = document.getElementById("gallery-code-css");
const galleryCodeJs = document.getElementById("gallery-code-js");

function prepareGalleryCode({ ...params }) {
    const { userRoundedSelect, userReverseSelect, userSlowdownSelect, galleryCodeSection, numRows } = params;
    const galleryCodeJsText = processGalleryJsCode(numRows);
  
    const galleryCodeHtmlText = 
`  <!-- index.html -->

    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Infinite Horizontal Gallery</title>
            <link rel="stylesheet" href="styles.css">
        </head>

        <body>
            <div id="gallery"></div>
            <script src="script.js" type="module"></script>
        </body>
    </html>`

    const galleryCodeCssText = 
`  /* styles.css */

    .scroller {
        max-width: 800px;
    }

    .scroller__inner {
        padding-block: 1rem;
        display: flex;
        flex-wrap: nowrap;
        gap: 1rem;
    }

    img {
        width: 150px;
        height: 150px;
        ${userRoundedSelect.checked ? "border-radius: 50%;": ""}
    }

    .scroller {
        overflow: hidden;
        -webkit-mask: linear-gradient(90deg,
            transparent,
            white 20%,
            white 80%,
            transparent);
        mask: linear-gradient(90deg, transparent, white 20%, white 80%, transparent);
    }

    .scroller .scroller__inner {
        width: max-content;
        animation: scroll ${userSlowdownSelect.checked ? "60s": "20s"} ${userReverseSelect.checked ? "reverse": "forwards"} linear infinite;
    }

    @keyframes scroll {
        to {
            transform: translate(calc(-50% - 0.5rem));
        }
    }`;
  
    galleryCodeJs.textContent = galleryCodeJsText;
    galleryCodeHtml.textContent = galleryCodeHtmlText;
    galleryCodeCss.textContent = galleryCodeCssText;

    galleryCodeSection.classList.remove("hidden");
}
  
function processGalleryJsCode(numRows) {
    const galleryCodeJsText = 
`  // script.js

    const images = [ /* Add your image paths here */ ];

    let scrollers = null;
    let scrollerInners = null;
    let numRows = ${numRows};
    const gallery = document.getElementById("gallery");

    createGallery(images);

    function createGallery(images) {
        for (let i = 0; i < numRows; i++) {
            const scroller = document.createElement("div");
            scroller.classList.add("scroller");
            
            const scrollerInner = document.createElement("div");
            scrollerInner.classList.add("scroller__inner");

            scroller.appendChild(scrollerInner);
            gallery.appendChild(scroller);
        }

        scrollers = document.querySelectorAll(".scroller");
        scrollerInners = document.querySelectorAll(".scroller__inner");

        const dividedImages = divideArrayEqually(images, numRows);

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
            scrollerInners.forEach((scrollerInner) => {
                const scrollerContent = Array.from(scrollerInner.children);
                scrollerContent.forEach((item) => {
                    const duplicatedItem = item.cloneNode(true);
                    duplicatedItem.setAttribute("aria-hidden", true);
                    scrollerInner.appendChild(duplicatedItem);
                });
            });
        });
    }
`
    return galleryCodeJsText;
}

export { prepareGalleryCode };
