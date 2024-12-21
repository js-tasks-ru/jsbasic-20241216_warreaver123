function ucFirst(str) {
  // ваш код...
  if (str.length === 0) {
    return '';
  }

  if (str.length === 1) {
    return str.toUpperCase();
  }

  return str.slice(0, 1).toUpperCase() + str.slice(1);
}
