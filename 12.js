// 12.	Задача на работу с объектами: создайте объект, представляющий собой книгу. 
// Объект должен иметь свойства, такие как: название книги, автор и год издания. 
// Напишите методы для получения и изменения значений свойств книги.

const book = {
    name: 'Алиса в Зазеркалье',
    author: 'Льюис Кэрролл',
    year: '1871',

    getName: function () {
        return this.name
    },
    setName: function (string) {
        this.name = string;
    },

    getAuthor: function () {
        return this.author
    },
    setAuthor: function (string) {
        this.author = string;
    },

    getYear: function () {
        return this.year
    },
    setYear: function (string) {
        this.year = string;
    },

    
}

console.log(book.getYear()) //1871
book.setYear('1111')
console.log(book.getYear()) //1111