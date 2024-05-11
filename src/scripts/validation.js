const showInputError = (formElement, inputElement, errorMessage, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.classList.add(validationConfig.errorClass);
  errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  inputElement.setCustomValidity("");
  errorElement.textContent = '';
};

function isValid(formElement, inputElement, config) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(formElement,inputElement,inputElement.validationMessage,config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
}

const setEventListeners = (formElement, validationConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        isValid(formElement, inputElement, validationConfig);
        toggleButtonState(inputList, buttonElement, validationConfig);
      });
  });
};

export function enableValidation(validationConfig) {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach(formElement => {
      setEventListeners(formElement, validationConfig);
  })
}

export function clearValidation(formElement, validationConfig) {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  inputList.forEach(input => hideInputError(formElement, input, validationConfig));
  toggleButtonState(inputList, buttonElement, validationConfig);
}

function hasInvalidInput(inputList) {
  return inputList.some(inputElement => !inputElement.validity.valid);
}

function toggleButtonState(inputList, buttonElement, validationConfig) {
  if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(validationConfig.inactiveButtonClass);
  } else {
      buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  }
}
