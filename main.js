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

    input() {
        let hatIndex;
        let hatRow;
        let move;
        //set initial player posititon
            // position = [row, collumn]
        let position = [0, 0];
        //find hat
        for (let i = 0; i < this.grid.length; i++){
            if (this.grid[i].indexOf(hat) != -1){
                hatRow = i;
                hatIndex = this.grid[i].indexOf(hat);
            }
        }
        //check that the hat position is still the hat. 
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
            //check if move made user lose
            if (this.grid[position[0]][position[1]] ===hole){
                console.log('Game over! You fell in a hole!');
                return ('Game over! You fell in a hole!');
            }
            if (!this.grid[position[0]][position[1]]){
                console.log(('Game over! Out of bounds!'));
                return ('Game over! out of bounds!');
            }
            //valid move, mutate arrays to splice a pathCharacter(star)
            this.grid[position[0]].splice(position[1], 1, pathCharacter);
        }
        if (this.grid[hatRow][hatIndex] != hat){
            console.log('Congrats! You got your hat! YOU WON!'); 
            return ('Congrats! You got your hat! YOU WON!');
        }
    }


    //returns a randomized two-dimensional array representing the field, inc 1 hat & >2 holes, takes arguments for height and width, and percentage of field covered by holes.
     static generateField(height, width, percentage) {
        console.log('in gen field');
        const field = [];
        //buid an base field to size 
        while (field.length < height){
            const row = []; 
            while (row.length < width){
                row.push(fieldCharacter);
            }
            field.push(row);
            // console.log(row);
        }
        // //asign pathCharacter to top left
            field[0][0] = pathCharacter;
        // assign one hat to random place 
        let randomRow = 0;
        let randomCol = 0;
        while (randomRow === 0 && randomCol === 0){
                randomRow = Math.floor(Math.random() * height);
                randomCol = Math.floor(Math.random() * width);
            }
        field[randomRow][randomCol] = hat;
        hatX = randomCol;
        hatY = randomRow;
        //assign the holes. there should be the percentage of height * width
        let numHoles = ((height * width)/100)*percentage;
        console.log(numHoles);
        //keep track of the holes
        let holesLocations = [];
        for (let i = 0; i <= numHoles; i++){
            let holeLocation = [0, 0];
            let randomRow = 0;
            let randomCol = 0;
            while (randomRow === 0 && randomCol === 0 || field[randomRow][randomCol] === hole || field[randomRow][randomCol] === hat){
                    randomRow = Math.floor(Math.random() * height);
                    randomCol = Math.floor(Math.random() * width);
            }
            holeLocation = [randomRow, randomCol];
            field[randomRow][randomCol] = hole;
            holesLocations.push(holeLocation);
        }
        
        for (const row in field) {
            console.log(field[row].join(''));
        }
    }
}

const myfield = new Field(Field.generateField(30, 20, 4));
myfield.input();

// const myField = new Field([
//     ['*', '░', '░', 'O', '░', '░'],
//   ['░','░', 'O', '░', '░', '░'],
//   ['░','░', '░', 'O', '░', '░'],
//   ['░','O', '░', '░', '░', '░'],
//   ['░','░', '░', 'O', '░', '░'],
//   ['░','░', '^', '░', '░', '░'],
//   ['░','░', 'O', '░', '░', '░'],
//   ['░','░', '░', 'O', '░', '░'],
  
// ]);





