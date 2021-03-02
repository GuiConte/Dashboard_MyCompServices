function carregarTable() {
    var mainModal='', modalExcluir='';
    firebase.database().ref('/usuarios').on('value', function (snapshot) {
      if (snapshot.exists()) {
        var content = `<table class="table table-bordered table-hover">
      <thead class="thead-dark">
          <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Ações</th>
          </tr>
      </thead>
      <tbody>
      <div id="alert">
              <div class="alert alert-success alert-dismissible fade show" role="alert">
                  <strong>Atualizado com sucesso!</strong>
                  <button type="button" class="close"  onclick="limparAlert()">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
          </div>
          <div id="alertDelete">
              <div class="alert alert-danger alert-dismissible fade show" role="alert">
                  <strong>Deletado com sucesso!</strong>
                  <button type="button" class="close"  onclick="limparAlertDelete()">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
          </div>`;
        snapshot.forEach(function (data) {
          var val = data.val();
          content += '<tr style="background-color: white;">';
          content += '<td>' + val.nome + '</td>';
          content += '<td>' + val.email + '</td>';
          content += `<td><button type="button" data-toggle="modal" onclick="carregaUsuario('` + val.nome + `','` + val.email + `','`+ val.senha + `','`+ val.tipo + `','`+ val.uid + `','`+ data.key +`')" data-target="#exampleModal" class="btn btn-primary" ><i class="far fa-eye"></i> Visualizar</button>            
                  <button type="button" data-toggle="modal" onclick="idExclusao('`+ data.key + `','` + val.email + `','`+ val.senha+ `')"data-target="#exampleModal1" class="btn btn-danger"><i class="far fa-trash-alt"></i> Excluir</button>
              </td> `;
          content += '</tr>';
          content += '</tbody>';
        });
        content += '</table>';
        mainModal = `<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
<div class="modal-dialog" role="document">
  <div class="modal-content">
    <div class="modal-header">
      <h3 class="modal-title" id="exampleModalLabel">Informações do Usuario<h3>
      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
        <form autocomplete="off" id="formServico" method="POST">
        <div id="cursorblk">  
              <div>
                  <label>Nome:</label>
                  <input type="text" id="inputNome" class="form-control" readonly="true"><br>
              </div>
              <div>
                  <label>Email:</label>
                  <input type="text" id="inputEmail" class="form-control"  readonly="true"><br>
              </div>
              <div>
                  <label>Senha:</label>
                  <input type="password" id="inputSenha" class="form-control"  readonly="true"><br>
              </div>
              <div>
                  <label>Tipo:</label>
                  <select class="form-control" id="selectTipoUsuario" disabled>
                    <option value="0" selected>Padrão</option>
                    <option value="1">Administrador</option>
                  </select><br><br>
              </div>
              <input type="hidden" id="hashUsuario">
              <input type="hidden" id="uidUsuario">
        </div>  
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-danger" onclick="btnCancel()" data-dismiss="modal"><i class="fas fa-ban"></i> Fechar</button>
      <button type="button" id="btEdit" class="btn btn-warning" onclick="habiliteBotao()"><i class="fas fa-edit"></i> Editar</button>
      <button type="button" id="btn-save" style="cursor: not-allowed;"  onclick="updateUser('')" data-dismiss="modal" class="btn btn-success" disabled><i class="fas fa-sync"></i> Salvar</button>
    </div>
  </div>
</div>
</div>     
          `;

         modalExcluir = `<div class="modal fade" id="exampleModal1" tabindex="-1" role="dialog" aria-labelledby="exampleModal1Label" aria-hidden="true">
<div class="modal-dialog" role="document">
  <div class="modal-content">
    <div class="modal-header">
      <h3 class="modal-title" id="exampleModal1Label">Excluir Usuario</h3>
      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
       <h5>Deseja realmente excluir este usuario ?</h5>
       <input type="hidden" id="hashUsuario">
       <input type="hidden" id="inputDelEmail">
       <input type="hidden" id="inputDelSenha">
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-danger" data-dismiss="modal"><i class="fas fa-ban"></i> Cancelar</button>
      <button type="button" class="btn btn-success"data-dismiss="modal" onclick="deleteUsuario()"><i class="far fa-trash-alt"></i> Excluir</button>
    </div>
  </div>
</div>
</div>     
          `;

        document.getElementById("table").innerHTML = content;

        document.getElementById("mainModal").innerHTML = mainModal;
        document.getElementById("modalExcluir").innerHTML = modalExcluir;
      }
    });

  }
  
function carregaUsuario(nome, email, senha, tipo, uid, hash) {
    document.getElementById("inputNome").value = nome;
    document.getElementById("inputEmail").value = email;
    document.getElementById("inputSenha").value = senha;
    document.getElementById("selectTipoUsuario").selectedIndex = tipo;
    document.getElementById("uidUsuario").value = uid;
    document.getElementById("hashUsuario").value = hash;

}

function limparAlert() {
    document.getElementById("alert").style.display = "none";

}
function limparAlertDelete() {
    document.getElementById("alertDelete").style.display = "none";

}
function idExclusao(id,email,senha) {
    document.getElementById("hashUsuario").value = id;
    document.getElementById("inputDelEmail").value = email;
    document.getElementById("inputDelSenha").value = senha;
}

function deleteUsuario() {
    email = document.getElementById("inputDelEmail").value;
    senha = document.getElementById("inputDelSenha").value;
    var id = document.getElementById("hashUsuario").value;
    var usuario = firebase.database().ref("/usuarios/" + id);
    usuario.remove();
    document.getElementById("alertDelete").style.display = "block";
}

function btnCancel() {
    document.getElementById("cursorblk").style.cursor = "not-allowed";
    document.getElementById("btn-save").style.cursor = "not-allowed";
    document.getElementById("btn-save").disabled = true;
    document.getElementById("inputNome").readOnly = true;
    document.getElementById("inputEmail").readOnly = true;
    document.getElementById("inputSenha").readOnly = true;
    document.getElementById("selectTipoUsuario").disabled = true;
}

function updateUser(){
  var db = firebase.database();
  var nomeUsuario = document.getElementById("inputNome").value;
  var tipoUsuario = document.getElementById("selectTipoUsuario").value;
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

function habiliteBotao() {
  document.getElementById("cursorblk").style.cursor = "default";

  document.getElementById("btn-save").style.cursor = "default";
  document.getElementById("btn-save").disabled = false;
  document.getElementById("inputNome").readOnly = false;
  document.getElementById("inputSenha").readOnly = false;
  document.getElementById("selectTipoUsuario").disabled = false;

}