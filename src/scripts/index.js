import '../pages/index.css';
import { initialCards } from './cards.js';
import { createCard,deleteCard,likeCard } from './card';
import { openModal,closeModal, setCloseModalByClickListeners} from './modal';

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

//create cards
function renderInitialCards() {
  initialCards.forEach(function(cardContent){
    cardContainers.append(createCard(cardContent,deleteCard,openImageModal,likeCard))
  })
}

renderInitialCards();

//Profile

function fillProfileFormInputs() {
  formEditName.value = profileName.textContent;
  formEditeDescription.value = profileJob.textContent;
}

function handleProfileEditFormSubmit(evt) {
  evt.preventDefault();
  const name = formEditName.value;
  const description = formEditeDescription.value;
  profileName.textContent = name;
  profileJob.textContent = description;  
  closeModal(popupTypeEdit);
}

//Add card

function createNewCard(name, link) {
  const newCard = createCard({name, link}, deleteCard,openImageModal,likeCard);
  cardContainers.prepend(newCard)
}

function handleFormCardSubmit(evt) {
  evt.preventDefault();
  const name = cardNameInput.value;
  const link = cardLinkInput.value;
  createNewCard(name, link)
  formNewPlace.reset();
  closeModal(popupTypeNewCard);
}

//Card img

function openImageModal({link, name}) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
  openModal(popupTypeImage);
} 

profileAddBtn.addEventListener('click', function() {
  openModal(popupTypeNewCard);
  }
);

profileEditBtn.addEventListener('click', function() {
  openModal(popupTypeEdit);
  fillProfileFormInputs();
  }
);

popupTypeEdit.addEventListener('submit', handleProfileEditFormSubmit);
popupTypeNewCard.addEventListener('submit',handleFormCardSubmit);
setCloseModalByClickListeners(allPopups);

