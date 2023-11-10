
const operations = {
    "plus": (num1, num2) =>{
        return num1 + num2;
    },    

    "minus": (num1,num2) =>{
        return num1 - num2;
    },

    "multiply":(num1, num2) =>{
        return num1 * num2;
    },

    "divide" :(num1,num2) =>{
        return num1/num2;
    }

};

const display = document.getElementById("display");

let operatorPressed = false;
let numOne = null;
let numTwo = null;
let isNegative = false;
let currNumber = '';
let currOperation = null;
let percentOn = false;
let textSize = 60;



const clearButton = document.getElementById("clear");
clearButton.addEventListener('click', () => {
    clearButton.style.backgroundColor = 'rgb(230, 230, 230)';
    display.innerText = '';
    currNumber = '';
    numOne = null;
    numTwo = null;
    operatorButtons.forEach(btn => {
        btn.style.backgroundColor = 'orange';
        btn.style.color = 'white';
    });
    setTimeout(() => {
        clearButton.style.backgroundColor = 'rgb(170, 170, 170)';        
    }, 250);
});

const numberButtons = document.querySelectorAll(".num-btn");



numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        button.style.backgroundColor = 'rgb(190, 178, 178)';
        if (operatorPressed){
            display.innerText = '';
            currNumber = '';
        }

        currNumber += button.innerText;
        if (currNumber.length > 9){
            textSize -= 5;
        }
        console.log(textSize);
        display.style.fontSize = textSize+'px';
        if(isNegative){
            display.innerText = '-'+currNumber;
        }
        else{
            display.innerText = currNumber;
        }
        operatorPressed = false;
        setTimeout(() => {
            button.style.backgroundColor ='#948f8f3f' ;        }, 250);

        
    });
});

const operatorButtons = document.querySelectorAll('.operator-btn')
operatorButtons.forEach(button =>{
    button.addEventListener('click',()=>{
        operatorPressed = true;

        if (numOne == null){
            if(isNegative == true){
                numOne = 0 - parseFloat(currNumber);
                isNegative = false;
            }
            else{
                if(percentOn){
                    numOne = parseFloat(currNumber) / 100;
                    percentOn = false;
                }
                else{
                    numOne = parseFloat(currNumber);
                }
            }

        }

        else {
           getResult();
        }

        currButton = button;
        currOperation = button.getAttribute('id');

        button.style.backgroundColor = 'white';
        button.style.color = 'orange';
        temp = Array.from(operatorButtons).filter(item => item !== button);
        temp.forEach(button => {
            button.style.backgroundColor = 'orange';
            button.style.color = 'white';
        });
        
    });

});

const getResult =()=>{
    if (numOne != null){
        currNumber = display.innerText;
        
        if(isNegative == true){
            numTwo = 0 - parseFloat(currNumber);
            isNegative = false;
        }
        else{
            if(percentOn){
                numTwo = parseFloat(currNumber) / 100;
                percentOn = false;
            }
            else{
                numTwo = parseFloat(currNumber);
            }
        }
    }

    if(numTwo != null){
        const ans = operations[currOperation](numOne,numTwo);
        display.innerText = ans;
        numOne = ans;
        numTwo = null;

        operatorButtons.forEach(btn => {
            btn.style.backgroundColor = 'orange';
            btn.style.color = 'white';
        });

    }

}

const equals = document.getElementById('equals');
equals.addEventListener('click',() =>{
    equals.style.backgroundColor = 'white'; 
    equals.style.color = 'orange';              
    setTimeout(() => {
        equals.style.backgroundColor = 'orange';
        equals.style.color = 'white';       
    }, 100);
    getResult();
});

const plusorminus = document.getElementById('plusorminus');
plusorminus.addEventListener('click',()=>{
    plusorminus.style.backgroundColor = 'rgb(230, 230, 230)';
    temp = display.innerText;
    if(temp!==''){
        num = parseFloat(temp)
        display.innerText = '-' + temp
        isNegative = true;
    }
    setTimeout(() => {
        plusorminus.style.backgroundColor = 'rgb(170, 170, 170)';        
    }, 250);
    
});

const percent = document.getElementById('percent');
percent.addEventListener('click',()=>{
    percent.style.backgroundColor = 'rgb(250, 250, 250)';
    temp = display.innerText;
    num = parseFloat(temp);
    display.innerText = temp/100;
    percentOn = true;
    setTimeout(() => {
        percent.style.backgroundColor = 'rgb(170, 170, 170)';        
    }, 250);
});





