function highlight(table) {
  Array.from(table.tBodies[0].rows).forEach(row => {
    const statusCell = row.cells[3];
    if (statusCell && statusCell.hasAttribute('data-available')) {
      const isAvailable = statusCell.getAttribute('data-available');
      if (isAvailable === 'true') {
        row.classList.add('available');
      } else {
        row.classList.add('unavailable');
      }
    } else {
      row.hidden = true;
    }

    const genderCell = row.cells[2];
    if (genderCell) {
      const gender = genderCell.textContent.trim();
      if (gender === 'm') {
        row.classList.add('male');
      } else if (gender === 'f') {
        row.classList.add('female');
      }
    }

    const ageCell = row.cells[1];
    if (ageCell) {
      const age = Number(ageCell.textContent.trim());
      if (!isNaN(age) && age < 18) {
        row.style.textDecoration = 'line-through';
      }
    }
  });
}
