const sayHello = () => alert('Witaj na stronie');
const output = f1.w1;
const sum = (a,b) => output.value = a * 1 + b * 1;
const odd = (a,b) => output.value = a * 1 - b * 1;
const multiply = (a,b) => output.value = a * b;

const factorial = () =>{
    const input = prompt("Podaj wartość", "");
    let resoult = 1;
    let i = 1;
    while(i <= input) resoult *= i++;
    alert(`Silnia z ${input} wynosi ${resoult}`);
}

const sqrt = () =>{
    const input = prompt("Podaj wartość", "");
    alert(`Pierwiastek z liczby ${input} wynosi  ${Math.sqrt(input)}`);
}

const pow = () =>{
    const x = prompt("Podaj wartość podstawy", "");
    const n = prompt("Podaj wartość wielokrotności", "");
    alert(`x^${n} =  ${Math.pow(x, n)}`);
}