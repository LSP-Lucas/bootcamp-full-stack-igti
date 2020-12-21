import { promises } from 'fs';
import moment from 'moment';
import calc from '../libs/calculos.js'

const { writeFile, readFile } = promises;

async function inserirLancamento(lancamento, tipo) {
  const json = JSON.parse(await readFile("lancamentos.json"));
  lancamento = { id: json.nextId++, ...lancamento };

  if (tipo === "D") {
    lancamento.valor *= -1;
  }

  json.lancamentos.push(lancamento);
  await writeFile("lancamentos.json", JSON.stringify(json, null, 2));

  return lancamento;
}

async function totalMes(mes) {
  const json = JSON.parse(await readFile("lancamentos.json"));

  let lancamentos = json.lancamentos.filter(lancamento => {
    const m = moment(lancamento.data, "DD/MM/YYYY").month() + 1;
    return m === mes;
  });

  lancamentos = lancamentos.map(lancamento => {
    return lancamento.valor;
  });

  return { total: calc.soma(lancamentos) };
}

export { inserirLancamento, totalMes };