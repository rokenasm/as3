let upPressed = false;
let downPressed = false;
let leftPressed = false;
let rightPressed = false;

const main = document.querySelector('main');

//Player = 2, Wall = 1, Enemy = 3, Point = 0
let maze = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 0, 1, 0, 0, 0, 0, 3, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 0, 0, 1, 0, 3, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 3, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

//Populates the maze in the HTML
for (let y of maze) {
    for (let x of y) {
        let block = document.createElement('div');
        block.classList.add('block');

        switch (x) {
            case 1:
                block.classList.add('wall');
                break;
            case 2:
                block.id = 'player';
                let mouth = document.createElement('div');
                mouth.classList.add('mouth');
                block.appendChild(mouth);
                break;
            case 3:
                block.classList.add('enemy');
                break;
            default:
                block.classList.add('point');
                block.style.height = '1vh';
                block.style.width = '1vh';
        }

        main.appendChild(block);
    }
}

//Player movement


function keyUp(event) {
    if (event.key === 'ArrowUp') {
        upPressed = false;
    } else if (event.key === 'ArrowDown') {
        downPressed = false;
    } else if (event.key === 'ArrowLeft') {
        leftPressed = false;
    } else if (event.key === 'ArrowRight') {
        rightPressed = false;
    }
}

function keyDown(event) {
    if (event.key === 'ArrowUp') {
        upPressed = true;
    } else if (event.key === 'ArrowDown') {
        downPressed = true;
    } else if (event.key === 'ArrowLeft') {
        leftPressed = true;
    } else if (event.key === 'ArrowRight') {
        rightPressed = true;
    }
}

const player = document.querySelector('#player');
const playerMouth = player.querySelector('.mouth');
let playerTop = 0;
let playerLeft = 0;


/* COLLISION WALLS COMPLETED*/
setInterval(function() {
    pointCheck();
    if (downPressed == true) {

        let position = player.getBoundingClientRect()
        let newBottom = position.bottom +1;
        let btmL = document.elementFromPoint(position.left, newBottom);
        let btmR = document.elementFromPoint(position.right, newBottom);

        if (btmL.classList.contains('wall')== false && btmR.classList.contains('wall') == false) {
            playerTop++;
            player.style.top = playerTop + 'px';     
        }
    
          playerMouth.classList='down';
    }
    

    
    if(upPressed == true) {

        let position = player.getBoundingClientRect()
        let newTop = position.top -1;
        
        let topL = document.elementFromPoint(position.left, newTop);
        let topR = document.elementFromPoint(position.right, newTop);

        if (topL.classList.contains('wall')== false && topR.classList.contains('wall') == false) {
            playerTop--;
            player.style.top = playerTop + 'px';

        }
        playerMouth.classList = 'up';
    }

       


    if(leftPressed == true) {
        let position = player.getBoundingClientRect()
        let newLeft = position.left - 1;
        let topL = document.elementFromPoint (newLeft, position.top);
        let btmL = document.elementFromPoint (newLeft, position.bottom);

        if(topL.classList.contains('wall ') == false && btmL.classList.contains('wall') == false) {
             playerLeft--;
            player.style.left =playerLeft + 'px'
        }
        
        playerMouth.classList = 'left';
        }

    if(rightPressed == true) {
        let position = player.getBoundingClientRect()
        let newRight = position.right +1;
        let topR = document.elementFromPoint(newRight, position.top)
        let btmR = document.elementFromPoint(newRight, position.bottom)
        
        if (topR.classList.contains('wall')== false && btmR.classList.contains('wall')==false) {
        playerLeft++;
        player.style.left = playerLeft + 'px';
        
        }
      playerMouth.classList = 'right';
    }
    
}, 10);


/*  POINTS COMPLETED */

function pointCheck() {
    const position = player.getBoundingClientRect();
    const points = document.querySelectorAll('.point');

    for (let i = 0; i < points.length; i++) {
        let pos = points[i].getBoundingClientRect();
        if (
            position.right > pos.left &&
            position.left < pos.right &&
            position.bottom > pos.top &&
            position.top < pos.bottom

        ) {
            points[i].classList.remove('point');
        }
    }

}
    

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);




/* TITLE COMPLETED */
let start1 = document.querySelector('#start1');

start1.onclick = function(){
    start1.parentNode.removeChild(start1);
}

/* COLOURS */


const colors = document.querySelectorAll('li');

for (let i =0 ; i < colors.length; i++) {
    colors[i].addEventListener('click', setColor);
}

function setColor() {
    player.style.backgroundColor = this.id;
}


/* CLOSE SIDEBAR */

function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    const main = document.getElementById("main");

    if (sidebar.style.left === "0px") {
        sidebar.style.left = "-250px";
        main.style.marginLeft = "0";
    } else {
        sidebar.style.left = "0px";
        main.style.marginLeft = "250px";
    }
}

