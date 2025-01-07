//fetch canvas from DOM + get context
const canvas2 = document.getElementById("canvas2");
const ctx2 = canvas2.getContext("2d");

//Set canvas to window size
canvas2.width = window.innerWidth;
canvas2.height = window.innerHeight;

//create shorthand var
const w = window.innerWidth;
const h = window.innerHeight;

//create array to store pops
const particlesArray = [];

//create hue var
let hue = 0;

//---------------------------------------------------------------------------//



window.addEventListener("resize", function(){
    canvas2.width = window.innerWidth;
    canvas2.height = window.innerHeight;

});

//---------------------------------------------------------------------------//

const mouse2 = {
    x: undefined,
    y: undefined,
}

//---------------------------------------------------------------------------//

canvas2.addEventListener("click", function(event){
    mouse2.x = event.x;
    mouse2.y = event.y;
    //change 'i' for to change particle count
    for (let i = 0; i<10; i++){
    particlesArray.push(new Particle());
    };
});

//---------------------------------------------------------------------------//

canvas2.addEventListener("mousemove", function(event){
    mouse2.x = event.x;
    mouse2.y = event.y;
    //change 'i' for to change particle count
    for(let i = 0; i<1; i++){
    particlesArray.push(new Particle());
    };
})

//---------------------------------------------------------------------------//

class Particle{
    constructor(){
        this.x = mouse2.x;
        this.y = mouse2.y;
        this.size = Math.random()* 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = '#505050';
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
    let timer = 0;
    let interval = 1000/60;
    if (timer > interval){
        this.ctx.clearRect(0, 0, this.width, this.height)
        

        this.timer = 0;
    } else {
        this.timer += deltaTime;
    }



    ctx2.fillStyle = "rgba(0, 0, 0, 0.0)";
    ctx2.fillRect(0,0,canvas2.width,canvas2.height)
    //console.log(deltaTime);
    particleConfig();
    hue+=5;
    requestAnimationFrame(animate)
    console.log(interval)
}
animate(0);