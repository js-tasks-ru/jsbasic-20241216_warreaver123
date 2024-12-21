function factorial(n) {
  if (n === 0) {
    return 1;
  }

  let sum = 1;

  while (n > 0) {
    sum = sum * n;
    n--;
  }
  return sum;
}
