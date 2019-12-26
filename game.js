const readlineSync = require('readline-sync');
const Player = require('./player');
const Boss = require('./boss');


class Game{
    constructor(min, max, bestof){
        this.min = min;
        this.max = max;
        this.numOfPlayers = this.chooseNumOfPlayers();
        this.players = []
        this.bestof = bestof;

    }
    chooseNumOfPlayers(){
        let numOfPlayers = readlineSync.question(`Choose number of players: `);
        while(numOfPlayers < 2 || numOfPlayers > 7 ){
             numOfPlayers = readlineSync.question(`Please choose a valid number of player (beetwin 2 - 7): `);
        }

        return numOfPlayers
    }

    getRandomNum(){
        const randomNum =Math.floor( Math.random() * (this.max - this.min) + this.min);
        return randomNum;
    }

    
    play(){

        let winScore = Math.ceil(this.bestof/2);
        let roundWinner ;
        let round = 0;
        let endTournament = false;
        
        while(!endTournament){
            let player1 = this.players[Math.floor(Math.random() * Math.floor(this.players.length))];
            let player2 = this.players[this.players.indexOf(player1)+1 ? this.players.indexOf(player1)+1 : this.players.indexOf(player1)-1 ];

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
                        Status: ${player1.name} ${player1.score}, ${player2.name} ${player2.score}`);

                    player1 = this.players[Math.floor(Math.random() * Math.floor(this.players.length))];
                    player2 = this.players[Math.floor(Math.random() * Math.floor(this.players.length))];
                    while(player1 == player2){
                        player2 = this.players[Math.floor(Math.random() * Math.floor(this.players.length))];
                    }
     
             }
             console.log(`${roundWinner.name} Wins the Tournament !!`);
             
             endTournament = !endTournament;


         }
        
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

const game = new Game(-5,13,5);

game.startGame()


