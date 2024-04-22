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
    closeModal(evt.target);
  }
}

function handleCloseByEsc(evt){
  if (evt.key === 'Escape' ){
    closeModal(document.querySelector('.popup_is-opened'))
  };
}

function handleCloseByBtn(evt) {
  closeModal(evt.target.closest('.popup_is-opened'));
}

export function setCloseModalByClickListeners(popupList) {
  popupList.forEach(popup => {
    const closeButton = popup.querySelector('.popup__close')
    closeButton.addEventListener('click', handleCloseByBtn)
    popup.addEventListener('click', handleCloseByOverlayClick)
  })
}
