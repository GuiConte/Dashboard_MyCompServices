var qtd = new Object();
var lbl = new Array();
var dt = new Array();

async function gerarDados(){

await firebase.database().ref('/ordem_serv').once('value', function (snapshot) {
    if (snapshot.exists()) {
      snapshot.forEach(function (data) {
        var val = data.val();
        if(qtd["'"+val.cliente.nome+"'"] == null){
            qtd["'"+val.cliente.nome+"'"] = 0;
        }
        qtd["'"+val.cliente.nome+"'"] += 1; 
      });
    for (var cliente in qtd) {
        if (qtd.hasOwnProperty(cliente)) {
            dt.push(qtd[cliente]);
        }
    }
    }
  });

  lbl = Object.keys(qtd).sort(function(a,b){return qtd[a]-qtd[b]}).reverse()
  dt.sort().reverse();

  plot();
}

  function plot(){
    var ctxCliente1 = document.getElementById("chartCliente1");
    var ctxCliente2 = document.getElementById("chartCliente2");
        
    var chartGraph = new Chart(ctxCliente1,{
        type: 'bar',
        data: {
            labels: lbl.slice(0,5),
            datasets: [{
                label: "Clientes mais frequentes",
                data: dt.slice(0,5),
                backgroundColor: ['red','blue','yellow','green','orange']
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
                        stepSize:3
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

    var chartGraph = new Chart(ctxCliente2,{
      type: 'bar',
      data: {
          labels: lbl.slice(-5),
          datasets: [{
              label: "Clientes menos frequentes",
              data: dt.slice(-5),
              backgroundColor: ['SteelBlue','SlateGray','DarkOliveGreen','Sienna','MediumVioletRed']
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
                    stepSize:3
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

