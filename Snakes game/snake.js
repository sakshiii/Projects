


function init(){
    canvas = document.getElementById("mycanvas")
    W=canvas.width=500
    H=canvas.height=500
    pen = canvas.getContext('2d')      
    rect={
        x:20,
        y:20,
        w:40,
        h:40,
        speed:10,
    }
     game_over=false
    
}

function draw(){
    
    pen.clearRect(0,0,W,H);
    pen.fillStyle = 'red'
    pen.fillRect(rect.x,rect.y,rect.w,rect.h);
        
}

function update(){
    rect.x+=rect.speed;
    if(rect.x>W-rect.w || rect.x<0)
        rect.speed*=-1;
}

function gameloop(){
    
    draw();
    update();
}
init()
var f = setInterval(gameloop,100)

if(game_over==true)
    clearInterval(f);