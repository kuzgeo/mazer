let screen = document.getElementById("screen");
let ctx = screen.getContext('2d');
let scoreEl = document.getElementById("score");

let score = 0;
let width = 20;
let height = 20; 

let wall = [];
let coin = [];

let map = [
    'wwwwwwwwwwwwwwww',
    'wsssssssssswwwww',
    'wsssswwsssswsssw',
    'wsssswwsssswsssw',
    'wsssssssssswsssw',
    'w    wwsssswsssw',
    'w    wwsssswsssw',
    'w    wwssssssssw',
    'w   wwwwwssssssw',
    'w   w   wssssssw',
    'w   w   wwww   w',
    'w   w          w',
    'w   w   wwww   w',
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

createPlayer(48, 48, 16, 'red', 0, 0, 0, 0);

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

class Coin{
    constructor(options){
        this.x = options.x;
        this.y = options.y;
        this.rad = options.rad;
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

function createCoin(x, y, rad, type){
    newCoin = new Coin(
        {
            x: x,
            y: y,
            rad: rad,
            type: type,
        }
    );
    coin.push(newCoin);
}

//create and draw map
function createMap(){
    let valOfString = 0;
    let valOfSymbol = 0;

    for (let i = 0; i < map.length; i++){
        for (let j = 0; j < map[i].length; j++){
            if (map[i][j] == "w"){
                createWall(valOfSymbol, valOfString, 32, 32, 1);
            }  else if (map[i][j] == 's'){
                createCoin(valOfSymbol, valOfString, 8, 2);
                
            }
            valOfSymbol+=32;
        };

        valOfString += 32;
        valOfSymbol = 0;
    }
}

function drawWalls(){
    for (let i = 0; i < walls.length; i++){
        if (walls[i].type == 1){
            ctx.beginPath();
            ctx.fillRect(walls[i].x, walls[i].y, walls[i].width, walls[i].height);
            ctx.fillStyle = 'black';
            ctx.fill();
            ctx.closePath();
        } 
    }
}
function drawCoin(){
    for (let i = 0; i < coin.length; i++){
        if(coin[i].type == 2){
            ctx.beginPath();
            ctx.arc(coin[i].x + 16,coin[i].y + 16,coin[i].rad,0,2*Math.PI);
            ctx.fillStyle = 'yellow';
            ctx.fill();
            ctx.closePath();
        }
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
    scoreEl.innerHTML = `Score: ${score}`;
    drawWalls();
    drawCoin();
    drawPlayer();
    player.xprevious = player.x;
    player.yprevious = player.y;
    player.x += player.dx;
    player.y += player.dy;

    for (let i = 0; i < walls.length; i++){
        if (
        (walls[i].x < player.x + 13) &&
        (walls[i].x + walls[i].width > player.x - 13)&&
        (walls[i].y <  player.y + 13) &&
        (walls[i].y + walls[i].height > player.y - 13))
        {
            player.y = player.yprevious;
            player.x = player.xprevious;
        }}
    for (let i = 0; i < coin.length; i++){
        if (
            (coin[i].x < player.x + 13) &&
            (coin[i].x + coin[i].rad > player.x - 13)&&
            (coin[i].y <  player.y + 13) &&
            (coin[i].y + coin[i].rad > player.y - 13))
        {
            coin.splice(i,1);
            score += 1;
        }
    }

    
}


window.addEventListener("keydown", function(event) {

    if (event.keyCode === 65) {
      player.dx = -4;
    //   player.dy = 0;
    //   console.log('PRESS LEFT: x: ' + player.x + ' y: ' + player.y);
    } else if(event.keyCode === 68){
        player.dx = 4;
        // player.dy = 0;
        // console.log('PRESS RIGHT: x: ' + player.x + ' y: ' + player.y);
    } else if(event.keyCode === 87){
        player.dy = -4;
        // player.dx = 0;
        // console.log('PRESS UP: x: ' + player.x + ' y: ' + player.y);
    } else if(event.keyCode === 83){
        player.dy = 4;
        // player.dx = 0;
        // console.log('PRESS DOWN: x: ' + player.x + ' y: ' + player.y);
  }}
)
window.addEventListener("keyup", function(event) {
    // player.dx = 0;
    // player.dy = 0;
    if (event.keyCode === 65) {
      player.dx = 0;
    //   console.log('UP LEFT');
    } else if(event.keyCode === 68){
        player.dx = 0;
        // console.log('UP RIGHT');
    } else if(event.keyCode === 87){
        player.dy = 0;
        // console.log('UP UP');
    } else if(event.keyCode === 83){
        player.dy = 0;
        // console.log('UP DOWN');
  }
    }
)
setInterval(loop, 60);
