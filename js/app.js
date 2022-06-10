let dotBtn = document.querySelector('#dot');
let backSpace = document.querySelector('#del');
let operators = document.querySelectorAll('.operation');
let display = document.querySelector('#display');
let numbers = document.querySelectorAll('.number');
let clear = document.querySelector('#clear-button');
let equals = document.getElementById('equals');

let total = 0;
let numContainer = [];
let operator = [];
let container = [];


function restart(){
    numContainer = [];
    container = [];
    display.textContent = '';
    total = 0;
    operator = [];
};

function getNumber(e){
    if(container.length < 17){
        container.push(e.target.textContent);
        display.textContent = container.join('');
        numContainer.push(e.target.textContent);
    }
};

numbers.forEach(num => {
    num.addEventListener('click', getNumber);
});

function giveDot() {
    if(!container.includes('.') && container.length < 17){
        container.push('.');
        display.textContent = container.join('');
        numContainer.push('.');
    }
};

function eraseLast(){
    numContainer.pop();
    container.pop();
    display.textContent = container.join('');
};

operators.forEach(op => {
    op.addEventListener('click', () =>{
        operator.push(op.textContent);
        numContainer.push('new');
        container = [];
    });
});


function operate(){
    let finalNum = numContainer.join('').split('new');
    total = Number(finalNum.shift());
    for (let i = 0; i < finalNum.length; i++){
        switch(true){
            case operator[i] === '+':
                total += Number(finalNum[i]);
                break;

            case operator[i] === '-':
                total -= Number(finalNum[i]);
                break;

            case operator[i] === '*':
                switch(finalNum[i]){
                    case '':
                        total = total;
                        break;

                        default: 
                        total *= Number(finalNum[i]);
                }
                break;
            
                case operator[i] === '/':
                    switch(finalNum[i]){
                        case '':
                            total = total;
                            break;
                        default:
                            total /= Number(finalNum[i]);
                    }
                break;
            
        }
    }
    showTotal();
};


function showTotal() {
    if(total === Infinity){
        display.textContent = 'Error!';
    }
    else if (Number(total) === total && total %1 !== 0){
        display.textContent = total.toFixed(2);
    }
    else{
        display.textContent = total;
    }
}


clear.addEventListener('click', restart);
dotBtn.addEventListener('click', giveDot);
backSpace.addEventListener('click', eraseLast);
equals.addEventListener('click', operate);