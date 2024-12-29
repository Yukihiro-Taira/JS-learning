let c = document.createElement("canvas");
let img1 = new Image();

img1.onload = function(){
    document.querySelector("#image1").remove();
    w = img1.width;
    h = img1.height;

    c.width = w;
    c.width = h;
    ctx = c.getContext("2d");
    ctx.drawImage(img1,0,0);
    console.log(ctx);

    let pixelArr = ctx.getImageData(0,0,w,h).data;
    let sample_size =80;

    for(let y=0;y<h;y+=sample_size){
        for(let x=0;x<w;x+=sample_size) {
            let p = (x+(y*w))*4;
            ctx.fillStyle = "rgba(" + pixelArr[p] + "" + pixelArr[p+1] + "" + pixelArr[p+2] + "" + pixelArr[p+3] + ")";
            ctx.fillRect(x, y, sample_size, sample_size)
        };


    

    let img2 = new Image();
    img2.src = c.toDataURL('image/jpeg');
    img2.width.body = 1000;
    document.body.appendChild(img2);
    };

}
img1.src = document.querySelector("#image1").src;