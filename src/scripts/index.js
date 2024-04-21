import '../pages/index.css';
import { initialCards } from './cards.js';
import { createCard,deleteCard,likeCard } from './card';
import { openModal,closeModal } from './modal';

const cardContainer = document.querySelector('.places__list');
//profile variable
const popupTypeEdit = document.querySelector('.popup_type_edit');
const formElement = document.forms['edit-profile'];
const formEditName = formElement.elements['name'];
const formEditeDescription = formElement.elements['description'];
const nameInput = document.querySelector('.profile__title');
const jobInput = document.querySelector('.profile__description');
const profileAddBtn = document.querySelector('.profile__add-button');
//add card variable
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const formNewPlace = document.forms['new-place'];
const CardName = formNewPlace.elements['place-name'];
const CardLink = formNewPlace.elements['link'];
const profileEditBtn = document.querySelector('.profile__edit-button');
//image variable
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const popupTypeImage = document.querySelector('.popup_type_image');

//create cards
function createCards() {
  initialCards.forEach(function(cardContent){
    cardContainer.append(createCard(cardContent,deleteCard,openedImageModal,likeCard))
  })
}
createCards();

//Profile

function EditValue() {
  formEditName.value = nameInput.textContent;
  formEditeDescription.value = jobInput.textContent;
}

function handleFormEdit(evt) {
  evt.preventDefault();
  const name = formEditName.value;
  const description = formEditeDescription.value;
  nameInput.textContent = name;
  jobInput.textContent = description;  
  closeModal(popupTypeEdit);
}

popupTypeEdit.addEventListener('submit', handleFormEdit);

profileEditBtn.addEventListener('click', function() {
  openModal(popupTypeEdit);
  EditValue();
  }
);

popupTypeEdit.addEventListener("click", function(evt){
  if(evt.target.classList.contains('popup__close')) {
    closeModal(popupTypeEdit);
    }
});

//Add card

function createNewCard(name, link) {
  const cardContent = {};
  cardContent.name = name;
  cardContent.link = link;
  const newCard = createCard(cardContent, deleteCard,openedImageModal,likeCard);
  cardContainer.prepend(newCard)
  return newCard;
}

function handleFormCard(evt) {
  evt.preventDefault();
  const name = CardName.value;
  const link = CardLink.value;
  createNewCard(name, link)
  formNewPlace.reset();
  closeModal(popupTypeNewCard);
}

popupTypeNewCard.addEventListener('submit',handleFormCard);

profileAddBtn.addEventListener('click', function() {
  openModal(popupTypeNewCard);
  }
);

popupTypeNewCard.addEventListener("click", function(evt){
  if(evt.target.classList.contains('popup__close')) {
    closeModal(popupTypeNewCard);
    }
});

//Card img

function openedImageModal(image, title) {
  const CardLink = image.src;
  const CardAlt = image.alt;
  popupImage.src = CardLink;
  popupImage.alt = CardAlt;
  popupCaption.textContent = title.textContent;
  openModal(popupTypeImage);
}

popupTypeImage.addEventListener("click", function(evt){
  if(evt.target.classList.contains('popup__close')) {
    closeModal(popupTypeImage);
    }
});




    