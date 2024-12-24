function sumSalary(salaries) {

  if (Object.keys(salaries).length === 0) {
    return 0;
  }

  let sum = 0;
  for (let salary in salaries) {
    if (typeof salaries[salary] === 'number' && !isNaN(salaries[salary]) && isFinite(salaries[salary])) {
      sum += salaries[salary];
    }
  }

  return sum;
}
