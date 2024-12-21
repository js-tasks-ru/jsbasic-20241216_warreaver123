function checkSpam(str) {
  // ваш код...
  const substrings = ['1XbeT', 'XXX'];

  return substrings.some(substring => str.toLowerCase().includes(substring.toLowerCase()));

}
