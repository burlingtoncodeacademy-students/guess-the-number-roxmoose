// ICEBOX - gives user the option to play either game

const { reverse } = require("dns");
const readline = require("readline");
const { start } = require("repl");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

combined()

async function combined() {
    console.log("Hello! We have two game options: Either A) You think of a number and the computer tries to guess it, or B) The computer thinks of a number and you try to guess it. Which would you like to play?")
    let game = await ask("Please input A or B => ")
    if (game === "A") {
        start()
    } else {
        reverse()
    }


async function start() {
    console.log(
      "Let's play a game where you (human) make up a number, and I (computer) try to guess it. The lowest possible number is 1."
    );
  
    let lowest = 1;
  
    // Story 6: "Extend the Guess Range"
    let highest = await ask(
      "Please enter a number that we'll use as the highest possible guess => "
    );
    highest = parseInt(highest);
  
    let secretNumber = await ask(
      "Ok, now enter a secret number between 1 and " +
        highest +
        ". (I promise I won't look.)\n"
    );
    console.log("YOUR SECRET NUMBER: " + secretNumber);
  
    // Story 1: "Pick a Number, Any Number"
    function randomNum() {
      return Math.floor(Math.random() * highest + lowest);
    }
  
    let guess = randomNum();
  
    let response = await ask("Is your number " + guess + "? yes or no? => ");
  
    // Story 2: Computer guessed correctly
    if (response === "yes") {
      console.log("Wow there was a 1 in 100 chance of that. Let's go eat cake!");
      process.exit();
    }
  
    // Story 3: Computer guessed wrong
    else {
      response = await ask(
        "I'll try again! Is your number higher (key in 'H') or lower (key in 'L')? => "
      );
      let calledTimes = 1; // ICEBOX - counting number of guesses
  
      // Stories 4 and 5: "Modify Your Guess Range" and "Make it Smarter"
  
      function guessHigher() {
        guess = Math.round((highest + guess) / 2); // using *round* here (as opposed to *floor*) so it'll *include* the high range as a possibility
        return guess;
      }
  
      function guessLower() {
        guess = Math.floor((guess + lowest) / 2);
        return guess;
      }
  
      while (response !== "yes" && response !== "Yes" && response !== "YES") {
        if (response === "H" || response === "h") {
          lowest = guess; // if human says to go higher, their most recent guess is the new lowest possible number
  
          response = await ask(
            "Higher you say? Ok. Is your number " +
              guessHigher() +
              "? \nKey in 'yes' if it is, or 'h' or 'l' for me to guess higher or lower! => "
  
          )
          // Cheat Detector attempt - but doesn't work! This never shows up.
          if (highest === lowest) {
            console.log("I got it this time.")
          }
          ;
  
          calledTimes = calledTimes += 1; // For ICEBOX 2: How many tries
        } else {
          highest = guess; // if human says to go lower, their most recent guess is the new highest possible number
          response = await ask(
            "Lower you say? Ok. Is your number " +
              guessLower() +
              "? \nKey in 'yes' if it is, or 'h' or 'l' for me to guess higher or lower! => "
          );
  
          calledTimes = calledTimes += 1; // For ICEBOX 2: How many tries
        }
      }
  
      // The following is what will print when the human says "yes" (that the computer guessed correctly)
      console.log("Yay!");
      console.log("It took me " + calledTimes + " guesses."); // for ICEBOX 2: How many tries
  
      //For ICEBOX 1: play again
      let playAgain = await ask(
        "Would you like to play again? Key in 'yes' or 'no' => "
      );
      if (playAgain === "yes") {
        start(); 
      } else {
        console.log("Thanks for playing! Byeeee");
        process.exit();
      }
    }
  
  }


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

}