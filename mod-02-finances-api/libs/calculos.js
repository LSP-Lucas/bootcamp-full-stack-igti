function soma(array) {
  const sum = array.reduce((previousValue, currentValue) => {
    return previousValue + currentValue;
  }, 0);

  return sum;
}

export default { soma };