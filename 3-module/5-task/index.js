function getMinMax(str) {
  const arr = str.split(' ').filter(item => !isNaN(item)).map(item => Number(item));
  return {
    min: Math.min(...arr),
    max: Math.max(...arr)
  }
}

console.log(getMinMax('1 и -5.8 или 10 хотя 34 + -5.3 и 73'))
