import { promises as fs } from 'fs';

stateAndCity();

async function stateAndCity() {
  const estados = JSON.parse(await fs.readFile("./data/Estados.json"));
  const cidades = JSON.parse(await fs.readFile("./data/Cidades.json"));

  const states = {};
  estados.forEach(estado => {
    const { ID, Sigla } = estado;
    const contais = states[Sigla];

    if (!contais) {
      states[Sigla] = [];
    }

    cidades.forEach(cidade => {
      const { Estado, Nome } = cidade;

      if (ID === Estado) {
        states[Sigla].push(Nome)
      }
    });
  });
  console.log(states);
}



// Executa: node --experimental-modules export.js