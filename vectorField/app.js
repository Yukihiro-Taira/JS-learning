let canvas;
let ctx;
let flowField;
let flowFeildAnimation

window.onload = function(){
    canvas = document.getElementById('canvas1');
    ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    flowField = new FlowFieldEffect(ctx, canvas.width, canvas.height);
    flowField.animate(0);
}

window.addEventListener('resize', function(){
    cancelAnimationFrame(flowFeildAnimation);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    flowField = new FlowFieldEffect(ctx, canvas.width, canvas.height);
    flowField.animate(0);
});

const mouse = {
    x: 0,
    y: 0,
}

window.addEventListener('mousemove', function(e){
    mouse.x = e.x;
    mouse.y = e.y;
})

class FlowFieldEffect{
    #ctx;
    #width;
    #height;
    constructor(ctx, width, height){
        this.#ctx = ctx;
        this.#width = width;
        this.#height = height;
        this.#ctx.lineWidth = 2.5;
        this.#ctx.strokeStyle = 'white';
        this.lastTime = 0;
        this.interval = 1000/60;
        this.timer = 0;
        this.cellSize = 50;
        this.gradient;
        this.#createGradient();
        this.#ctx.strokeStyle = this.gradient;
        this.radius = 1;
        this.vel =0.001;
    }
    #createGradient(){
        this.gradient = this.#ctx.createLinearGradient(0,0,this.#width,this.#height);
        this.gradient.addColorStop('0.1','#ff0133');
        this.gradient.addColorStop('0.3','blue');
        this.gradient.addColorStop('0.5','teal');
        this.gradient.addColorStop('0.7','#555c33');
        this.gradient.addColorStop('0.9','#ffff33');

    }
    #drawLine(angle,x, y){
        let posx = x;
        let posy = y;
        
        let dx = mouse.x - posx;
        let dy = mouse.y - posy;
        let dist = dx*dx+dy*dy;

        let length = dist*0.0001;
        this.#ctx.beginPath();
        this.#ctx.moveTo(x, y);
        this.#ctx.lineTo(x+ + Math.cos(angle) * length,y + Math.sin(angle) * length);
        this.#ctx.stroke();
    }
    animate(timeStamp){
        const deltaTime = timeStamp - this.lastTime;
        this.lastTime = timeStamp;
        if (this.timer > this.interval){
            this.#ctx.clearRect(0, 0, this.#width, this.#height)
            this.radius += this.vel;
            if (this.radius > 0.1 || this.radius < -0.1 ) this.vel *= -1; 

            for (let y = 0; y < this.#width; y+= this.cellSize){
                for (let x = 0; x < this.#height; x += this.cellSize){
                    const angle = (Math.cos(x*0.01) + Math.sin(y*0.01)) * this.radius;
                    this.#drawLine(angle,x,y);
                    //console.log(angle);
                }
            };

            this.timer = 0;
        } else {
            this.timer += deltaTime;
        }
        //console.log(deltaTime);
        flowFeildAnimation = requestAnimationFrame(this.animate.bind(this));
    }
}