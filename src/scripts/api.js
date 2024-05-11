const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-12",
  headers: {
    authorization: "44755965-02cd-41a2-a400-3000329a6475",
    "Content-Type": "application/json",
  },
};

export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status);
}

function requestToAPI(config, endpoint, options) {
  return fetch(`${config.baseUrl}/` + endpoint, options)
  .then(checkResponse)
}

export const requestProfileInfo = () => {
  return requestToAPI(config, 'users/me', {
    method: 'GET',
    headers: config.headers
  })
}

export const getInitialCards = () => {
 return requestToAPI(config, 'cards', {
    method: 'GET',
    headers: config.headers
  });
}

export const requestUpdateUserInfo = (name, value) => {
  return requestToAPI(config, 'users/me', {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
          name: name,
          about: value
        })
  });
}

export const requestAddNewCard = (name, link) => {
  return requestToAPI(config, 'cards', {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
          name: name,
          link: link
        })
  });
}

export const requestDeleteCard = (cardId) => {
  return requestToAPI(config, 'cards/' + cardId, {
    method: 'DELETE',
    headers: config.headers
  });
}

export const requestSendLike = (cardId) => {
  return requestToAPI(config, 'cards/likes/' + cardId, {
    method: 'PUT',
    headers: config.headers
  })
}

export const requestRemoveLike = (cardId) => {
  return requestToAPI(config, 'cards/likes/' + cardId, {
    method: 'DELETE',
    headers: config.headers
  })
}

export const requestEditAvatar = (value) => {
  return requestToAPI(config, 'users/me/avatar', {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: value
    })
  })
}
