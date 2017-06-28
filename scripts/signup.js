redirectIfLoggedIn()

$(()=>{
  $('form').submit((event)=>{
    event.preventDefault()
    const user = getUserFromForm();
    signup(user)
      .then(result=>{
        console.log(result);
        localStorage.token = result.token;
        setIdRedirect(result);
      }).catch(error =>{
        console.error(error)
          showErrorMessage(error.responseJSON.message)
      })
  });
})

function signup(user){
    return $.post(`${AUTH_URL}/signup`, user)
}
