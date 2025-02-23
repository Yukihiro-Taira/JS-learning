let c = document.createElement("canvas");
let img1 = new Image();

img1.onload = function(){
    document.getElementsById("image1").remove();
    w = img1.width;
    h = img1.height;

    c.width = w;
    c.width = h;
    ctx = c.getContext("2d");
    ctx.drawImage(img1,0,0);

    let pixelArr = ctx.getImageData(0,0,w,h).data;
    let sample_size =40;

    for(let y=0;y<h;Y+=sample_size)
        for(let x=0;x<w;x+=sample_size) {
            let p = (x+(y*w))*4;
            ctx.fillStyle = "rgba(" + pixelArr[p] + "" + pixelArr[p+1] + "" + pixelArr[p+2] + "" + pixelArr[p+3] + ")";
            ctx.fillRect(x,y,sample_size,sample_size)
        };


    

    let img2 = new Image();
    img2.src = c.toDataURL('image/jpeg');
    img2.width.body = 600;
    document.body.appendChild(img2);


}
img1.src = document.getElementById("image1").src
