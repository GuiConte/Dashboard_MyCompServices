var dt = new Array();
var lbl = ["Computador","Impressora","Rede","Especifico"];
var comp=0,imp=0,rede=0,esp=0;

async function gerarDados(){
  await firebase.database().ref('/ordem_serv').once('value', function (snapshot) {
    if (snapshot.exists()) {
      snapshot.forEach(function (data) {
        var val = data.val();
        comp += val.computador;
        imp += val.impressora;
        rede += val.rede;
        esp += val.especifico;
      });
    }
  });
  dt.push(comp);
  dt.push(imp);
  dt.push(rede);
  dt.push(esp);

  plot();
}


  function plot(){
    
    var ctxServicos = document.getElementById("chartServicos");
        
    var chartGraph = new Chart(ctxServicos,{
        type: 'pie',
        data: {
            labels: lbl,
            datasets: [{
                label: "Quantidade de visitas- por dia",
                data: dt,
                backgroundColor: ['red','blue','yellow','green']
            }]
        },
        options: {
          legend: {
              labels: {
                  fontColor: "white",
                  fontSize: 18
              }
          }
        }
    });

  }


  async function teste2(){
     gerarDados();
  }