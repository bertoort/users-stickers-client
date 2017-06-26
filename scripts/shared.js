$.ajaxSetup({
  crossDomain: true,
  xhrFields: {
    withCredentials: true
  }
});

const API_URL = getHostURL();
const AUTH_URL = `${API_URL}/auth`

function getHostURL() {
  if (window.location.host.indexOf('localhost') != -1) {
    return 'http://localhost:3000';
  } else {
    return 'https://sticker-mania.herokuapp.com';
  }
}

function getUserFromForm(){
  const email = $('#email').val();
  const password = $('#password').val();

  const user = {
    email,
    password
  }
return user;
}

function showErrorMessage(message){
  const $errorMessage = $('#errorMessage')

  $errorMessage.text(message)
  $errorMessage.show()
}

function setIdRedirect(result){
  localStorage.user_id = result.id;
  window.location = `/user.html?id=${result.id}`
}


function redirectIfLoggedIn(){
  if(localStorage.user_id){
    window.location = `/user.html?id=${localStorage.user_id}`
  }
}

function logout(){
  localStorage.removeItem('user_id')
  $.get(`${AUTH_URL}/logout`)
    .then(result => {
      console.log(result);
      window.location = '/login.html'
    })
}
