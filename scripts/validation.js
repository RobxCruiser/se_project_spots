const showInputError(formEl, inputEl, errorMsg){
  const errorMsgID = inputEl.id + "-error";
  const errorMsgEl = formEl.querySelector("#" + errorMsgID);
  errorMsgEl.textContent = errorMsg
  inputEl.classList.add("modal__input_state_error");
}

const showInputError(formEl, inputEl){
  const errorMsgEl = formEl.querySelector("#" + errorMsgID);
  errorMsgEl.textContent = "";
  inputEl.classList.remove("modal__input_state_error");
}


const checkInputValidity = (formEl, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage);
  } else {
    hideInputError(formEl, inputEl);
  }
};

const hasInvalidInput = (inputList) => {
return inputList.some((input) => {
  return !input.validity.valid;
})
}

const toggleButtonState = (inputList, buttonEl) => {
if (hasInvalidInput(inputList)){
disableButton(buttonEl)
}else{
  buttonEl.disabled = false;
  // todo --Remove the disabled class
}
}

const disableButton = (buttonEl) =>{
buttonEl.disabled = true;
// todo -- add a modifier class to the button Element to make it gray.
//Dont forget the CSS
}

//Optional
const resetValidation = (formEl, inputList) => {
inputList.forEach((input) => {
  hideInputError(formEl, input)
});
disableButton()
};

const setEventListeners = (formEl) => {
  const inputList = Array.from(formEl.querySelectorAll(".modal__input"));
  const buttonElement = formEl.querySelector(".modal__button");

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formEl, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = document.querySelectorAll(".modal__form");
  formList.forEach((formEl) => {
    setEventListeners(formEl);
  });
};

enableValidation();
