import { requestSendLike,requestRemoveLike } from "./api";
import { openModal } from "./modal";

export let deletedCardId
export let deletedCard
export const popupConfirmDelete = document.querySelector('.popup_type_confirm');
const cardTemplate = document.querySelector('#card-template').content;

export function createCard(cardContent, cardHandlers, userId) {
  const cardItem = cardTemplate.querySelector(".places__item").cloneNode(true);
  const cardDeleteBtn = cardItem.querySelector('.card__delete-button');
  const cardImage = cardItem.querySelector('.card__image');
  const cardTitle = cardItem.querySelector('.card__title');
  const cardLikeButton = cardItem.querySelector('.card__like-button');
  const cardLikes = cardItem.querySelector('.like-counter');
  const likeNumber = cardLikeButton.querySelector('.like-counter');
  const likeArray = cardContent.likes;
  cardLikes.textContent = cardContent.likes.length;

  likeArray.forEach(like => isLiked(like._id, userId, cardLikeButton));

  cardLikeButton.addEventListener('click', () => likeCard(cardLikeButton, cardContent._id, likeNumber));

  cardImage.src = cardContent.link;
  cardImage.alt = cardContent.name;
  cardTitle.textContent = cardContent.name;
  const ownerId = cardContent.owner._id;

  activateDeleteButton(ownerId, cardDeleteBtn, userId);

  cardDeleteBtn.addEventListener('click', (evt) => {
    deletedCardId = cardContent._id;
    deletedCard = evt.target.closest('.places__item');
    openModal(popupConfirmDelete);
  })
  
  cardImage.addEventListener('click', () => cardHandlers.openImageModal(cardContent.link, cardContent.name));

  return cardItem;
}

export function deleteCard(cardItem) {
  cardItem.remove();
}

function isLiked(likeId, userId, button) {
  if(likeId === userId){
    button.classList.add('card__like-button_is-active');
  }
}

export function likeCard(button, id, likeNumber) {
  if(button.classList.contains('card__like-button_is-active')) {
    requestRemoveLike(id)
      .then((res) => {
        button.classList.remove('card__like-button_is-active');
        likeNumber.textContent = res.likes.length;
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }
  else if(button.classList.contains('card__like-button')) {
    requestSendLike(id)
      .then(res => {
        button.classList.add('card__like-button_is-active');
        likeNumber.textContent = res.likes.length;
    })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }
}

function activateDeleteButton(ownerId, cardDeleteBtn, userId) {
  if(ownerId === userId){
    cardDeleteBtn.style.display = 'block'
  }
}



