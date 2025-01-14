//fetch canvas from DOM + get context
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

//Set canvas to window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//create shorthand var
const w = window.innerWidth;
const h = window.innerHeight;

//create array to store pops
const particlesArray = [];

//create hue var
let hue = 0;

//---------------------------------------------------------------------------//

ctx.fillStyle = 'white';
ctx.fillRect(w/2, h/2 , 150, 50);
ctx.fillText = 'Loading...';
console.log(ctx);

window.addEventListener("resize", function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.fillStyle = 'white';
    ctx.fillRect(window.innerWidth/2, window.innerHeight/2 , 150, 50);
});

//---------------------------------------------------------------------------//

const mouse = {
    x: undefined,
    y: undefined,
}

//---------------------------------------------------------------------------//

canvas.addEventListener("click", function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    //change 'i' for to change particle count
    for (let i = 0; i<100; i++){
    particlesArray.push(new Particle());
    };
});

//---------------------------------------------------------------------------//

canvas.addEventListener("mousemove", function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    //change 'i' for to change particle count
    for(let i = 0; i<1; i++){
    particlesArray.push(new Particle());
    };
})

//---------------------------------------------------------------------------//

class Particle{
    constructor(){
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random()* 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = 'hsl(' + hue + ', 100%, 50%)';
        this.lastTime = 0;
    }
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.1;
    }

    draw(){
        ctx.fillStyle = this.color;
        ctx.strokeStyle = 'hsl('+hue+', 100%, .50%)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI *2);
        ctx.fill();
        ctx.stroke();

    }
}



console.log(particlesArray);

function particleConfig(){
    for (let i = 0; i < particlesArray.length; i++){
        particlesArray[i].update();
        particlesArray[i].draw();
        for (let j = i; j< particlesArray.length; j++){
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const dist = Math.sqrt(dx * dx, dy * dy);
            if (dist<100){
                ctx.beginPath();
                ctx.strokeStyle = particlesArray[i].color;
                ctx.lineWidth = .2
                ctx.moveTo(particlesArray[i].x,particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctx.stroke();
                ctx.closePath();
            }
        }
        if (particlesArray[i].size <= 1){
            particlesArray.splice(i, 1);
            i--;
        }
    }
}

function animate(timeStamp){
    //clear all pops on canvas
    //ctx.clearRect(0, 0, canvas.width, canvas.height);

    //create trails w/ cd
    const deltaTime = timeStamp - this.lastTime;
    this.lastTime = timeStamp;
    ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
    ctx.fillRect(0,0,canvas.width,canvas.height)
    //console.log(deltaTime);
    particleConfig();
    hue+=5;
    requestAnimationFrame(animate)
}
animate(0);