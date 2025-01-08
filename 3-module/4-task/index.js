function showSalary(users, age) {
  let str = ``;
  users.forEach((user, index) => {
    if (user.age <= age) {
      str += `${user.name}, ${user.balance}\n`;
    }
  });

  return str.trim();
}
