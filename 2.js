// Задача о странных числах: Напишите функцию, которая принимает число и возвращает true,
// если это число является странным, и false в противном случае.
// Странным числом считается число, которое равно сумме всех своих делителей, кроме самого себя.

function isStrangeNum(num) {
  if (num <= 1) return false;

  let sum = 1;

  // пушим в массив все делители числа num
  for (let i = 2; i < num; i++) {
    if (num % i === 0) sum += i;
    if (sum > num) return false;
  }


  return sum === num;
}

console.log(isStrangeNum(28));
