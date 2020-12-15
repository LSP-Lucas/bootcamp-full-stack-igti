const range = document.querySelector('#input-range');
const inputNumber = document.querySelector('#input-number');
const inputExtenso = document.querySelector('#input-extenso');

window.addEventListener('load', () => {
  insertNumber();
});

function insertNumber() {
  range.addEventListener('input', function () {
    inputNumber.value = this.value;

    numberExtenso(this.value);
  });
}

function numberExtenso(number) {
  const unidades = ["Zero", "Um", "Dois", "Três", "Quatro", "Cinco", "Seis", "Sete", "Oito", "Nove"];
  const especiais = ["Dez", "Onze", "Doze", "Treze", "Catorze", "Quinze", "Dezeseis", "Dezsete", "Dezoito", "Dezenove"];
  const dezenas = ["Vinte", "Trinta", "Quarenta", "Cinquenta", "Sessenta", "Setenta", "Oitenta", "Noventa"];
  const centenas = ["Cem", "Duzentos", "Trezentos", "Quatrocentos", "Quinhetos", "Seiscentos", "Setecentos", "Oitocentos", "Novecentos"];

  // Valores unitários
  if (number.length === 1) {
    inputExtenso.value = (unidades[number[0]]);
  }
  else if (number.length === 2) {
    // Especiais
    if ((number[0] == '1') && (number[1] == '0' || number[1] == '1' || number[1] == '2' || number[1] == '3' || number[1] == '4' || number[1] == '5' || number[1] == '6' || number[1] == '7' || number[1] == '8' || number[1] == '9')) {
      inputExtenso.value = (especiais[parseInt(number[1])]);
    }

    // Dezenas
    else if ((number[0] == '2' || number[0] == '3' || number[0] == '4' || number[0] == '5' || number[0] == '6' || number[0] == '7' || number[0] == '8' || number[0] == '9') && number[1] == '0') {
      inputExtenso.value = (dezenas[parseInt(number[0] - 2)]);
    }

    // Dezenas compostas
    else {
      inputExtenso.value = (dezenas[parseInt(number[0] - 2)] + " e " + unidades[parseInt(number[1])]);
    }
  }

  // Valores com 3 algarimos
  else if (number.length === 3) {
    // Centenas inteiras
    if ((number[0] == '1' || number[0] == '2' || number[0] == '3' || number[0] == '4' || number[0] == '5' || number[0] == '6' || number[0] == '7' || number[0] == '8' || number[0] == '9') && (number[1] == '0' && number[2] == '0')) {
      inputExtenso.value = (centenas[parseInt(number[0] - 1)])
    }

    // Centenas mais números especiais
    else if ((number[0] == '2' || number[0] == '3' || number[0] == '4' || number[0] == '5' || number[0] == '6' || number[0] == '7' || number[0] == '8' || number[0] == '9') && (number[1] == '1') && ((number[2] == '1' || number[2] == '2' || number[2] == '3' || number[2] == '4' || number[2] == '5' || number[2] == '6' || number[2] == '7' || number[2] == '8' || number[2] == '9'))) {
      inputExtenso.value = (centenas[parseInt(number[0] - 1)] + " e " + especiais[parseInt(number[2])])
    }

    // Centenas mais números compostos
    else if ((number[0] == '2' || number[0] == '3' || number[0] == '4' || number[0] == '5' || number[0] == '6' || number[0] == '7' || number[0] == '8' || number[0] == '9') && (number[1] != '1')) {
      inputExtenso.value = (centenas[parseInt(number[0] - 1)] + " e " + dezenas[parseInt(number[1] - 2)] + " e " + unidades[parseInt(number[2])]);
    }

    // Cento mais números especiais
    else if ((number[0] == '1') && (number[1] == '1') && (number[2] == '1' || number[2] == '2' || number[2] == '3' || number[2] == '4' || number[2] == '5' || number[2] == '6' || number[2] == '7' || number[2] == '8' || number[2] == '9')) {
      inputExtenso.value = ("Cento e " + especiais[parseInt(number[2])])
    }

    // Cento mais números compostos
    else if ((number[0] == '1') && (number[1] != '1') && (number[2] != '0')) {
      inputExtenso.value = ("Cento e " + dezenas[parseInt(number[1] - 2)] + " e " + unidades[parseInt(number[2])]);
    }
  }
}