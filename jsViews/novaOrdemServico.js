function limparCampos(){
    document.getElementById("inputDescricao").value = "";
    document.getElementById("inputCliente").value = "";
    document.getElementById("inputEndereco").value = "";
    document.getElementById("inputDocumento").value = "";
    document.getElementById("inputTelefone").value = "";
    document.getElementById("selectTecnico").selectedIndex = 0;
}

function limparAlert() {
    document.getElementById("alert").style.display = "none";
}

function abrirOS(){

    var db = firebase.database();
    
    var desc = document.getElementById("inputDescricao").value;
    var client = document.getElementById("inputCliente").value;
    var end = document.getElementById("inputEndereco").value;
    var doc = document.getElementById("inputDocumento").value;
    var tel = document.getElementById("inputTelefone").value;
    var item = document.getElementById("selectTecnico").value;
    var tecnico = item.substring(0,item.indexOf("@"));

    if(desc == "" || client == "" || end == "" || doc == "" || tel == "" || tecnico == ""){
        alert("Preencher todos os campos !!");
        if(client == ""){
            document.getElementById("inputCliente").focus();
        }else if(doc == ""){
            document.getElementById("inputDocumento").focus();
        }else if(end == ""){
            document.getElementById("inputEndereco").focus();
        }else if(tel == ""){
            document.getElementById("inputTelefone").focus();
        }else if(desc == ""){
            document.getElementById("inputDescricao").focus();
        }else if(tecnico == ""){
            document.getElementById("selectTecnico").focus();
        }
    }else{
        var k = db.ref("ordens_abertas").child(tecnico).push().key;
        
        var os = {
            descricao: desc,
            cliente: client,
            endereco: end,
            documento: doc,
            telefone: tel,
            hash: k
        }		
        
        db.ref("ordens_abertas").child(tecnico).child(k).set(os);
        limparCampos();
        document.getElementById("alert").style.display = "block";
    }
    
}

function carregarSelect(){
    firebase.database().ref('/usuarios').once('value', function (snapshot) {
        if (snapshot.exists()) {
          var content = `<select class="form-control" id="selectTecnico">
                         <option selected value="">Escolha...</option>`;
          snapshot.forEach(function (data) {
            var val = data.val();
            content += "<option value='"+val.email+"'>"+val.nome+"</option>";
          });
          content += '</select><br>';
          document.getElementById("select").innerHTML = content;
        }
    })
}