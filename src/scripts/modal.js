export function openModal(modal){
  modal.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleCloseByEsc);
}

export function closeModal(modal) {
  modal.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleCloseByEsc);
}

function handleCloseByOverlayClick(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(document.querySelector('.popup_is-opened'));
  }
}

function handleCloseByEsc(evt){
  if (evt.key === 'Escape' ){
    closeModal(document.querySelector('.popup_is-opened'))
  };
}

function handleCloseByBtn(evt) {
  if(evt.target.classList.contains('popup__close')) {
    closeModal(document.querySelector('.popup_is-opened'));
    }
}

export function setCloseModalByClickListeners(popupList) {
  popupList.forEach(popup => {
    const closeButton = popup.querySelector('.popup__close')
    closeButton.addEventListener('click', handleCloseByBtn)
    popup.addEventListener('click', handleCloseByOverlayClick)
  })
}
