// Реализовать аналог библиотеки Math (можно назвать MathX) с базовым набором функций, используя замыкания:
// вычисление N-го числа в ряду Фибоначчи Ф
// вычисление всех чисел в ряду Фибоначчи до числа N
// вычисление N-го просто числа
// вычисление всех простых чисел до числа N

// Будет плюсом, если задумаетесь и об оптимизации.

const MathX = () => {
  // вычисление N-го числа в ряду Фибоначчи Ф
  const fibN = (n) => {
    if (n < 0) return -1;
    if (n <= 1) return n;

    return fibN(n - 1) + fibN(n - 2);
  };

  // вычисление всех чисел в ряду Фибоначчи до числа N
  const fibAllN = (n) => {
    const ans = [];
    for (let i = 0; i < n; i++) {
      ans.push(fibN(i));
    }
    return ans.toString();
  };

  //   вспомагательная ф-ция для проверки на простое число
  const isPrime = (n) => {
    for (let i = 2; i <= Math.floor(Math.sqrt(n)); i++) {
      if (n % i === 0) return false;
    }
    return n !== 1;
  };

  // вычисление всех простых чисел до числа N
  const primeAllN = (n) => {
    const ans = [];
    for (let i = 2; i < n; i++) {
      if (isPrime(i)) ans.push(i);
    }

    return ans.toString();
  };

  // вычисление N-го просто числа
  const primeN = (n) => {
    const ans = [];
    let count = 0;
    let i = 1;

    while (count < n) {
      if (isPrime(i)) {
        ans.push(i);
        count++;
      }
      i++;
    }

    return ans.pop();
  };

  return {
    fibN,
    fibAllN,
    isPrime,
    primeAllN,
    primeN,
  };
};

const myMath = MathX();
