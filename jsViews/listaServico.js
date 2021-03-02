function carregarTable(categoria) {

    firebase.database().ref('/servicos/'+categoria).on('value', function (snapshot) {
      if (snapshot.exists()) {
        var content = `<table class="table table-bordered table-hover">
      <thead class="thead-dark">
          <tr>
              <th>Descrição</th>
              <th>Preço</th>
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
          content += '<td>' + val.desc + '</td>';
          content += '<td>R$' + val.preco + '</td>';
          content += `<td><button type="button" data-toggle="modal" onclick="carregaServicos('` + val.desc + `','` + val.preco + `','`+ data.key +`')" data-target="#exampleModal" class="btn btn-primary" ><i class="far fa-eye"></i> Visualizar</button>            
                  <button type="button" data-toggle="modal" onclick="idExclusao('`+ data.key + `')"data-target="#exampleModal1" class="btn btn-danger"><i class="far fa-trash-alt"></i> Excluir</button>
              </td> `;
          content += '</tr>';
          content += '</tbody>';
        });
        content += '</table>';
        var mainModal = `<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
<div class="modal-dialog" role="document">
  <div class="modal-content">
    <div class="modal-header">
      <h3 class="modal-title" id="exampleModalLabel">Editar Serviço</h3>
      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
        <form autocomplete="off" id="formServico" method="POST">
        <div id="cursorblk">  
              <div>
                  <label>Serviço:</label>
                  <input type="text" id="inputServico" class="form-control" readonly="true"><br>
              </div>
              <div>
                  <label>Preço:</label>
                  <input type="text" id="inputPreco" class="form-control"  readonly="true"><br>
              </div>
              <input type="hidden" id="hashServico">
        </div>  
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-danger" onclick="btnCancel()" data-dismiss="modal"><i class="fas fa-ban"></i> Cancelar</button>
      <button type="button" id="btEdit" class="btn btn-warning" onclick="habiliteBotao()"><i class="fas fa-edit"></i> Editar</button>
      <button type="button" id="btn-save" style="cursor: not-allowed;"  onclick="updateServico('`+categoria+`')" data-dismiss="modal" class="btn btn-success" disabled><i class="fas fa-sync"></i> Salvar</button>
    </div>
  </div>
</div>
</div>     
          `;

        var modalExcluir = `<div class="modal fade" id="exampleModal1" tabindex="-1" role="dialog" aria-labelledby="exampleModal1Label" aria-hidden="true">
<div class="modal-dialog" role="document">
  <div class="modal-content">
    <div class="modal-header">
      <h3 class="modal-title" id="exampleModal1Label">Excluir Serviço</h3>
      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
       <h5>Deseja realmente excluir este serviço ?</h5>
       <input type="hidden" id="hashServico">
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-danger" data-dismiss="modal"><i class="fas fa-ban"></i> Cancelar</button>
      <button type="button" class="btn btn-success"data-dismiss="modal" onclick="deleteServico('`+categoria+`')"><i class="far fa-trash-alt"></i> Excluir</button>
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

function selectCombo(cat){
    carregarTable(cat);
}
  
function carregaServicos(serv, preco, hash) {
    document.getElementById("inputServico").value = serv;
    document.getElementById("inputPreco").value = preco;
    document.getElementById("hashServico").value = hash;

}

function habiliteBotao() {
    document.getElementById("cursorblk").style.cursor = "default";

    document.getElementById("btn-save").style.cursor = "default";
    document.getElementById("btn-save").disabled = false;
    document.getElementById("inputServico").readOnly = false;
    document.getElementById("inputPreco").readOnly = false;

}
function limparAlert() {
    document.getElementById("alert").style.display = "none";

}
function limparAlertDelete() {
    document.getElementById("alertDelete").style.display = "none";

}
function idExclusao(id) {
    document.getElementById("hashServico").value = id;
}

function deleteServico(categoria) {
    var id = document.getElementById("hashServico").value;
    var servico = firebase.database().ref("servicos/"+categoria+"/" + id);
    servico.remove();
    document.getElementById("alertDelete").style.display = "block";
}

function btnCancel() {
    document.getElementById("cursorblk").style.cursor = "not-allowed";
    document.getElementById("btn-save").style.cursor = "not-allowed";
    document.getElementById("btn-save").disabled = true;

    document.getElementById("inputServico").readOnly = true;
    document.getElementById("inputPreco").readOnly = true;
}
function updateServico(categoria) {

    var db = firebase.database();

    var serv = document.getElementById("inputServico").value;
    var prec = document.getElementById("inputPreco").value;
    var id = document.getElementById("hashServico").value;

    var servico = {
        desc: serv,
        preco: prec
    }

    db.ref("servicos").child(categoria).child(id).set(servico);
    document.getElementById("alert").style.display = "block";
}