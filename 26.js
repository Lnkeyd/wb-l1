// 26.	Задача: Рекурсивный обход дерева DOM:: Напишите функцию, которая рекурсивно обходит
// дерево DOM, начиная с указанного элемента, и выполняет определенное действие с каждым
// узлом (например, выводить информацию о теге в консоль).


function recursiveDOM(root) {
    console.log(root.tagName);
    if (root.childElementCount < 0) return;
    for (const child of root.children) {
        recursiveDOM(child);
    }
}

// const selectedEl = document.querySelector("body");
// recursiveDOM(selectedEl);
