$(".button-collapse").sideNav();

function logout(){
  firebase.auth().signOut().then(function() {
    sessionStorage.setItem('email', null );
    window.location.href = "login.html"; 
  })
}

async function verifica(){
  var email = JSON.parse(sessionStorage.getItem('email'));
  await firebase.database().ref('/usuarios').on('value', function (snapshot) {
    if (snapshot.exists()) {
      snapshot.forEach(function (data) {
        var val = data.val();
        if(val.email == email){
          if(val.tipo == 0){
            document.getElementById("usuarios").style.display ="none";
            document.getElementById("servicos").style.display ="none";
            document.getElementById("os").style.display ="none";
            document.getElementById("graficos").style.display ="none";
          }
        }
      });
    }
  });
}