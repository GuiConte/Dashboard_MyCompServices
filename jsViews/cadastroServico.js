function limparCampos(){
    document.getElementById("inputServico").value = "";
    document.getElementById("inputPreco").value = "";
    document.getElementById("selectCategoria").selectedIndex = 0;
}

function limparAlert() {
    document.getElementById("alert").style.display = "none";
}

function cadastroServico(){

    var db = firebase.database();
    
    var servico = document.getElementById("inputServico").value;
    var precoServ = document.getElementById("inputPreco").value;
    var categoria = document.getElementById("selectCategoria").value;

    if(servico == "" || precoServ == "" || categoria == ""){
        alert("Preencher todos os campos !!");
        if(servico == ""){
            document.getElementById("inputServico").focus();
        }else if(precoServ == ""){
            document.getElementById("inputPreco").focus();
        }else if(categoria == ""){
            document.getElementById("selectCategoria").focus();
        }
    }else{
        var k = db.ref("servicos").child(categoria).push().key;
        
        var novoServico = {
            desc: servico,
            preco: precoServ
        }		
        
        db.ref("servicos").child(categoria).child(k).set(novoServico);
        limparCampos();
        document.getElementById("alert").style.display = "block";
    }
    
}