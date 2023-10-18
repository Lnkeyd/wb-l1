// Реализовать аналог библиотеки Math (можно назвать MathX) с базовым набором функций, используя замыкания:
// вычисление N-го числа в ряду Фибоначчи Ф
// вычисление всех чисел в ряду Фибоначчи до числа N
// вычисление N-го просто числа
// вычисление всех простых чисел до числа N

// Будет плюсом, если задумаетесь и об оптимизации.

const MathX = {
  // вычисление N-го числа в ряду Фибоначчи Ф
  fibN(n) {
    if (n < 0) return -1;
    if (n <= 1) return n;

    return this.fibN(n - 1) + this.fibN(n - 2);
  },

  fibAllN(n) {
    const ans = [];
    for (let i = 0; i < n; i++) {
      ans.push(this.fibN(i));
    }
    return ans.toString();
  },

  //   вспомагательная ф-ция для проверки на простое число
  isPrime(n) {
    for (let i = 2; i < n; i++) {
      if (n % i === 0) return false;
    }
    return n !== 1;
  },

  // вычисление всех простых чисел до числа N
  primeAllN(n) {
    const ans = [];
    for (let i = 2; i < n; i++) {
      if (this.isPrime(i)) ans.push(i);
    }

    return ans.toString();
  },

  // вычисление N-го просто числа
  primeN(n) {
    const ans = [];
    let count = 0;
    let i = 1;

    while (count < n) {
      if (this.isPrime(i)) {
        ans.push(i);
        count++;
      }
      i++;
    }

    return ans.pop();
  },
};
