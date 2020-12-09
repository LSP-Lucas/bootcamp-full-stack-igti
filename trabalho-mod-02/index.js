import { promises as fs } from 'fs';

stateAndCity();

async function stateAndCity() {
  const estados = JSON.parse(await fs.readFile("./data/Estados.json"));
  const cidades = JSON.parse(await fs.readFile("./data/Cidades.json"));

  const citys = [];
  const states = [];
  estados.forEach(estado => {
    const { ID, Sigla } = estado;
    // const contais = citys[Sigla];

    // if (!contais) {
    //   citys[Sigla] = [];
    // }

    states.push(Sigla);

    cidades.forEach(cidade => {
      const { Estado, Nome } = cidade;

      if (ID === Estado) {
        citys.push(Nome)
      }
    });
    fs.writeFile(`${Sigla}.json`, JSON.stringify(citys));
  });
  readStates(states);
}

function readStates(states) {
  states.forEach(uf => {
    fs.readFile("AC.json", "utf-8").then(resp => {
      //console.log(`${uf}: ${resp.length}`);
      console.log(uf + " " +resp)
    }).catch(err => {
      console.log(err);
    })
    
  })
}


// Executa: node --experimental-modules index.js