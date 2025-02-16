const DEFAULT_NUM_ROWS = 3;

function setErrorAlert({ message, errorAlert, errorAlertMessage }) {
    errorAlert.classList.remove("hidden");
    errorAlertMessage.textContent = message;

    setTimeout(() => {
        errorAlert.classList.add("hidden");
        errorAlertMessage.textContent = "";
    }, 3000);
}

function resetForm({ ...elements }) {
    toggleFormInputs({ ...elements });

    const { userImagesInput, userRowsInput } = elements;
    userImagesInput.value = "";
    userRowsInput.value = DEFAULT_NUM_ROWS;
}

function toggleFormInputs({ galleryCreated = false, ...elements }) {
    const { createGalleryInput, userSubmitButton, userPreference, galleryCodeSection } = elements;

    if (galleryCreated) {
        createGalleryInput.classList.add("hidden");
        userSubmitButton.textContent = "Create another gallery";
        userPreference.classList.remove("hidden");
        userPreference.classList.add("flex");
        userPreference.classList.add("md:justify-between");
        userPreference.classList.add("md:flex-row");
        userPreference.classList.add("flex-col");
        galleryCodeSection.classList.remove("hidden");

    } else {
      createGalleryInput.classList.remove("hidden");
      userSubmitButton.textContent = "Create gallery";
      userPreference.classList.remove("flex");
      userPreference.classList.remove("md:justify-between");
      userPreference.classList.remove("md:flex-row");
      userPreference.classList.remove("flex-col");
      userPreference.classList.add("hidden");
      galleryCodeSection.classList.add("hidden");
    }
}

function clearExistingGallery(gallery) {
    gallery.innerHTML = "";
}


export { setErrorAlert, resetForm, toggleFormInputs, clearExistingGallery };