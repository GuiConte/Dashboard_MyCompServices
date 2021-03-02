function carregarTable() {
    var mainModal='', modalExcluir='';
    firebase.database().ref('/ordem_serv').on('value', function (snapshot) {
      if (snapshot.exists()) {
        var content = `<table class="table table-bordered table-hover">
      <thead class="thead-dark">
          <tr>
              <th>Cliente</th>
              <th>Data</th>
              <th>Total</th>
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
          content += '<td>' + val.cliente.nome + '</td>';
          content += '<td>' + val.data + '</td>';
          content += '<td>' + val.total + '</td>';
          content += `<td><button type="button" data-toggle="modal" onclick="carregaOS('`+data.key+`','`+val.cliente.nome+`','`+val.data+`','`+val.horario+`','`+val.total+`')" data-target="#exampleModal" class="btn btn-primary" ><i class="far fa-eye"></i> Visualizar</button>            
                  <button type="button" data-toggle="modal" onclick="idExclusao('`+ data.key +`')"data-target="#exampleModal1" class="btn btn-danger"><i class="far fa-trash-alt"></i> Excluir</button>
              </td> `;
          content += '</tr>';
          content += '</tbody>';
        });
        content += '</table>';
        mainModal = `<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
<div class="modal-dialog" role="document">
  <div class="modal-content">
    <div class="modal-header">
      <h3 class="modal-title" id="exampleModalLabel">Informações da Ordem de Serviço<h3>
      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
        <form autocomplete="off" id="formServico" method="POST">
        <div id="cursorblk">  
              <div>
                  <label>Cliente:</label>
                  <input type="text" id="inputCliente" class="form-control" readonly="true"><br>
              </div>
              <div>
                  <label>Data:</label>
                  <input type="text" id="inputData" class="form-control"  readonly="true"><br>
              </div>
              <div>
                  <label>Total:</label>
                  <input type="text" id="inputTotal" class="form-control"  readonly="true"><br>
              </div>
              <label>Equipamentos:</label>
              <div id="TesteModal">
                  
              </div>
              <input type="hidden" id="hashUsuario">
              <input type="hidden" id="uidUsuario">
        </div>  
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-danger" onclick="btnCancel()" data-dismiss="modal"><i class="fas fa-ban"></i> Fechar</button>
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
       <h5>Deseja realmente excluir esta OS ?</h5>
       <input type="hidden" id="hashOS">
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-danger" data-dismiss="modal"><i class="fas fa-ban"></i> Cancelar</button>
      <button type="button" class="btn btn-success"data-dismiss="modal" onclick="deleteOS()"><i class="far fa-trash-alt"></i> Excluir</button>
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
  
function carregaOS(index,nome,data,horario,total) {
    document.getElementById("inputCliente").value = nome;
    document.getElementById("inputData").value = data + " - " + horario;
    document.getElementById("inputTotal").value = total;
    var aux = "";
    var i=0;
    firebase.database().ref('/ordem_serv/'+index+'/servicos').once('value', function (snapshot) {
        if (snapshot.exists()) {
            snapshot.forEach(function (data) {
                aux += `<button type="button" class="accordion" onclick="openService(`+i+`);">`+data.key+`</button>`
                aux += `<div id="service`+i+`" class="card bg-light mb-3"" style="display:none;">
                        <div class="card-body">`
                firebase.database().ref('/ordem_serv/'+index+'/servicos').child(data.key).once('value', function (snapshot) {
                    if (snapshot.exists()) {
                        snapshot.forEach(function (data) {
                            var val = data.val()
                            if(data.key != 'categ')
                              aux += data.key+': R$'+val+`<br>`
                                    
                          });
                        }
                });
                aux += `</div></div>`
                i++;
                
              });
            }
    });
    document.getElementById("TesteModal").innerHTML = aux;
}

function openService(i){
    if(document.getElementById("service"+i).style.display == "block")
        document.getElementById("service"+i).style.display ="none";
    else
        document.getElementById("service"+i).style.display ="block";
}

function limparAlert() {
    document.getElementById("alert").style.display = "none";

}
function limparAlertDelete() {
    document.getElementById("alertDelete").style.display = "none";

}
function idExclusao(id) {
    document.getElementById("hashOS").value = id;
}

function deleteOS() {
    var id = document.getElementById("hashOS").value;
    var os = firebase.database().ref("/ordem_serv/" + id);
    os.remove();
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