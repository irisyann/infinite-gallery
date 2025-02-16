const galleryCodeHtml = document.getElementById("gallery-code-html");
const galleryCodeCss = document.getElementById("gallery-code-css");
const galleryCodeJs = document.getElementById("gallery-code-js");

function prepareGalleryCode({ ...params }) {
    const { userRoundedSelect, userReverseSelect, userSlowdownSelect, createGalleryFunction, divideArrayEquallyFunction, addAnimationFunction, galleryCodeSection } = params;
    const galleryCodeJsText = processGalleryJsCode({ createGalleryFunction, divideArrayEquallyFunction, addAnimationFunction });
  
    const galleryCodeHtmlText = 
`
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Infinite Horizontal Gallery</title>
            <link rel="stylesheet" href="output.css">
        </head>

        <body>
            <div id="gallery"></div>
            <script src="script.js" type="module"></script>
        </body>
    </html>`

    const galleryCodeCssText = 
`
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
  
function processGalleryJsCode({ createGalleryFunction, divideArrayEquallyFunction, addAnimationFunction }) {
    const galleryCodeJsText = 
`  const images = [ /* Add your image paths here */ ];

    let scrollers = null;
    let scrollerInners = null;
    let numRows = 1;
    const userRowsInput = document.getElementById("user-rows-input");
    const userRoundedSelect = document.getElementById("user-rounded-select");
    const userReverseSelect = document.getElementById("user-reverse-select");
    const userSlowdownSelect = document.getElementById("user-slowdown-select");
    const gallery = document.getElementById("gallery");

    createGallery(images);

    ${createGalleryFunction}
    ${divideArrayEquallyFunction}
    ${addAnimationFunction}`
  
    // Remove any line wrapped with /*Internal*/
    const galleryCodeJsTextCleaned = galleryCodeJsText.replace(/\/\*Internal\*\/.*?\/\*Internal\*\//gs, "");
    return galleryCodeJsTextCleaned;
}

export { prepareGalleryCode };
