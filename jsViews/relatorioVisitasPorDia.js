var qtd = new Object();
var valor = new Object();
var lbl = new Array();
var dtQuantidade = new Array();
var dtValor = new Array();

async function gerarDados(){

await firebase.database().ref('/ordem_serv').orderByChild('data').once('value', function (snapshot) {
    if (snapshot.exists()) {
      snapshot.forEach(function (data) {
        var val = data.val();
        if(qtd["'"+val.data+"'"] == null){
            qtd["'"+val.data+"'"] = 0;
        }
        qtd["'"+val.data+"'"] += 1; 
      });
    for (var dia in qtd) {
        if (qtd.hasOwnProperty(dia)) {
            lbl.push(dia);
            dtQuantidade.push(qtd[dia]);
        }
    }
    }
  });

  await firebase.database().ref('/ordem_serv').orderByChild('data').once('value', function (snapshot) {
    if (snapshot.exists()) {
      snapshot.forEach(function (data) {
        var val = data.val();
        if(valor["'"+val.data+"'"] == null){
            valor["'"+val.data+"'"] = 0;
        }
        valor["'"+val.data+"'"] += val.total; 
      });
    for (var dia in valor) {
        if (valor.hasOwnProperty(dia)) {
            dtValor.push(valor[dia]);
        }
    }
    }
  });

  plot();
}

  function plot(){
    var ctxQtd = document.getElementById("chartQuantidade");
    var ctxValor = document.getElementById("chartValor");
        
    var chartGraph = new Chart(ctxQtd,{
        type: 'line',
        data: {
            labels: lbl,
            datasets: [{
                label: "Quantidade de visitas- por dia",
                data: dtQuantidade,
                borderWidth: 3,
                borderColor: 'rgba(77,166,253,0.85)',
                backgroundColor: 'rgba(77,166,253,0.85)',
                lineTension: 0
            }]
        },
        options: {
            legend: {
                labels: {
                    fontColor: "white",
                    fontSize: 18
                }
            },
            scales:{
                yAxes:[{
                    ticks:{
                        fontColor: "white",
                        fontSize: 15,
                        beginAtZero: true,
                        stepSize:2
                    }
                }],
                xAxes: [{
                    ticks: {
                        fontColor: "white",
                        fontSize: 14
                    }
                }]
            }
        }
    });

    var chartGraph = new Chart(ctxValor,{
        type: 'line',
        data: {
            labels: lbl,
            datasets: [{
                label: "Valor arrecadado com visitas- por dia",
                data: dtValor,
                borderWidth: 3,
                borderColor: 'rgba(15,148,6,0.85)',
                backgroundColor: 'rgba(15,148,6,0.85)',
                lineTension: 0
            }]
        },
        options: {
            legend: {
                labels: {
                    fontColor: "white",
                    fontSize: 18
                }
            },
            scales:{
                yAxes:[{
                    ticks:{
                        fontColor: "white",
                        fontSize: 15,
                        beginAtZero: true,
                        stepSize:40
                    }
                }],
                xAxes: [{
                    ticks: {
                        fontColor: "white",
                        fontSize: 14
                    }
                }]
            }
        }
    })

  }

