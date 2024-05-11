import '../pages/index.css';
import { createCard,deleteCard,popupConfirmDelete,deletedCardId,deletedCard,likeCard} from './card';
import { openModal,closeModal, setCloseModalByClickListeners} from './modal';
import {clearValidation, enableValidation} from "./validation";
import { requestProfileInfo,getInitialCards,requestUpdateUserInfo,requestAddNewCard,requestDeleteCard,requestEditAvatar} from './api';

let userId=''

const cardContainers = document.querySelector('.places__list');
const allPopups = document.querySelectorAll('.popup');
//profile variable
const popupTypeEdit = document.querySelector('.popup_type_edit');
const formEditProfile = document.forms['edit-profile'];
const formEditName = formEditProfile.elements['name'];
const formEditeDescription = formEditProfile.elements['description'];
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const profileAddBtn = document.querySelector('.profile__add-button');
const profileAvatar = document.querySelector('.profile__image');
//add card variable
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const formNewPlace = document.forms['new-place'];
const cardNameInput = formNewPlace.elements['place-name'];
const cardLinkInput = formNewPlace.elements['link'];
const profileEditBtn = document.querySelector('.profile__edit-button');
//image variable
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const popupTypeImage = document.querySelector('.popup_type_image');
//avatar
const popupUpdateAvatar = document.querySelector('.popup_type_update_avatar');
const formUpdateAvatar = document.forms['update-avatar'];
const inputUpdateAvatar = formUpdateAvatar.elements['avatar-link'];
const profileImage = document.querySelector('.profile__image');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

enableValidation(validationConfig);

const functions = {
  deleteCard,
  likeCard,
  openImageModal
}

function renderCard(card, method = 'prepend') {
  const cardElem = createCard(card, functions, userId);
  cardContainers[method](cardElem);
}

function handleFormCard(cardContent) {
  renderCard(cardContent);
  closeModal(popupTypeNewCard);
}

function NewCardSubmit(evt) {
  function makeRequest() {
    return requestAddNewCard(cardNameInput.value, cardLinkInput.value)
    .then(cardData => handleFormCard(cardData));
  }
  handleSubmit(makeRequest, evt, 'Созданение...');
}

popupTypeNewCard.addEventListener('submit',NewCardSubmit);

function fillProfileFormInputs() {
  formEditName.value = profileName.textContent;
  formEditeDescription.value = profileJob.textContent;
}

function editFormSubmit(name,description) {
  profileName.textContent = name;
  profileJob.textContent = description;  
  closeModal(popupTypeEdit);
}

function profileFormSubmit(evt) {
  function makeRequest() {
    return requestUpdateUserInfo(formEditName.value, formEditeDescription.value)
    .then(userData => editFormSubmit(userData.name, userData.about));
  }
  handleSubmit(makeRequest, evt);
}

profileAddBtn.addEventListener('click', function() {
  openModal(popupTypeNewCard);
  clearValidation(formNewPlace, validationConfig);
  }
);

profileEditBtn.addEventListener('click', function() {
  openModal(popupTypeEdit);
  fillProfileFormInputs();
  clearValidation(formEditProfile, validationConfig);
  }
);

popupTypeEdit.addEventListener('submit', profileFormSubmit);

function openImageModal(link, title) {
  popupImage.src = link;
  popupImage.alt = title;
  popupCaption.textContent = title;
  openModal(popupTypeImage);
}

setCloseModalByClickListeners(allPopups);

function confirmDelete(evt) {
  function makeRequest() {
    return requestDeleteCard(deletedCardId)
    .then(() => {
      closeModal(popupConfirmDelete);
      deleteCard(deletedCard);
    });
  }
  handleSubmit(makeRequest, evt, 'Удаление...');
}

popupConfirmDelete.addEventListener('submit', confirmDelete);

function renderLoading(isLoading, button, buttonText='Сохранить', loadingText='Сохранение...') {
  if(isLoading) {
    button.textContent = loadingText;
  } else {
    button.textContent = buttonText;
  }
}

function handleSubmit(request, evt, loadingText='Сохранение...') {
  evt.preventDefault();
  const submitButton = evt.submitter;
  const initialText = submitButton.textContent;
  renderLoading(true, submitButton, initialText, loadingText);
  request()
  .then(() => evt.target.reset())
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  })
  .finally(() => renderLoading(false, submitButton, initialText));
}

function FormAvatar(link) {
  profileImage.style = `background-image: url('${link}')`
  closeModal(popupUpdateAvatar);
}

profileImage.addEventListener('click', () => {
  formUpdateAvatar.reset();
  clearValidation(formUpdateAvatar, validationConfig);
  openModal(popupUpdateAvatar);
});

function ProfileAvatarSubmit(evt) {
  function makeRequest() {
    return requestEditAvatar(inputUpdateAvatar.value)
    .then(userData => FormAvatar(userData.avatar))
  }
  handleSubmit(makeRequest, evt);
}

popupUpdateAvatar.addEventListener('submit', ProfileAvatarSubmit);

Promise.all([requestProfileInfo(), getInitialCards()])
.then(([cardContent, info]) => {
  profileAvatar.style = `background-image: url('${cardContent.avatar}')`
  profileName.textContent = cardContent.name;
  profileJob.textContent = cardContent.about;
  userId = cardContent._id;;
  info.forEach(info => {
    renderCard(info, 'append');
  });;
})
.catch((err) => {
  console.log(`Ошибка: ${err}`);
});
