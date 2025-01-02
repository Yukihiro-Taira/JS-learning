//fetch canvas from DOM + get context
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const w = window.innerWidth;
const h = window.innerHeight;
const particlesArray = [];




////////////////////////////////////////////////////////////////////////////////

ctx.fillStyle = 'white';
ctx.fillRect(w/2, h/2 , 150, 50);

window.addEventListener("resize", function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.fillStyle = 'white';
    ctx.fillRect(window.innerWidth/2, window.innerHeight/2 , 150, 50);
});

const mouse = {
    x: undefined,
    y: undefined,
}

canvas.addEventListener("click", function(event){
    mouse.x = event.x;
    mouse.y = event.y;
});

canvas.addEventListener("mousemove", function(event){
    mouse.x = event.x;
    mouse.y = event.y;
})

////////////////////////////////////////////////////////////////////////////////

class Particle{
    constructor(){
        //this.x = mouse.x;
        //this.y = mouse.y;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random()* 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
    }
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
    }

    draw(){
        ctx.fillStyle = '#254658'
        ctx.strokeStyle = 'green'
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 50, 0, Math.PI *2);
        ctx.fill();
        ctx.stroke();

    }
}

function init(){
    for(let i = 0; i < 100; i++ ){
        particlesArray.push(new Particle());
    }
}

init();

console.log(particlesArray);

function particleConfig(){
    for (let i = 0; i < particlesArray.length; i++){
        particlesArray[i].update();
        particlesArray[i].draw();
    }
}

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particleConfig();
    requestAnimationFrame(animate)
}
animate();