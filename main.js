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
        // we need to keep asking fro input until the star is on the hat
        // need ot define a how to move. 

        // check if the user has won. 
        // first find the hat. scope. need to remember where the hat WAS even when it ihas changed to a star. 
        let hatIndex;
        let hatRow;
        let move;
        //set initial player posititon
        // position = [row, collumn]
        let position = [0, 0];
        for (let i = 0; i < this.grid.length; i++){
            if (this.grid[i].indexOf(hat) != -1){
                hatRow = i;
                hatIndex = this.grid[i].indexOf(hat);
            }
        }

        // then find all the stars. if any of the stars are in the same place as the hat? 
        //check that the hat position is not now a star, is still the hat. 
            // if yes, print 'you won'
            // else, prompt move
       
        while (this.grid[hatRow][hatIndex] === hat ){

            myField.print();
            move = prompt("Which way? ( l, r, u, d ) ");
            // set current position
            switch (move) {
                case 'l':
                    position[1]--;
                    break;
                case 'r':
                    position[1]++;
                    break;
                case 'u':
                    position[0]--;
                    break;
                case 'd':
                    position[0]++;
                    break;
                }
            if (this.grid[position[0]][position[1]] ===hole){
                console.log('Game over! You fell in a hole!');
                return ('Game over! You fell in a hole!');
            }
            if (!this.grid[position[0]][position[1]]){
                console.log(('Game over! Out of bounds!'));
                return ('Game over! out of bounds!');
            }
            this.grid[position[0]].splice(position[1], 1, pathCharacter);
            
        }
        if (this.grid[hatRow][hatIndex] != hat){
            console.log('Congrats! You got your hat! YOU WON!'); 
        }



        // when move made, mutate arrays to sawp a star

    }

}


const myField = new Field([
    ['*', '░', '░', 'O', '░', '░'],
  ['░','░', 'O', '░', '░', '░'],
  ['░','░', '░', 'O', '░', '░'],
  ['░','O', '░', '░', '░', '░'],
  ['░','░', '░', 'O', '░', '░'],
  ['░','░', '^', '░', '░', '░'],
  ['░','░', 'O', '░', '░', '░'],
  ['░','░', '░', 'O', '░', '░'],
  
]);



myField.input();

