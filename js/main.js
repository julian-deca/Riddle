const keys = [[
    "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"], // Top row
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],       // Middle row
    ["Z", "X", "C", "V", "B", "N", "M"]                  // Bottom row
  ];
class Square {
    constructor(id, letter){
        this.id = id;
        this.letter = letter;
        this.html = `<div id="${this.id}" class="square">${this.letter}</div>`;
    }
    updateHtml(letter){
        this.letter = letter;
        this.html = `<div id="${this.id}" class="square">${this.letter}</div>`
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
    }
    createKeys(){
        this.html = this.baseHtml;
        this.keys.forEach(line => {
            this.html += `<div class="k-row">`;
            line.forEach(key => {
                this.html += `<div id="${key}" class="key">${key}</div>`
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
            console.log(e.key)        
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
                console.log(line.html);
                container.innerHTML += line.html;;        
        })
    }
}
const game = new Game();
