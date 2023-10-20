let i = 0;

function docWrite() {
    i++;
    document.write("COUNT:" + i + "<br>")
    return docWrite()
}

try {
  docWrite();
} catch (e) {
  console.log(i);
  console.log(e)
}

// 11413, Далее идёт превышение стека вызовов
// функция вызвалась меньше раз, чем в предыдущем примере (13917) 
// потому что хранение операции document.write занимает больше памяти