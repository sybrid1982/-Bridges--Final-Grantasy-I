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
            console.log(`You have dealt ${damage}!`);
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
 *************************************/

let startGameGUI = () => {
    console.log("This doesn't work yet!");
    // Hide the elements we don't need
    // hide the title
    document.querySelector('#gameTitle').style.display = 'none';
    document.querySelector('#startMenu').style.display = 'none';

    // Show the name screen
    document.querySelector('#nameEntry').style.display = 'flex';
    // Await name entry
}

let startGameWithName = () => {
    let playerName = document.getElementById('name').value;
    console.log(playerName);
    document.querySelector('#nameEntry').style.display = 'none';
}


// Set start buttons to work
(function(){
    document.getElementById('startGUI').addEventListener('click', startGameGUI, false);
    document.getElementById('startConsole').addEventListener('click', startGame, false);
    document.getElementById('nameSelected').addEventListener('click', startGameWithName, false);
})();