const display = document.getElementById("display");


function appendToDisplay(input){
    display.value += input;
}

function clearDisplay(){
    display.value = "";
}

function calculate(){
    try{
        display.value = eval(display.value);
    }
    catch(error){
        display.value="Error"
    }
}

// function keyAnimation(){
//     //Movement Animation to happen
//     const card = document.querySelector(".calculator");
//     const opBtn = document.querySelector(".keys");

//     //Moving Animation Event
//     opBtn.addEventListner('mousemove', (e) => {
//         let xAxis = (window.innerWidth / 2 - e.pageX) / 10;
//         let yAxis = (window.innerHeight / 2 - e.pageX) / 10;

//         card.computedStyleMap.transform = `rotateY(${yAxis}deg) rotateX(${xAxis})`;
//     });

// }
