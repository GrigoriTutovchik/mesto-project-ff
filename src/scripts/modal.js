export function openModal(item){
  item.classList.add('popup_is-animated','popup_is-opened');
  item.addEventListener('click', closeModalTarget);
  document.addEventListener('keydown', closeModalTarget);
}

export function closeModal(item) {
  item.classList.remove('popup_is-opened');
  item.removeEventListener('click', closeModalTarget);
  document.removeEventListener('keydown', closeModalTarget);
}

function closeModalTarget(evt) {
  if (evt.key === 'Escape' ){
    closeModal(document.querySelector('.popup_is-opened'))
  };
  if (evt.target === evt.currentTarget) {
    closeModal(document.querySelector('.popup_is-opened'));
  }
}