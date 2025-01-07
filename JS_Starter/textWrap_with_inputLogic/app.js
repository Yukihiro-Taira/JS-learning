let canvas;
let ctx;

window.onload = function(){
    const textInput = document.getElementById('textInput')
    canvas = document.getElementById('canvas1');
    ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    console.log(ctx);

    const gradient = ctx.createLinearGradient(0, 0, canvas.width,canvas.height);
    gradient.addColorStop(0.1, 'blue');
    gradient.addColorStop(0.9, 'pink');


    ctx.fillStyle= gradient;
    ctx.font = '80px Roboto'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'bottom'

    //------text wrap function-----------//

    const maxTextWidth = canvas.width * 0.9;
    const lineHeight = 80;

    function wrapText(text){
        let linesArray = [];
        let lineCounter = 0;
        let line = '';
        let words = text.split(' ');
        for(let i = 0; i < words.length; i++){
            let testLine = line + words[i] + ' ';
            if(ctx.measureText(testLine).width > maxTextWidth){
                line = words[i] +' ';
                lineCounter++;
            } else {
                line = testLine;
            };
            linesArray[lineCounter] = line;
        }
        let textHeight = lineHeight *lineCounter;
        let textY = canvas.height/2 - textHeight/2;
        linesArray.forEach((el, index) => {
            ctx.fillText(el, canvas.width/2, textY + (index * lineHeight));
        })
        
    }

    textInput.addEventListener('keyup', (e) =>{
        ctx.clearRect(0,0,canvas.width,canvas.height);
        wrapText(e.target.value);

    })
}



window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

});
