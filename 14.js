// 14.	Задача на промисы: напишите функцию, которая принимает URL изображения и возвращает промис, 
// который разрешается с данными об изображении, когда оно загружено. Когда 
// говорится "промис разрешается с данными об изображении", это означает, что 
// промис должен быть успешно выполнен (resolved) с данными об изображении 
// после того, как изображение будет загружено.

// fetch не поддерживается в node из коробки, поэтому код нужно выполнять в браузере

const getImageData = async (url) => {
    return new Promise(resolve => {
        fetch(url).then(data => {
            resolve(data)
        })
    })
}

// const imgUrl = 'https://images.unsplash.com/photo-1682685794304-99d3d07c57d2?auto=format&fit=crop&q=80&w=1886&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

// getImageData(imgUrl).then(data => console.log(data))