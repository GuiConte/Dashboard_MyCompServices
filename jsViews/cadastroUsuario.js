function limparCampos(){
    document.getElementById("inputNome").value = "";
    document.getElementById("inputEmail").value = "";
    document.getElementById("inputSenha").value = "";
    document.getElementById("inputConfSenha").value = "";
    document.getElementById("selectTipoUsuario").selectedIndex = 0;
}

function limparAlert() {
    document.getElementById("alert").style.display = "none";
}

async function cadastroUsuario(){
    var nomeUsuario = document.getElementById("inputNome").value;
    var tipoUsuario = document.getElementById("selectTipoUsuario").value;
    var emailUsuario = document.getElementById("inputEmail").value;
    var senhaUsuario= document.getElementById("inputSenha").value;
    var confsenhaUsuario= document.getElementById("inputConfSenha").value;


    if(nomeUsuario == "" || senhaUsuario == "" || confsenhaUsuario ==""){
        alert("Preencher todos os campos !!");
        if(nomeUsuario == ""){
            document.getElementById("inputNome").focus();
        }else if(senhaUsuario == ""){
            document.getElementById("inputSenha").focus();
        }else if(confsenhaUsuario == ""){
            document.getElementById("inputConfSenha").focus();
        }
    }else{
        if(senhaUsuario == confsenhaUsuario){
            await firebase.auth().createUserWithEmailAndPassword(emailUsuario, '$My)]lC!Z0F[1%9#P*').then(function(usuario) {
                var db = firebase.database();
                var k = db.ref("usuarios").push().key;
                var novoUsuario = {
                    nome: nomeUsuario,
                    tipo: tipoUsuario,
                    email: emailUsuario,
                    senha: senhaUsuario
                }		                
                db.ref("usuarios").child(k).set(novoUsuario);
                limparCampos();
                document.getElementById("alert").style.display = "block";

            }, function(error) {
                // Handle Errors here.
                var existe = false;
                if(error.code == "auth/email-already-in-use"){
                    verificaEmail(nomeUsuario,tipoUsuario,emailUsuario,senhaUsuario);
                }
            });

        }
        else{
            alert("As senhas digitadas não coincidem !!");
        }
    }

}

async function verificaEmail(nomeUsuario,tipoUsuario,emailUsuario,senhaUsuario){
    var control = false;
    await firebase.database().ref('/usuarios').once('value', function (snapshot) {
        if (snapshot.exists()) {
          snapshot.forEach(function (data) {
            var val = data.val();
            if(emailUsuario == val.email){
                control = true;
            }
          });
        }
    }).then(() =>{
        if(control == false){
            var db = firebase.database();
            var k = db.ref("usuarios").push().key;
            var novoUsuario = {
                nome: nomeUsuario,
                tipo: tipoUsuario,
                email: emailUsuario,
                senha: senhaUsuario
            }		                
            db.ref("usuarios").child(k).set(novoUsuario);
            limparCampos();
            document.getElementById("alert").style.display = "block";
        }
        else{
            alert('Já existe um usuario cadastrado nesse email !');
        }
    });
    
}

function gerarEmail(){
    var nomeUser = document.getElementById("inputNome").value;

    if(nomeUser != ""){
        nomeUser = nomeUser.replace(/á|à|ã|â|ä/, 'a');
        nomeUser = nomeUser.replace(/é|è|ê|ë/, 'e');
        nomeUser = nomeUser.replace(/í|ì|î|ï/, 'i');
        nomeUser = nomeUser.replace(/ó|ò|õ|ô|ö/, 'o');
        nomeUser = nomeUser.replace(/ú|ù|û|ü/, 'u');
        nomeUser = nomeUser.replace(/ç/, 'c');
        nomeUser = nomeUser.replace(/\.|\,/, '');
        //nomeUser = nomeUser.replace(/[^a-z0-9]/i, '.');
        nomeUser = nomeUser.replace(/_+/, '_'); 
        nomeUser = nomeUser.toLowerCase();
        nomeUser = nomeUser.split(' ');
         
        if(nomeUser.length > 1)
            document.getElementById("inputEmail").value = nomeUser[0]+"_"+nomeUser[(nomeUser.length-1)]+"@mycomp.com.br";
        else
            document.getElementById("inputEmail").value = nomeUser[0]+"@mycomp.com.br";
    }

}