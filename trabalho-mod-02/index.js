import { promises as fs } from 'fs';

let allStatesAndCity = [];

stateAndCity();

async function stateAndCity() {
  const estados = JSON.parse(await fs.readFile("./data/Estados.json"));
  const cidades = JSON.parse(await fs.readFile("./data/Cidades.json"));

  const citys = [];
  const states = [];
  estados.forEach(estado => {
    const { ID, Sigla } = estado;

    states.push(Sigla);

    cidades.forEach(cidade => {
      const { Estado, Nome } = cidade;

      if (ID === Estado) {
        citys.push(Nome)
      }
    });

    const objCity = {
      cidades: citys
    }

    const arr = {
      estado: Sigla,
      cidade: citys
    }

    allStatesAndCity.push(arr);

    fs.writeFile(`${Sigla}.json`, JSON.stringify(objCity));
  });
  readStates(states);
}

function readStates(states) {
  console.log("\n\n2 - Total de cidades por estado em ordem crescente\n");

  const arrBigStates = [];

  states.forEach(uf => {
    fs.readFile(`${uf}.json`).then(resp => {
      const value = JSON.parse(resp);
      const totalCity = value.cidades.length;

      console.log(`Estado: ${uf} - Toltal de cidades: ${totalCity}`);

      const obj = {
        Estado: `${uf}`,
        Total: `${totalCity}`
      }
      arrBigStates.push(obj);

      if (arrBigStates.length === states.length) {
        bigStates(arrBigStates);
      }
    }).catch(err => {
      console.log(err);
    });
  });
}

function bigStates(arrBigStates) {
  console.log("\n\n3 - Estados com maior quantidade de cidades em ordem decrescente\n");

  const arrOrdenado = arrBigStates.sort(function (a, b) {
    return a.Total - b.Total
  });
  let arrLenghtFive = [];
  let newArrLenghtFive = [];
  for (let i = 1; i <= 5; i++) {
    arrLenghtFive.push(arrOrdenado[arrOrdenado.length - i]);
  }

  for (let value of arrLenghtFive) {
    newArrLenghtFive.push(`${value.Estado} - ${value.Total}`)
  }

  console.log(newArrLenghtFive);
  smallState(arrOrdenado);
}

function smallState(arrOrdenado) {
  console.log("\n\n4 - Estados com maior quantidade de cidades em ordem decrescente\n");

  let arrLenghtFive = [];
  let newArrLenghtFive = [];

  for (let i = 4; i >= 0; i--) {
    arrLenghtFive.push(arrOrdenado[i]);
  }

  for (let value of arrLenghtFive) {
    newArrLenghtFive.push(`${value.Estado} - ${value.Total}`)
  }

  console.log(newArrLenghtFive)
  cityBigName();
}

function cityBigName() {
  console.log("\n\n5 - Cidades com maior nome de cada estado\n");

  const bigCity = [];
  let bigNum = 0;

  let varTemp = '';

  for (let value of allStatesAndCity) {

    value.cidade.forEach(valor => {
      console.log(valor)
    })

  }

}

// Executa: node --experimental-modules index.js