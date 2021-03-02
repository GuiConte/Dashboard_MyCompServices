async function carregarUsuario(){
  var email = JSON.parse(sessionStorage.getItem('email'));

  await firebase.database().ref('/usuarios').once('value', function (snapshot) {
    if (snapshot.exists()) {
      snapshot.forEach(function (data) {
        var val = data.val();
        if(email == val.email){
          document.getElementById("inputNome").value = val.nome;
          document.getElementById("inputEmail").value = val.email;
          document.getElementById("inputSenha").value = val.senha;
          document.getElementById("tipoUsuario").value = val.tipo;
          document.getElementById("hashUsuario").value = data.key;
        }
      });
    }
  });
  document.getElementById("inputEmail").readOnly = true;
}

function updateUser(){
  var db = firebase.database();
  var nomeUsuario = document.getElementById("inputNome").value;
  var tipoUsuario = document.getElementById("tipoUsuario").value;
  var emailUsuario = document.getElementById("inputEmail").value;
  var senhaUsuario= document.getElementById("inputSenha").value;
  var id = document.getElementById("hashUsuario").value;

  var usuario = {
      nome: nomeUsuario,
      email: emailUsuario,
      senha: senhaUsuario,
      tipo: tipoUsuario
  }

  db.ref("usuarios").child(id).set(usuario);
  document.getElementById("alert").style.display = "block";
}

function limparAlert() {
  document.getElementById("alert").style.display = "none";

}