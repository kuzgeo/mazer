let screen = document.getElementById('screen');
let ctx = screen.getContext('2d');
let maze = [];
height = 19;
width = 19;

for (let i = 0; i < height; i++){
    maze.push('')
    for (let j = 0; j < width; j++){
        if ((j % 2 == 0) || (j == width - 1) || (i == 0) || (i == height - 1) || (i % 2 == 0)){
            maze[i] += 'w';
        } else {
            maze[i] += 'a';
        }
        
    };
}



for (let i = 0; i < height; i++){
    for (let j = 0; j < width; j++){
        if (maze[i][j] == 'w'){
            ctx.fillRect(j * 16, i * 16, 16, 16);
        }
        
    }



}
