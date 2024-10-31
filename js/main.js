const keys = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"], // Top row
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],       // Middle row
    ["Enter","Z", "X", "C", "V", "B", "N", "M","Backspace"]                  // Bottom row
  ];
class Square {
    constructor(id, letter){
        this.id = id;
        this.letter = letter;
        this.setHtml();
        this.isEmpty = true;
    }
    updateHtml(letter){
        this.letter = letter;
        this.html = `<div id="${this.id}" class="square">${this.letter}</div>`
    }
    setHtml(){
        this.html = `<div id="${this.id}" class="square">${this.letter}</div>`;
    }
    setLetter(letter){
        this.letter = letter;
        this.isEmpty = false;
        this.setHtml();
    }
}
class Line {
    constructor(id){
        this.id = id;
        this.baseHtml = `<div id="${this.id}" class="line">`
        this.squares = [];
        this.generateSquares();
        this.mapSquares();
        this.isPlayed = false;
        
    }
    generateSquares(){
        for(let i=0;i<5;i++){
            let square =  new Square(`${this.id}-${i}`,"")
            this.squares.push(square);
        }
    }
    mapSquares(){
        this.html = this.baseHtml;
        this.squares.forEach(square => {
            // console.log(square.html)
            this.html  += square.html
        });
        this.html += "</div>"
    }
}
class Keyboard {
    constructor(keys){
        this.keys = keys;
        this.baseHtml = `<div class="keyboard">`
        this.createKeys();
        this.mapKeys();
        this.htmlKeys = document.getElementsByClassName("keyboard-key")

    }
    createKeys(){
        this.html = this.baseHtml;
        this.keys.forEach(line => {
            this.html += `<div class="k-row">`;
            line.forEach(key => {
                if (key=="Enter"){
                    this.html += `<div id="${key}" class="btn btn-secondary button keyboard-key">${key}</div>`

                }
                else if (key=="Backspace"){
                    this.html += `<div id="${key}" class="button keyboard-key"> <i id="${key}" class="fi fi-tr-delete delete"></i></div>`
                }
                else{

                    this.html += `<div id="${key}" class="key keyboard-key">${key}</div>`
                }
            });
            this.html += `</div>`;
        })
        this.html += `</div>`
    }
    mapKeys(){
        let keyboard = document.getElementById("keyboard")
        keyboard.innerHTML = this.html;
    }
}

// console.log(createLines());




class Game {
    constructor(){
        this.lines = this.createLines();
        this.keyboard = new Keyboard(keys);
        this.mapLines();
        
        addEventListener('keyup',(e)=>{

            let array = this.keyboard.keys[0].concat(this.keyboard.keys[1],this.keyboard.keys[2]);
            // console.log(array);
                if(array.includes(e.key.toUpperCase()) || array.includes(e.key)){ 
                    this.addLetter(e.key);
                }
        
        });
        Array.from(this.keyboard.htmlKeys).forEach((key)=>{
            key.addEventListener("click", ()=>{
                // console.log(key.id)
                this.addLetter(key.id);
            });
            key.addEventListener("touchstart", ()=>{
                this.addLetter(key.id);
            });
        });
        
    }
    createLines(){
        let lines = [];
        for(let i=0;i<6;i++){
            let line = new Line(i)
            lines.push(line);
        }
        return lines;
    }
    mapLines(){
        const container = document.getElementById('container');
        container.innerHTML = "";
        this.lines.forEach((line)=>{
                container.innerHTML += line.html;;        
        })
    }
    enter(line){
        // console.log(line);
        let playedWord = "";
        line.squares.forEach(square=>{
            playedWord += square.letter;
        })
        console.log(playedWord)
    }
    delete(line){
        const fullSquare = line.squares.findLast(square=>!square.isEmpty);
        if(fullSquare){
            fullSquare.setLetter("");
            fullSquare.isEmpty = true;
            line.mapSquares();
            this.mapLines();
        }
    }

    addLetter(letter) {
        letter = letter.toUpperCase();
        const emptyLine  = this.lines.find((line)=>!line.isPlayed)
        if(emptyLine){            
                switch(letter){
                    case "ENTER":
                        this.enter(emptyLine);
                        break;
                    case "BACKSPACE":
                    case "DELETE":
                        this.delete(emptyLine);
                        break;
                    default:
                        const emptySquare = emptyLine.squares.find((square)=>square.isEmpty);
                        if(emptySquare){
                        if(letter.length == 1 && letter != " "){
                            emptySquare.setLetter(letter);
                            emptyLine.mapSquares();
                            this.mapLines()
                        }
                        }   
                        break;
                }
                
                // console.log(emptyLine);
            }
        }
    }

const game = new Game();
