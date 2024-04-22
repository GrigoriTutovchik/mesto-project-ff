// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: Функция создания карточки
export function createCard(cardContent,deleteHandler,onImageClick,likeCard) {
  const cardItem = cardTemplate.querySelector(".places__item").cloneNode(true);
  const cardDeleteBtn = cardItem.querySelector('.card__delete-button');
  const cardLikeBtn = cardItem.querySelector('.card__like-button');
  const cardImage = cardItem.querySelector('.card__image');
  const cardTitle = cardItem.querySelector('.card__title');
  cardTitle.textContent = cardContent.name;
  cardImage.src = cardContent.link;
  cardTitle.alt = cardContent.name;

  cardDeleteBtn.addEventListener("click", () => deleteHandler(cardItem));
  
  cardImage.addEventListener('click', function() {
    onImageClick(cardContent)
  });
  
  cardLikeBtn.addEventListener('click', function() {
    likeCard(cardLikeBtn)});
  
  return cardItem;
}

export function deleteCard(card) {
  card.remove()
} 
// @todo: Функция удаления карточки

export function likeCard(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
}
