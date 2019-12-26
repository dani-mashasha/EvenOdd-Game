const readlineSync = require('readline-sync');
const Player = require('./player');

class Game{
    constructor(min, max, numOfPlayers, bestof){
        this.min = min;
        this.max = max;
        this.numOfPlayers = numOfPlayers;
        this.players = []
        this.bestof = bestof;

    }

    getRandomNum(){
        const randomNum =Math.floor( Math.random() * (this.max - this.min) + this.min);
        return randomNum;
    }

    
    play(){
        const player1 = this.players[0];
        const player2 = this.players[1];

        let winScore = Math.ceil(this.bestof/2);
        let roundWinner ;
        let round = 0;

        while(player1.score < winScore && player2.score < winScore){
           const randomNum = this.getRandomNum();

           if(randomNum % 2 == 0){
               roundWinner = player1;

           }else{
               roundWinner = player2;
           }
           roundWinner.score ++;
           round++
           console.log(`Round #${round}, random number is ${randomNum}, ${roundWinner.name} scored!
                   Status: ${player1.name} ${player1.score}, ${player2.name} ${player2.score}`)

        }
        console.log(`${roundWinner.name} Wins!!`)
    }


     startGame(){
         for(let i = 0; i < this.numOfPlayers; i++){
             const name = readlineSync.question(`Player #${i+1} please enter your name: `)
              const player = new Player(name,i);
              this.players.push(player);
          
         }
         this.play();
         

      
    }
}

const game = new Game(-5,13,2,5);

game.startGame()


