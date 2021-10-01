const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

start();

async function start() {
  console.log(
    "Let's play a game where you (human) make up a number, and I (computer) try to guess it. The lowest possible number is 1."
  );

  let lowest = 1;
  // Story 6: "Extend the Guess Range"
  let highest = await ask(
    "Please enter a number that we'll use as the highest possible guess => ");
    highest = parseInt(highest); 

  let secretNumber = await ask("Ok, now enter a secret numer between 1 and " + highest + ". (I promise I won't look.)\n");
  console.log("YOUR SECRET NUMBER: " + secretNumber);

  // Story 1: "Pick a Number, Any Number"

  function randomNum() {
    let range = highest - lowest + 1;
    return Math.floor(Math.random() * range) + lowest;
  }

  let guess = randomNum();

  let response = await ask("Is your number " + guess + "? yes or no? => ");

  // Story 2: Computer guessed correctly
  if (response === "yes") {
    console.log("Wow there was a 1 in 100 chance of that. Let's go eat cake!");
  }

  // Story 3: Computer guessed wrong
  else {
    response = await ask(
      "I'll try again! Is your number higher (key in 'H') or lower (key in 'L')? => "
    );

    // Stories 4 and 5: "Modify Your Guess Range" and "Make it Smarter"

    function guessHigher() {
      guess = Math.floor((highest + guess) / 2);
      return guess;
    }

    function guessLower() {
      guess = Math.floor((guess + lowest) / 2);
      return guess;
    }

    while (response !== "yes") {
      if (response === "H") {
        // console.log(guess, highest) // just checking to make sure it's using the correct range
        lowest = guess;
        response = await ask(
          "Higher you say? Ok. Is your number " +
            guessHigher() +
            "? \nKey in 'yes' if it is, or 'H' or 'L' for me to guess higher or lower! => "
        );
      } else {
        // console.log(lowest, guess) // just checking to make sure it's using the correct range
        highest = guess;
        response = await ask(
          "Lower you say? Ok. Is your number " +
            guessLower() +
            "? \nKey in 'yes' if it is, or 'H' or 'L' for me to guess higher or lower! => "
        );
      }
    }
    console.log("Yay!");
    process.exit();
  }

  process.exit();
}
