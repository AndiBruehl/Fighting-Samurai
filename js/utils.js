
const tie = new Audio("./assets/sounds/bell.mp3");
const player1 = new Audio("./assets/sounds/player1.mp3");
const player2 = new Audio("./assets/sounds/player2.mp3");

const audio = {
    Music: new Howl({
        src: "./assets/sounds/music.mp3",
        html5: true,
        volume: 0.2
    }),
    sword: new Howl({
        src: "./assets/sounds/sword.wav",
        html5: true,
        volume: 0.7
    }),
}

function rectangularCollision({ rectangle1, rectangle2 }) {
    return (
      rectangle1.attackBox.position.x + rectangle1.attackBox.width >=
        rectangle2.position.x &&
      rectangle1.attackBox.position.x <=
        rectangle2.position.x + rectangle2.width &&
      rectangle1.attackBox.position.y + rectangle1.attackBox.height >=
        rectangle2.position.y &&
      rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
    )
  }

function determineWinner({ player, enemy, timerId }) {
    clearTimeout(timerId);
    audio.Music.stop();
    document.querySelector('#displayText').style.display = 'flex';
    if (player.health < enemy.health) {
        console.log("Player 2 wins!");
        document.querySelector('#displayText').innerHTML = '<img src="./assets/img/Player2-WINS-12-12-2023.png" alt="Player2 Image">'; 
        if (!player2.hasPlayed) {
            player2.play();
            player2.hasPlayed = true;
        }
    } else if (player.health > enemy.health) {
        console.log("Player 1 wins!");
        document.querySelector('#displayText').innerHTML = '<img src="./assets/img/Player1-WINS-12-12-2023.png" alt="Player1 Image">';
        if (!player1.hasPlayed) {
            player1.play();
            player1.hasPlayed = true;
        }
    } 
}

let timer = 60
let timerId
function decreaseTimer() {
    if (timer > 0) {
        timerId = setTimeout(decreaseTimer, 1000)
        timer--
        document.querySelector('#timer').innerHTML = timer
    }

    if (timer === 0) {

        document.querySelector('#displayText').style.display = 'flex'
        if
            (player.health > enemy.health) {
            document.querySelector('#displayText').innerHTML = 'Player1 WINS!!'
        }
        else if (player.health < enemy.health) {
            document.querySelector('#displayText').innerHTML = 'Player2 WINS!!'

        }
        else {
            console.log("It's a tie!");
            document.querySelector('#displayText').innerHTML = '<img src="./assets/img/It-s-a-TIE-12-12-2023.png" alt="Tie Image"></img>'; 

            if (!tie.hasPlayed) {
                tie.play();
                tie.hasPlayed = true;
            }

            if (audio.Music.playing()) {
                audio.Music.stop();
                audio.Music.hasPlayed = false;
            }           
        }
    }
}

document.getElementById('startButton').addEventListener('click', () => {
    // Start the game and timer here
    document.getElementById('overlay').style.display = 'none'; // Hide the overlay
    decreaseTimer(); // Start the timer
    animate(); // Start the game animation
    audio.Music.play(); // Play the game music
});