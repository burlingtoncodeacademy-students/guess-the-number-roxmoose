const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
    return new Promise((resolve, reject) => {
        rl.question(questionText, resolve);
    });
}

reverse();

async function reverse() {
    console.log("Let's play a game where I (computer) think of a random number and you (human) try to guess it. The lowest possible number is 1. ")

    let lowest = 1;
    let highest = await ask("Please enter a number that we'll use as the highest possible number => ")
    highest = parseInt(highest)

    let secretNumber = Math.round(Math.random() * (highest - lowest)) + lowest
    // console.log(secretNumber) // just checking

    console.log("Ok. I'm thinking of a number between 1 and " + highest + ".")

    let guess = await ask("What is your guess? => ")
    guess = parseInt(guess)
  
    while (guess !== secretNumber) {
     if (guess > secretNumber) {
            guess = await ask("Too high! Guess lower => ")
            guess = parseInt(guess)
        } else {
            guess = await ask("Too low! Guess higher => ")
            guess = parseInt(guess)
        }

    }

    console.log("You got it! My number was indeed " + secretNumber + "! Treat yourself to some cake.")
    process.exit()

}