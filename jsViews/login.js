async function login(){

  var control = false;
  var email = document.getElementById('email').value
  var password = document.getElementById('senha').value

  await firebase.database().ref('/usuarios').once('value', function (snapshot) {
    if (snapshot.exists()) {
      snapshot.forEach(function (data) {
        var val = data.val();
        if(email == val.email && password == val.senha){
            control = true;
        }
      });
    }
  }).then(() =>{
    if(control == true){
      firebase.auth().signInWithEmailAndPassword(email, '$My)]lC!Z0F[1%9#P*').catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode+"\n"+errorMessage);
      });
    
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          var email = JSON.stringify(user.email);
          sessionStorage.setItem('email', email );
          window.location.href = "index.html"; 
        } 
      });
    }else{
      alert('Usuario e/ou senha invalidos !');
    }
  });

}