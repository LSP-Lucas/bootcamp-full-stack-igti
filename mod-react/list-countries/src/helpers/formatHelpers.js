const formatter = Intl.NumberFormat('pt-br');

function formatNumber(value) {
  return formatter.format(value);
}

export { formatNumber };