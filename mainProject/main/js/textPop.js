let canvas;
let ctx;
let flowField;
let flowFieldAnimation

window.addEventListener('load', function(){
    canvas = document.getElementById('canvas1');
    ctx = canvas.getContext('2d', {
        willReadFrequently: true
    });
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    console.log(ctx);


    class FlowFieldEffect{
        #ctx;
        #width;
        #height;
        constructor(ctx, width, height){
            this.#ctx = ctx;
            this.#width = width;
            this.#height = height*2;
            this.#ctx.lineWidth = 2.5;
            this.#ctx.strokeStyle = 'white';
            this.lastTime = 0;
            this.interval = 1000/60;
            this.timer = 0;
            this.cellSize = 15;
            this.gradient;
            this.#createGradient();
            this.#ctx.strokeStyle = this.gradient;
            this.radius = 1;
            this.vel =0.001;

            this.mouse ={
                radius:20000,
                x: 0,
                y: 0
            }
            window.addEventListener('mousemove', (e) =>{
                this.mouse.x = e.x;
                this.mouse.y = e.y;
            })


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
            
            let dx = this.mouse.x - posx;
            let dy = this.mouse.y - posy;
            let dist = dx*dx+dy*dy;
            let length = dist * 0.0001;
            
            this.#ctx.soruceCompositeOperation = 'destination-out'

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
                    for (let x = 0; x < (this.#height)*2; x += this.cellSize){
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
            flowFieldAnimation = requestAnimationFrame(this.animate.bind(this));
        }
    }

    class Particle{
        constructor(effect, x, y, color){
            this.effect = effect;
            this.x = Math.random() * this.effect.canvasWidth;
            this.y = 0;
            this.color = color;
            this.originX = x;
            this.originY = y;
            this.size = this.effect.gap;
            this.dx = 0;
            this.dy = 0;
            this.velx = 0;
            this.vely = 0;
            this.force = 0;
            this.angle = 0;
            this.dist = 0;
            this.friction = Math.random() * 0.6 +0.15;
            this.ease = Math.random() *0.1 +0.005;


            


        }
        draw(){
            ctx.globalCompositeOperaton = "source-over"
            this.effect.context.fillStyle = this.color;
            this.effect.context.fillRect(this.x, this.y, this.size, this.size);
        }
        update(){
            this.dx = this.effect.mouse.x - this.x;
            this.dy = this.effect.mouse.y - this.y;
            this.dist = (this.dx * this.dx + this.dy * this.dy) * Math.random();
            this.force = -this.effect.mouse.radius / this.dist;

            if(this.dist < this.effect.mouse.radius){
                this.angle = Math.atan2(this.dy, this.dx)
                this.velx += this.force *Math.cos(this.angle);
                this.vely += this.force * Math.sin(this.angle);
            }
            this.x += (this.velx *= this.friction) + (this.originX - this.x) * this.ease;
            this.y += (this.originY - this.y) * this.ease;
        }
    }

    class Effect{
        constructor(context, canvasWidth, canvasHeight){
            this.context = context;
            this.canvasWidth = canvasWidth;
            this.canvasHeight = canvasHeight;
            this.textX = this.canvasWidth /2;
            this.textY = this.canvasHeight /2;
            this.fontSize = 80;
            this.maxTextWidth = this.canvasWidth * 0.8;
            this.lineHeight = this.fontSize *0.8;
            this.textInput = document.getElementById('textInput')
            this.textInput.addEventListener('keyup', (e) =>{
                if (e.key !==' '){
                    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
                    this.wrapText(e.target.value);
                }
            });


            //particle text
            this.particles = [];
            this.gap = 3;
            this.mouse ={
                radius:20000,
                x: 0,
                y: 0
            }
            window.addEventListener('mousemove', (e) =>{
                this.mouse.x = e.x;
                this.mouse.y = e.y;
            })





        }
        
        wrapText(text){
            //settings//
            const gradient = this.context.createLinearGradient(0, 0, this.canvasWidth, this.canvasHeight);
            gradient.addColorStop(0.3, 'blue');
            gradient.addColorStop(0.5, 'purple');
            gradient.addColorStop(0.7, 'pink');
        
        
            this.context.fillStyle= gradient;
            this.context.textAlign = 'center'
            this.context.textBaseline = 'middle';
            this.context.lineWidth = 3;
            this.context.font = this.fontSize + 'px Roboto';



            //-----Line Break Logic------//
            let linesArray = [];
            let words = text.split(' ');
            let lineCounter = 0;
            let line = '';
            for(let i = 0; i < words.length; i++){
                let testLine = line + words[i] + ' ';
                if (this.context.measureText(testLine).width > this.maxTextWidth){
                line = words[i] +' ';
                lineCounter++;
                } else {
                    line = testLine;
                };
                linesArray[lineCounter] = line;
            }
            let textHeight = this.lineHeight * lineCounter;
            this.textY = this.canvasHeight/2 - textHeight/2;
            linesArray.forEach((el, index) => {
            this.context.fillText(el, this.textX,this.textY + (index * this.lineHeight));
            });
            this.convertToParticles();

        }
        convertToParticles(){
            this.particles = [];
            const pixels = this.context.getImageData(0, 0, this.canvasWidth, this.canvasHeight).data;
            this.context.clearRect(0,0,this.canvasWidth,this.canvasHeight);
            for(let y=0; y<this.canvasHeight; y+=this.gap){
                for(let x = 0; x<this.canvasWidth; x += this.gap){
                    const index = (y * this.canvasWidth + x) * 4; 
                    const alpha = pixels[index + 3];
                    if(alpha > 0){
                        const red = pixels[index];
                        const green = pixels[index+1];
                        const blue = pixels[index+2];
                        const color = 'rgb('+ red +','+ green +','+ blue +')';
                        this.particles.push(new Particle(this, x, y, color));       
                    }
                }
            }
            console.log(this.particles);
        }
        render(){
        ctx.globalCompositeOperaton = "source-over"
            this.particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

        }
        resize(width,height) {
            this.canvasWidth = width;
            this.canvasHeight = height;
            this.textX = this.canvasWidth /2;
            this.textY = this.canvasHeight /2;
            this.maxTextWidth = this.canvasWidth * 0.8;


            
        }
    }

    const effect = new Effect(ctx, canvas.width, canvas.height);
    effect.wrapText('Welcome to my Website!!')
    console.log(effect);
    effect.render();

    function animate(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        effect.render();
        requestAnimationFrame(animate);
    }
    animate();






    window.addEventListener('resize', function(){
    cancelAnimationFrame(flowFieldAnimation);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    console.log(`${canvas.width} x ${canvas.height}`)
    flowField = new FlowFieldEffect(ctx, canvas.width, canvas.height);
    flowField.animate(0);
        effect.resize(canvas.width, canvas.height);
        effect.wrapText(effect.textInput.value);
    });
    flowField = new FlowFieldEffect(ctx, canvas.width, canvas.height);
    flowField.animate(0);
});
