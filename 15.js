const myPromiseAll = async (funcs) => {
    const ans = await Promise.all(funcs)

    return ans
}

// myPromiseAll([Promise.resolve(2), Promise.resolve(5)]).then(console.log)