$(document).ready(function () {
  // get user id from url query
  const params = parseQuery(window.location.search);
  // make a request to the server for the user information
  getUserInfo(params.id)
    .then(addUserInfoToPage)
    .then(getStickers)
    .then(addStickers)
    .catch(handleError);
  // show user information
  // make a request to server for the stickers for the user with that id
  // show user stickers
});

function parseQuery(query) {
  return query.substr(1).split('&').reduce((params, keyValue) => {
    const parts = keyValue.split('=');
    params[parts[0]] = parts[1];
    return params
  }, {});
}

function getUserInfo(id) {
  return $.get(`${API_URL}/user/${id}`)
}

function getStickers(id) {
  return $.get(`${API_URL}/user/${id}/sticker`)
}

function addUserInfoToPage(user) {
  let source = $("#user-template").html();
  let template = Handlebars.compile(source);
  let context = user;
  let html = template(context);
  $('.user').html(html);
  return user.id;
}

function addStickers(stickers) {
  let source = $("#sticker-template").html();
  let template = Handlebars.compile(source);
  let context = {stickers};
  // yay more variations!! abstraction rocks!
  // let context = {stickers: stickers};
  let html = template(context);
  $('.stickers').html(html);
}

function handleError(error) {
  window.location = '/login.html'
}
