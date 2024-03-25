// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const cardContainer = document.querySelector('.places__list');
// @todo: Функция создания карточки
function createCard(cardContent,deleteHandler) {
  const cardItem = cardTemplate.querySelector(".places__item").cloneNode(true);
  const cardButton = cardItem.querySelector('.card__delete-button');
  cardItem.querySelector('.card__title').textContent = cardContent.name;
  cardItem.querySelector('.card__image').src = cardContent.link;
  cardItem.querySelector('.card__image').alt = cardContent.name;
  cardButton.addEventListener("click", function(element){
    deleteHandler(element)
  });
  return cardItem;
}

// @todo: Функция удаления карточки
 function cardDelete(item) {
  item.target.closest('.places__item').remove();
}

// @todo: Вывести карточки на страницу
function createCards() {
  initialCards.forEach(function(cardContent){
    cardContainer.append(createCard(cardContent,cardDelete))
  })
}

createCards();