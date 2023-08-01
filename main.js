const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';


class Field {
    constructor(field = [[]]){
        this.field = field;
        //set initial player position
        this.positionY = 0; //row
        this.positionX = 0; //col
        //asign pathCharacter to top left
        field[0][0] = pathCharacter;
        

    }

    print() {
        for (const row in this.field) {
            console.log(this.field[row].join(''));
        }
    }

    play() {
        let playing = true;
        // find hat, save its location
        //find hat
        let hatIndex;
        let hatRow;
        for (let i = 0; i < this.field.length; i++){
            if (this.field[i].indexOf(hat) != -1){
                hatRow = i;
                hatIndex = this.field[i].indexOf(hat);
            }
        }

        while (playing){
            this.print();
            this.input();

            //check if move made user OUT
            if (this.isOut()) {
                console.log(('Game over! You went out of bounds!'));
                playing = false;
                break;
            }

            //check if move made user LOSE
            if (this.isHole()) {
                console.log('Game over! You fell in a hole!');
                playing = false;
                break;
            }

            //valid move, mutate arrays to splice a pathCharacter(star)
            this.field[this.positionY][this.positionX]= pathCharacter;

            //check is user WON
            if (this.positionY === hatRow && this.positionX === hatIndex){
                console.log('Congrats! You got your hat! YOU WON!');
                playing = false;
                break;
            }
        }
        
        }



    input() {
        const move = prompt("Where do you want to go? ( l, r, u, d ) ").toLowerCase();
            // set current position according to move
            switch (move) {
                case 'l':
                    this.positionX -= 1;
                    break;
                case 'r':
                    this.positionX += 1;
                    break;
                case 'u':
                    this.positionY -= 1;
                    break;
                case 'd':
                    this.positionY += 1;
                    break;
                }
    }

    isOut(){
        if (this.positionY < 0 || this.positionX < 0 || this.positionY > this.field.length -1  || this.positionX > this.field[0].length - 1){ 
            return true;
        }
    }

    isHole(){
        return this.field[this.positionY][this.positionX] === hole;
    }

    
    //returns a randomized two-dimensional array representing the field, inc 1 hat & >2 holes, takes arguments for height and width, and percentage of field covered by holes.
     static generateField(height, width, percentage) {
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

        //assign the holes. there should be the percentage of height * width
        let numHoles = ((height * width)/100)*percentage;
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

        return field
    }
}

const myfield = new Field(Field.generateField(20, 20, 15));
myfield.play();





