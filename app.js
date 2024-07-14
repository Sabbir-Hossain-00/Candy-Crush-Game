let candies = ["Blue","Blue-2","Choco","Green","Orrange","Purple","Red","Yellow","Yellow-2"];
let boards = document.querySelector(".board");
let string = "";
let h1 = document.querySelector("h1");

let board = [];
let rows = 10;
let columns = 10;
let score = 0;

let currTile;
let othTail;
let initialX, initialY, currentX, currentY;


window.onload = function(){
    startGame();
    window.setInterval(function(){
        crushCandy();
        slideCandy();
        newCandy();
    },100);
}

function rnadomCandies (){
    return candies[ Math.floor(Math.random()*candies.length)];
}
 


function startGame(){
    for(let r = 0; r < rows; r++){
        let row = [];
        for(let c = 0; c < columns; c++){
           let tile = document.createElement("img");
           tile.id = r + "_" + c;
           tile.src = rnadomCandies() + ".png";


           tile.addEventListener("dragstart",dragStart);
           tile.addEventListener("dragover",dragOver);
           tile.addEventListener("dragenter",dragEnter);
           tile.addEventListener("dragleave",dragLeave);
           tile.addEventListener("dragend",dragEnd);
          tile.addEventListener("drop",dragDrop);

          tile.addEventListener("touchstart", touchStart);
          tile.addEventListener("touchmove", touchMove);
          tile.addEventListener("touchend", touchEnd);



          boards.appendChild(tile);
          row.push(tile)
        }
        board.push(row);
    }
    console.log(board);
}

function touchStart(event) {
    event.preventDefault();
    currTile = event.targetTouches[0].target;
    initialX = event.touches[0].clientX;
    initialY = event.touches[0].clientY;
}

function touchMove(event) {
    event.preventDefault();
    if (!currTile) return;

    currentX = event.touches[0].clientX;
    currentY = event.touches[0].clientY;

    let deltaX = currentX - initialX;
    let deltaY = currentY - initialY;

    currTile.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
}

function touchEnd(event) {
    event.preventDefault();
    if (!currTile) return;

    currTile.style.transform = '';

    let element = document.elementFromPoint(currentX, currentY);
    if (element && element !== currTile && element.tagName === 'IMG') {
        othTail = element;

        dragEnd();
    }

    currTile = null;
}



function dragStart (){
    currTile = this;

}

function dragOver (e){
   e.preventDefault();
}
function dragEnter (e){
    e.preventDefault();
}


function dragLeave (){
    
}

function dragDrop(){
   othTail = this;
   

}

function dragEnd (){

    if(currTile.src.includes("blank") || othTail.src.includes("blank")){
        return;
    }

    let currCoords = currTile.id.split("_");
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);
    console.log(c);
    console.log(r);


    let othCoords = othTail.id.split("_");
    let r2 = parseInt(othCoords[0]);
    let c2 = parseInt(othCoords[1]);
    console.log(c2);
    console.log(r2);

    let moveLeft = c2 == c-1 && r == r2;
    let moveRight = c2 == c+1 && r == r2;

    let moveUp = r2 == r-1 && c == c2;
    let moveDown = r2 == r+1 && c == c2;

    let isAdjacent = moveLeft|| moveRight || moveUp || moveDown ;

    if(isAdjacent){
        let currImg = currTile.src;
        let otherImg = othTail.src;
        currTile.src = otherImg;
        othTail.src = currImg;

        let validMove = checkValid();
        if(!validMove){

        let currImg = currTile.src;
        let otherImg = othTail.src;
        currTile.src = otherImg;
        othTail.src = currImg;

        }
    }

}


function crushCandy (){
    crushThree();
    h1.innerText = "Score:"+ score;
}

function crushThree(){
    for (let r = 0 ; r < rows ;r++){
        for(let c = 0 ; c < columns-2 ; c++){
            let candy1 = board[r][c];
            let candy2 = board[r][c+1];
            let candy3 = board[r][c+2];

            if(candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")){
                candy1.src = "blank.png";
                candy2.src = "blank.png";
                candy3.src = "blank.png";
                score += 30 ;
  
            }

        }
    } 

    for(let c = 0 ; c<columns; c++){
        for(let r = 0 ; r<rows-2; r++ ){
            let candy1 = board[r][c];
            let candy2 = board[r+1][c];
            let candy3 = board[r+2][c];

            if(candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")){
                candy1.src = "blank.png";
                candy2.src = "blank.png";
                candy3.src = "blank.png";
                score += 30;
  
        }
    }
    
}
}

function checkValid(){
    for (let r = 0 ; r < rows ;r++){
        for(let c = 0 ; c < columns-2 ; c++){
            let candy1 = board[r][c];
            let candy2 = board[r][c+1];
            let candy3 = board[r][c+2];

            if(candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")){
              return true;
            }

        }
    } 

    for(let c = 0 ; c<columns; c++){
        for(let r = 0 ; r<rows-2; r++ ){
            let candy1 = board[r][c];
            let candy2 = board[r+1][c];
            let candy3 = board[r+2][c];

            if(candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")){
               return true;
  
        }
    }
    
  }
  return false;
}



function slideCandy(){
    for(let c = 0 ; c < columns ; c++){
        let ind = rows - 1;
        for(let r = columns-1 ; r>= 0; r--){
            if(!board[r][c].src.includes("blank")){
                board[ind][c].src = board[r][c].src;
                ind -= 1;
            }
        }
        for(let r = ind ; r>= 0 ; r--){
            board[r][c].src = "blank.png";
        }
    }
}

function newCandy(){
  for(let c = 0 ; c<columns; c++){
      if(board[0][c].src.includes("blank")){
        board[0][c].src = rnadomCandies() + ".png";
      }
  }
}

