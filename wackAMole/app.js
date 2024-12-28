let currentMoleTile;


window.onload = function(){
    setGame(); 
}
//Create Grid in the DOM
function setGame(){
    for  (let i=0; i < 9; i++){

        let tile = document.createElement("div");
        tile.id = i.toString();
        document.getElementById("board").appendChild(tile);
    };
};

function getRandomTile(){
    let num = Math.floor(Math.random());
}


function getMole(){
    let mole = DocumentTimeline.createElement("img");
    mole.src = "./img/monty-mole.png"

    let num = getRandomTile();
}