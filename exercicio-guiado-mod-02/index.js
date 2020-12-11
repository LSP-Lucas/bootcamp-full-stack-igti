import { promises as fs } from 'fs';

let arrData = [];
const times = [];

async function init() {
  try {
    const data = JSON.parse(await fs.readFile("brasileirao-2003.json"));
    arrData = data;

    //inicializando array de times
    data[0].partidas.forEach(partida => {
      times.push({ time: partida.mandante, pontuacao: 0 });
      times.push({ time: partida.visitante, pontuacao: 0 });
    });

    //preencher a pontuação dos times no array
    data.forEach(rodada => {
      rodada.partidas.forEach(partida => {
        const timeMandante = times.find(item => item.time === partida.mandante);
        const timeVisitante = times.find(item => item.time === partida.visitante);

        if (partida.placar_mandante > partida.placar_visitante) {
          //3 pontos para o mandante
          timeMandante.pontuacao += 3;
        } else if (partida.placar_visitante > partida.placar_mandante) {
          //3 pontos para o visitante
          timeVisitante.pontuacao += 3;
        } else {
          //1 ponto para cada
          timeVisitante.pontuacao += 1;
          timeMandante.pontuacao += 1;
        }
      });
    });

    times.sort((a, b) => {
      return b.pontuacao - a.pontuacao;
    });

    // for (let i of times) {
    //   console.log(`${i.time} - ${i.pontuacao}`)
    // }

    /*Para este caso não é necessário colocar o await
    pois uma função não depende da outra, mas se dependese 
    seria obrigatório colocar.
    */
    await salvaTimes();
    await salvaQuatroPrimeiros();
    await salvaQuatroUltimos();
    await campeaoEntreVisitantes();

  } catch (error) {
    console.log(error);
  }
}

async function salvaTimes() {
  fs.writeFile("times.json", JSON.stringify(times, null, 2));
}

async function salvaQuatroPrimeiros() {
  //times classificados para Copa Libertadores
  fs.writeFile("quatroPrimeiros.json", JSON.stringify(times.slice(0, 4), null, 2));
}

async function salvaQuatroUltimos() {
  //times rebaixados para serie B
  fs.writeFile("quatroUltimos.json", JSON.stringify(times.slice(-4), null, 2));
}

async function campeaoEntreVisitantes() {
  let campeaoVisitante = [];

  arrData.forEach(rodada => {
    rodada.partidas.forEach(partida => {
      if (partida.placar_visitante > partida.placar_mandante) {
        campeaoVisitante.push({ time: partida.visitante, pontuacao: 3 });
      }
    })
  });

  console.log(campeaoVisitante.sort((a, b) => {
    return a.time - b.time;
  }))

}

init();