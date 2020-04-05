let screen = document.getElementById("screen");
let ctx = screen.getContext('2d');

let width = 20;
let height = 20; 

let obj = [];

let map = [
    'wwwwwwwwwwwwwwww',
    'w              w',
    'w              w',
    'w              w',
    'w              w',
    'w              w',
    'w              w',
    'w              w',
    'w   wwwww      w',
    'w   w   w      w',
    'w   w   w      w',
    'w   w          w',
    'w   w   w      w',
    'w   w   w      w',
    'w   w   w      w',
    'wwwwwwwwwwwwwwww',
];

class Player{
    constructor(options){
        this.x = options.x;
        this.y = options.y;
        this.rad = options.rad;
        this.color = options.color;
        this.dx = options.dx;
        this.dy = options.dy;
        this.xprevious = options.xprevious;
        this.yprevious = options.yprevious;
    }
}
function createPlayer(x, y, rad, color, dx, dy, xprevious, yprevious){
    player = new Player ({
        x: x,
        y: x,
        rad: rad,
        color: color,
        dx: dx,
        dy: dy,
        xprevious: xprevious,
        yprevious: yprevious
    }
    )
}

createPlayer(150, 150, 16, 'red', 0, 0, 0, 0);

let walls = [];
class Wall{
    constructor(options){
        this.x = options.x;
        this.y = options.y;
        this.width = options.width;
        this.height = options.height;
        this.type = options.type;
    }
};

function createWall(x, y, width, height, type){
    newWall = new Wall(
        {
            x: x,
            y: y,
            width: width,
            height: height,
            type: type,
        }
    );
    walls.push(newWall);
}


//create and draw map
function createMap(){
    let valOfString = 0;
    let valOfSymbol = 0;

    for (let i = 0; i < map.length; i++){
        for (let j = 0; j < map[i].length; j++){
            if (map[i][j] == "w"){
                createWall(valOfSymbol, valOfString, 32, 32, 1);
            } 
            valOfSymbol+=32;
        };

        valOfString += 32;
        valOfSymbol = 0;
    }
}

function drawWall(){
    for (let i = 0; i < walls.length; i++){
        ctx.fillRect(walls[i].x, walls[i].y, walls[i].width, walls[i].height);
    }
}
function drawPlayer(){
    ctx.beginPath();
    ctx.arc(player.x,player.y,16,0,2*Math.PI);
    ctx.fillStyle = 'black';
    ctx.fill();
}
//ejail

//main
createMap()  

function loop(){
    
    //clear screen
    ctx.clearRect(0, 0, screen.width, screen.height);
      
    drawWall();
    drawPlayer();
    player.xprevious = player.x;
    player.yprevious = player.y;
    player.x += player.dx;
    player.y += player.dy;
//     if ((obj1.x + obj1.width >= obj2.x) && (obj1.x <= obj2.x + obj2.width)) XColl = true;
//   if ((obj1.y + obj1.height >= obj2.y) && (obj1.y <= obj2.y + obj2.height)) YColl = true;
    for (let i = 0; i < walls.length; i++){
        if (
        (walls[i].x < player.x + 12) &&
        (walls[i].x + walls[i].width > player.x - 12)&&
        (walls[i].y <  player.y + 12) &&
        (walls[i].y + walls[i].height > player.y - 12))
        {
            player.y = player.yprevious;
            player.x = player.xprevious;
        }}
        
    
}


window.addEventListener("keydown", function(event) {

    if (event.keyCode === 65) {
      player.dx = -4;
      console.log('PRESS LEFT');
    } else if(event.keyCode === 68){
        player.dx = 4;
        console.log('PRESS RIGHT');
    } else if(event.keyCode === 87){
        player.dy = -4;
        console.log('PRESS UP');
    } else if(event.keyCode === 83){
        player.dy = 4;
        console.log('PRESS DOWN');
  }}
)
window.addEventListener("keyup", function(event) {

    if (event.keyCode === 65) {
      player.dx = 0;
      console.log('UP LEFT');
    } else if(event.keyCode === 68){
        player.dx = 0;
        console.log('UP RIGHT');
    } else if(event.keyCode === 87){
        player.dy = 0;
        console.log('UP UP');
    } else if(event.keyCode === 83){
        player.dy = 0;
        console.log('UP DOWN');
  }}
)
setInterval(loop, 60);
