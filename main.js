const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';


class Field {
    constructor(grid){
      this.grid = grid;
    }

    print() {
        for (const row in this.grid) {
            console.log(this.grid[row].join(''));
        }
    }

    //essentially, what we are doing, is changing things into stars. 
    //the user is prompted : to 'move' the star. 
    //this will mean changing one of the elements if the arrays of the grid to a * ie 'pathCharacter'
    // if the element to be changed if a O ie 'hole' or is outside of the array, then LOSE 
    // if the element is a ░ ie 'fieldCharacter, change to a *. 
    // if the element to be changed is the 'hat' ^ , then WIN!
    // TO DO : 
    // make method to ask the user or input
    // make a method that checks how that input affects the grid
    // add input to grid 
    // state win or loss

    input() {
        // we need to keep 
        let move = prompt("Where shall we go? ( l, r, u, d ) ");
        if (move === 'r'){
            console.log('you went right!');
        }
    }

}


const myField = new Field([
    ['*', '░', 'O'],
  ['░', 'O', '░'],
  ['░', '^', '░'],
  ['░', 'O', '░'],
  ['░', '░', '░'],
]);


myField.print();

myField.input();

