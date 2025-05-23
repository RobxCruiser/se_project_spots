// TODO - pass settings object to the validation functions that are called in this file.

const initialCards = [
  {
    name: "San Francisco",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

// Edit profile
const profileEditButton = document.querySelector(".profile__edit-btn");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const allModals = document.querySelectorAll(".modal");
const editModal = document.querySelector("#edit-modal");
const editFormElement = editModal.querySelector("#modal-form");
const editModalCloseBtn = editModal.querySelector(".modal__close-btn");
const editModalNameInput = editModal.querySelector("#profile-name-input");
const editModalDescriptionInput = editModal.querySelector(
  "#profile-description-input"
);
// New Post Button
const newPostButton = document.querySelector(".profile__add-btn");
const addCardModal = document.querySelector("#add-card-modal");
const addCardFormElement = addCardModal.querySelector(".modal__form");
const cardSubmitButton = addCardModal.querySelector(".modal__button");
const addCardModalClose = addCardModal.querySelector(".modal__close-btn");
const addCardLink = addCardModal.querySelector("#add-card-link-input");
const addCardTitle = addCardModal.querySelector("#add-card-title-input");

const cardTemplate = document.querySelector("#card-template");
const cardList = document.querySelector(".cards__list");

// preview window
const previewModal = document.querySelector("#image-preview");
const previewImage = previewModal.querySelector(".modal__preview-image");
const previewTitle = previewModal.querySelector(".modal__preview-title");
const previewCloseButton = previewModal.querySelector(
  ".modal__preview-close-btn"
);

//overlay and escape handlers

let currentOverlayHandler;
let currentEscHandler;

function openModal(modal) {
  modal.classList.add("modal_opened");

  currentOverlayHandler = function (event) {
    if (event.target === event.currentTarget) {
      closeModal(modal);
    }
  };

  currentEscHandler = function (evt) {
    if (evt.key === "Escape") {
      closeModal(modal);
    }
  };

  modal.addEventListener("click", currentOverlayHandler);
  document.addEventListener("keydown", currentEscHandler);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  modal.removeEventListener("click", currentOverlayHandler);
  document.removeEventListener("keydown", currentEscHandler);
}

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardNameEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");

  cardNameEl.textContent = data.name;
  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;

  const cardLikeBtn = cardElement.querySelector(".card__like-btn");
  cardLikeBtn.addEventListener("click", function () {
    cardLikeBtn.classList.toggle("card__like-btn_active");
  });

  const cardDeleteBtn = cardElement.querySelector(".card__delete-button");
  cardDeleteBtn.addEventListener("click", function () {
    cardElement.remove();
  });

  cardImageEl.addEventListener("click", function () {
    previewImage.src = data.link;
    previewImage.alt = data.name;
    previewTitle.textContent = data.name;
    openModal(previewModal);
  });

  return cardElement;
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = editModalNameInput.value;
  profileDescription.textContent = editModalDescriptionInput.value;
  closeModal(editModal);
}

addCardFormElement.addEventListener("submit", function (evt) {
  evt.preventDefault();

  const inputValues = {
    name: addCardTitle.value,
    link: addCardLink.value,
  };
  const cardElement = getCardElement(inputValues);
  cardList.prepend(cardElement);
  disableButton(cardSubmitButton, settings);
  closeModal(addCardModal);

  addCardFormElement.reset();
});

newPostButton.addEventListener("click", function () {
  openModal(addCardModal);
});

profileEditButton.addEventListener("click", function () {
  editModalNameInput.value = profileName.textContent;
  editModalDescriptionInput.value = profileDescription.textContent;
  //optional
  resetValidation(
    editFormElement,
    [editModalNameInput, editModalDescriptionInput],
    settings
  );
  openModal(editModal);
});

editModalCloseBtn.addEventListener("click", function () {
  closeModal(editModal);
});

previewCloseButton.addEventListener("click", function () {
  closeModal(previewModal);
});

editFormElement.addEventListener("submit", handleEditFormSubmit);

addCardModalClose.addEventListener("click", function () {
  closeModal(addCardModal);
});

initialCards.forEach(function (item) {
  const cardElement = getCardElement(item);
  cardList.append(cardElement);
});
