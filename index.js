'use strict';

const gameboardArray = [
  {
    name: 'Gameboard 1',
    array: [
      [0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 1, 1, 1, 1, 0, 0],
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 1, 0, 0, 0, 1, 0, 0, 0],
      [1, 0, 0, 1, 1, 0, 0, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0, 0, 0, 1, 1, 0],
      [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
  }, {
    name: 'Gameboard 2',
    array: [
      [0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 1, 1, 1, 1, 0, 0],
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 1, 0, 0, 0, 1, 0, 0, 0],
      [1, 0, 0, 1, 1, 0, 0, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0, 0, 0, 1, 1, 0],
      [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
  }, {
    name: 'Gameboard 3',
    array: [
      [0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 1, 1, 1, 1, 0, 0],
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 1, 0, 0, 0, 1, 0, 0, 0],
      [1, 0, 0, 1, 1, 0, 0, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 0, 0, 0, 0, 1, 1, 0],
      [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
  }
];

class BaseElement {
    createElement() {
        console.log('Not implemented here!');
    }
    
    setElement() {
        this.elementState = {
            element: this.createElement()
        }
        
        this.initialize();
        
        return this.getElement();
    }
    
    getElement() {
        return this.elementState.element;
    }
    initialize() {
        
    }
}

//funkcja Cell dziedziczy BaseElement
class Cell extends BaseElement {
    constructor({ isShip, gameboard }) { //constructor musi sie wykonac
        super();
        this.isShip = isShip; // pole na rzecz obiektu // true/false
        this.gameboard = gameboard;
        this.state = 'unknown'; //stan bazowy(biala komorka)
        this.onClick = this.fireTorpedo;
    }
    createElement() {
        const element = document.createElement('div'); //tworzy <div></div>
        element.addEventListener('click', this.onClick.bind(this));
        
        return element;
    }
    
    setState(state) {
        this.state = state;
        this.refresh();
    }
    
    fireTorpedo() {
        this.gameboard.totalClicks += 1;
        
        if (this.gameboard.totalClicks > 30) {
            alert('Przegrales!');
        }
        if (this.isShip) { //this.isShip === true
           if (this.state !== 'unknown') {
               return false;
           }

           this.gameboard.score += 1;

            // gameResult.innerHTML = '';
            while (gameResult.firstChild) {
                gameResult.removeChild(gameResult.firstChild);
            }
        
            gameResult.append(`${this.gameboard.score}/${this.gameboard.totalScore}/${this.gameboard.totalClicks}`)
            
            this.setState('hit');
        } else {
            while (gameResult.firstChild) {
                gameResult.removeChild(gameResult.firstChild);
            }
        
            gameResult.append(`${this.gameboard.score}/${this.gameboard.totalScore}/${this.gameboard.totalClicks}`)

            this.setState('miss');
        }
    }
    
    refresh() {
        // this.getElement().className = 'cell-' + this.state;
        this.getElement().className = `cell-${this.state}`; // 'cell-hit'/'cell-miss', interpolacja
    }
    
    initialize() {
        this.refresh();
    }
}

class Gameboard extends BaseElement {
    constructor(size) {
        super();
        this.cells = [];
        this.rowNumber = size;
        this.columnNumber = size;
        this.fleet = gameboardArray[Math.floor(Math.random() * gameboardArray.length)]; // wybor tablicy, losowanie
        this.score = 0; //poczatkowy score
        this.totalScore = this.getTotalScore();
        this.totalClicks = 0;
        
        for (let rowIndex = 0; rowIndex < this.rowNumber; ++rowIndex) {
            for (let columnIndex = 0; columnIndex < this.columnNumber; ++columnIndex)
                this.cells.push(new Cell({
                    isShip: this.fleet.array[rowIndex][columnIndex] === 1 ? true : false,
                    gameboard: this
                }));
        }

        gameResult.append(`${this.score}/${this.totalScore}`)
    }
        
        createElement() {
            const gameboard = document.createElement('div');
            gameboard.className = 'gameboard';
            
            for (let rowIndex = 0; rowIndex < this.rowNumber; ++rowIndex) {
                const row = document.createElement('div');
                row.classname = 'board-row';
            
                for (let columnIndex = 0; columnIndex < this.columnNumber; ++columnIndex) {
                    const cell = this.cells[rowIndex * this.columnNumber + columnIndex];
            
                    row.appendChild(cell.setElement());
                }
            gameboard.appendChild(row);
            
            }
            
            return gameboard;
        }
        
    
    getTotalScore(fleet) {
        let total = 0;
        
        // fleet.array.forEach(function(row) {
            
        // });
        
        this.fleet.array.forEach((row) => {
            // total = total + [1, 1, 1].length === 3;
            total += row.filter((x) => {return x === 1}).length
            
        });
        
        return total;
    }
}

const gameboardContainer = document.getElementById('gameboardContainer');
const gameResult = document.getElementById('gameResult');
const gameboard = new Gameboard(10);
gameboardContainer.appendChild(gameboard.setElement());








// let x = .createElement()
// let x = <div></div>

/*
do petli forEach potrzebujemy tablicy
*/
