let startGame = () => {
    let play = prompt("Would you like to play?");
    if(play.toLowerCase() === 'yes') {
        let playerName = prompt("Name your champion!");
        startCombat(playerName);
    }
}

let messageSender = (message, targetFn) => {
    targetFn(message);
}

let consoleLog = (message) => {
    console.log(message);
}

let startCombat = (playerName) => {
    let playerHealth = 40;
    let grantHealth = 10;
    let wins = 0;

    while(playerHealth > 0) {
        let choice = prompt("Whilst thou Attack or Quit?");
        if(choice && choice.toLowerCase()==='quit') {
            console.log(`${playerName} has fled the field!  Grant is victorious!`);
            break;
        } else if (!choice || choice.toLowerCase()==='attack') {
            let damage = getDamage(1,5);
            grantHealth -= damage;
            console.log(`You have dealt ${damage} to Grant!`);
        } else {
            console.log(`I don't understand ${choice}.  You must Attack or Quit.`);
        }
        if(grantHealth <= 0) {
            wins++;
            messageSender('Grant slumps to the ground.', consoleLog);
            if(wins >= 3) {
                console.log(`Grant fails to rise again.  You are victorious!`);
                break;
            } else {
                grantHealth = 10;
                if(wins === 1) {
                    messageSender(`What sorcery is this?  Though Grant had fallen, he rises again!`, consoleLog);
                } else if (wins === 2) {
                    messageSender(`Can Grant be stopped?  Some sort of foul (or maybe fowl?) magic brings him back to his feet!`, consoleLog);
                }
            }
        } else {
            console.log(`Grant has ${grantHealth} health left!`);
            let damage = getDamage(1,5);
            playerHealth -= damage;
            console.log(`Grant deals ${damage} to ${playerName}`);
            if(playerHealth <= 0) {
                console.log(`${playerName} has fallen!  Grant is victorious!`);
            } else {
                console.log(`${playerName} has ${playerHealth} life left!`);
            }
        }
    }
}

let getDamage = (min, max) => {
    return (Math.floor(Math.random() * (max - min + 1)) + min);
}

/************************************
 * Everything past this point is related to 
 * running the game so that you get stuff
 * in the browser window
 * 
 * You can skip anything written after here
 * 
 * Especially if I can't get it working :D
 * 
 * I feel like I should be trying to wrap all this
 * in an IFEE but I'm not entirely sure how to go
 * about doing that.
 *************************************/

let gameState = {
    grantHealth: 10,
    playerHealth: 40,
    wins: 0,
    gameOver: false,
    messages: [],
    addMessage: addMessage = (msg) => {
        if(gameState.messages && gameState.messages.length > 4) {
            console.log('ShiftCalled');
            for(let i = 1; i < 5; i++) {
                console.log(gameState.messages[i-1] + ' ' + gameState.messages[i]);
                gameState.messages[i-1] = gameState.messages[i];
            }
            gameState.messages[4] = msg;
        } else if (gameState.messages) {
            gameState.messages.push(msg);
        } else {
            gameState.messages[0]=msg;
        }
    }
}

let startGameGUI = () => {
    console.log("This doesn't work yet!");
    // Hide the elements we don't need
    // hide the title
    document.querySelector('#gameTitle').style.display = 'none';
    document.querySelector('#startMenu').style.display = 'none';

    // Show the name screen
    document.querySelector('#nameEntry').style.display = 'flex';
}

let startGameWithName = () => {
    let playerName = document.getElementById('name').value;
    console.log(playerName);
    document.querySelector('#nameEntry').style.display = 'none';

    startCombatGUI();
}

let messageGUI = (message) => {
    gameState.addMessage(message);
    let msg = gameState.messages.toString();
    msg = msg.replace(/,/g,'</br>');
    document.querySelector('#topCombatMessage').innerHTML = msg;
}

let checkGrantDeath = () => {
    if(gameState.grantHealth <= 0) {
        gameState.wins++;
        messageSender('Grant slumps to the ground.', messageGUI);

        switch(gameState.wins) {
            case 0:
                break;
            case 1:
                messageSender(`What sorcery is this?  Though Grant had fallen he rises again!`, messageGUI);
                gameState.grantHealth = 10;
                break;
            case 2:
                messageSender(`Can Grant be stopped?  Some sort of foul (or maybe fowl?) magic brings him back to his feet!`, messageGUI);
                gameState.grantHealth = 10;
                break;
            default:
                messageSender(`Grant fails to rise again.  You are victorious!`, messageGUI);
                endGameGUI();
                break;
        }
    }
}

let attackGUI = () => {
    if(!gameState.gameOver) {
        let damage = getDamage(1,5);
        gameState.grantHealth -= damage;
        messageSender(`You have dealt ${damage} to Grant!`, messageGUI);
        checkGrantDeath();
    }
}

let fleeGUI = () => {
    if(!gameState.gameOver) {
        messageSender(`You flee the field, Grant is victorious!`, messageGUI);
        endGameGUI();
    }
}

let endGameGUI = () => {
    gameState.gameOver = true;
    // Show some sort of option to restart the game
}

let startCombatGUI = () => {
    gameState.grantHealth = 10;
    gameState.playerHealth = 40;
    gameState.wins = 0;
    gameState.gameOver = false;
    gameState.messages = [];

    document.getElementById('combatScreen').style.display = 'flex';
    document.getElementById('attack').addEventListener('click', attackGUI, false);
    document.getElementById('flee').addEventListener('click', fleeGUI, false);
}

// Set start buttons to work
(function(){
    document.getElementById('startGUI').addEventListener('click', startGameGUI, false);
    document.getElementById('startConsole').addEventListener('click', startGame, false);
    document.getElementById('nameSelected').addEventListener('click', startGameWithName, false);
})();