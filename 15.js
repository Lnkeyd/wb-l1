const myPromiseAll = async (funcs) => {
    // Promise.all ждёт выполнения всех ф-ций и потом выдаёт массив с ответами
    const ans = await Promise.all(funcs)

    return ans
}

// myPromiseAll([Promise.resolve(2), Promise.resolve(5)]).then(console.log)