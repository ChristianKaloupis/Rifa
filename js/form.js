// carregar dados criar tabela com 100 nrs.

const qtdeCol = 10
const qtdeLin = 10
const qtdeCel = qtdeCol * qtdeLin

var x = [];
for (i = 1; i <= qtdeCel; i++) {
  x[i] = i;
};

let tabela = document.querySelector("#tabela-rifa");

for (i = 1; i < (x.length);) {

  let numeroTr  = document.createElement("tr");
  numeroTr.classList.add("itemsorteio");

  //criar uma linha com 10 colunas ou n
  for (c = 0; c < qtdeCol; c++) 
  {
    let numeroTd = document.createElement("td");
    numeroTd.textContent = x[i];
    numeroTr.appendChild(numeroTd);
    numeroTd.classList.add("info-nr");  // 1. adiconar class info-nr para permitir recuperar todos


    i++
  }

  tabela.appendChild(numeroTr);
}

tabela.addEventListener("click", function(event) {
   event.target.classList.toggle("reservado")

})


carga.addEventListener("click", function() {
  recuperarNrs()
})

function recuperarNrs() {
  const url = 'https://fireapp-d4454-default-rtdb.firebaseio.com/tabela.json'
  const options = {
      method: 'GET',
      mode: 'cors',
      headers: {
          'content-type': 'application/json;charset=utf-8'
      }
  }

      fetch(url,options).then(
          response => response.json()
      ).then(
          data => {
              if(data.erro) {
                  //input.setCustomValidity('Não foi possível buscar o CEP.')
                  return
              }
              //input.setCustomValidity('')
              preencherCamposComNrs(data)

              //console.log(data)
              return
          }
      )
  }

function preencherCamposComNrs(data) {
  let nrs = document.querySelectorAll(".info-nr");

  for (let i = 0; i < nrs.length; i++) {
    let numero = nrs[i];
    for (let key in data) {
      if (numero.textContent == data[key].numero) {
        let classe = data[key].sit
        numero.classList.add(classe)
      }

    }
  }
}


salvar.addEventListener("click", function(){
  salvarNrs()
})

function salvarNrs() {
  let nrs = document.querySelectorAll(".info-nr");

  for (let i = 0; i < nrs.length; i++) {
    let numero = nrs[i];
    let sit = ''
    if (numero.classList.contains('reservado'))
      sit = 'reservado'
    else if(numero.classList.contains('pago'))
      sit = 'pago' 
      
    if (sit != '') 
      salvar1Numero(numero.textContent, sit)
  }

}

function salvar1Numero(numero, sit) {
  const url = 'https://fireapp-d4454-default-rtdb.firebaseio.com/tabela.json'
  const options = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'content-type': 'application/json;charset=utf-8'
      },
      body: `{
        "numero": "${numero}",
        "sit": "${sit}"
       }`,
  }

  const resp = fetch(url,options).then(
          response => response.json()
      ).then(
          data => {
              if(data.erro) {
                  return
              }

              //console.log(data)
              return
          }
      )


}

function atualizar1Numero() {


}

zerar.addEventListener("click", function(){
  const url = 'https://fireapp-d4454-default-rtdb.firebaseio.com/tabela.json'
  const options = {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'content-type': 'application/json;charset=utf-8'
      }
  }

  const resp = fetch(url,options).then( response => response.json())

  let nrs = document.querySelectorAll(".info-nr");  //seleciona todos da class info-nr
  nrs.forEach(numero => {
    numero.classList.remove("pago")
    numero.classList.remove("reservado")
  });
})

function zerarNrs() {


}

