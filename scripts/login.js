redirectIfLoggedIn();

$(()=> {
  $('form').submit((event)=>{
    event.preventDefault();
    const user = getUserFromForm();
    login(user)
      .then(result => {
        setIdRedirect(result);
      })
      .catch(error=> {
        showErrorMessage(error.responseJSON.message)
      })

  })
})

function login(user){
  return $.post(`${AUTH_URL}/login`, user)
}
