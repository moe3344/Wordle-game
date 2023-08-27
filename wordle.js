
var height = 4; //number of guesses
var width = 5; //length of the word

var row = 0; //current guess (attempt #)
var col = 0; //current letter for that attempt

var gameOver = false;
let wordsDict= [];
let word= "";
let hint = "";
let image = false;
let  mode = true;
let question = false;
let instruction = true;

function toggleDarkMode() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.toggle('dark-mode');
  }


function fun2(){
    if (question == false){
        document.getElementById("hint").innerHTML = "<p><i>Hint:</i> " + hint + "</p>";
        document.getElementById("hint").style.display = "block";
        question = true;
    }
    else if (question == true) {
        document.getElementById("hint").style.display = "none";
        question = false;
    }
}
//document.getElementById("btn3").onclick= function a(){
  //  document.getElementById("col2").style.display = "none"
//}

function fun3() {
    if (instruction == true) {
        document.getElementById("col2").style.display = "block";
        document.getElementById("hint-box").style.marginLeft = '70px';
      instruction = false;
    }
    else if (instruction == false) {
      document.getElementById("col2").style.display = "none";
      document.getElementById("hint-box").style.marginLeft = '400px';
        
     instruction = true;
    }
}
  


const getData = async() => {
    const res = await fetch("https://wordle-api.cyclic.app/words", {
    headers: {
    "x-api-key": "sw0Tr2othT1AyTQtNDUE06LqMckbTiKWaVYhuirv",
    },
});

    const data = await res.json();    
    wordsDict = data;
    setRandomWord();
}
function setRandomWord(){
    let index = Number.parseInt(Math.random()*wordsDict.length);
    word = wordsDict[index]["word"].toUpperCase();
    hint = word[4]+word[2]+word[0]+word[3]+word[1];
    console.log(word);
  
} 


    

    


//var word = word1.toString();

 
 



window.onload = function(){
    document.getElementById('imag').style.display = "none";
    getData(); // gets the word and the hint
    intialize(); // make the boxes
    keyboard(); // enter keys
}


function intialize() {

    // Create the game board
    for (let r = 0; r < height; r++) {
        for (let c = 0; c < width; c++) {
            // <span id="0-0" class="tile">P</span>
            let tile = document.createElement("span");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.innerText = "";
            document.getElementById("board").appendChild(tile);
        }
    }
}
function keyboard(){
    // Listen for Key Press
    document.addEventListener("keyup", (e) => {
        if (gameOver) return; 

        // alert(e.code);
        if ("KeyA" <= e.code && e.code <= "KeyZ") {
            if (col < width) {
                let currTile = document.getElementById(row.toString() + '-' + col.toString());
                if (currTile.innerText == "") {
                    currTile.innerText = e.code[3];
                    col += 1;
                }
            }
        }
        else if (e.code == "Backspace") {
            if (0 < col && col <= width) {
                col -=1;
            }
            let currTile = document.getElementById(row.toString() + '-' + col.toString());
            currTile.innerText = "";
        }

        else if (e.code == "Enter") {
            update();
            row += 1; //start new row
            col = 0; //start at 0 for new row
        }


        if (!gameOver && row == height) {
            gameOver = true;
            document.getElementById("answer").innerText ="you missed the word " +word+ " and lost ";
        }
       

    })
}


function update() {
    let correct = 0;
    for (let c = 0; c < width; c++) {
        let currTile = document.getElementById(row.toString() + '-' + c.toString());
        let letter = currTile.innerText;

        //Is it in the correct position?
        if (word[c] == letter) {
            currTile.classList.add("correct");
            correct += 1;
        } // Is it in the word?
        else if (word.includes(letter)) {
            
            
                currTile.classList.add("exist");
               
            
            }
            
        // Not in the word
        else {
            currTile.classList.add("none");
        }

        if (correct == width) {
            document.getElementById('imag').style.display = "block";
            document.getElementById("col1").style.display = "none";
            gameOver = true;
           
           
            
        }

    }
}
function Restart(){
    document.getElementById('imag').style.display = "none";
    document.getElementById("col1").style.display = "block";
    document.getElementById("answer").style.display = "none";
    clear();
   getData();
   
    

}
function clear(){
    col=0;
    row=0;
    for (let i = 0; i<4; i++){
        for(let j = 0; j<5 ; j++){
            let currTile = document.getElementById(i.toString() + '-' + j.toString());  
            currTile.innerText = "";
            currTile.classList.remove("correct");
            currTile.classList.remove("exist");
            currTile.classList.remove("none");

        }

    }
    if (gameOver == true){
        gameOver= false;
       
    }
    
}


