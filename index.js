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
    "Let's play a game where you (human) make up a number between 1 and 100, and I (computer) try to guess it."
  );
  let secretNumber = await ask(
    "What is your secret number?\nI won't peek, I promise...\n"
  );
  console.log("You entered: " + secretNumber);

  // Story 1: "Pick a Number, Any Number"

  let lowest = 1;
  let highest = 100;

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
    let newResponse = await ask(
      "Well there was only a 1 in 100 chance of me guessing correctly, so that makes sense. Let's try again! Is your number higher (key in 'H') or lower (key in 'L')? => "
    );

    // Story 4: "Modify Your Guess Range"

    function guessHigher() {
      return Math.floor((highest + guess) / 2);
    }

    function guessLower() {
      return Math.floor((guess + lowest) / 2);
    }

    if (newResponse === "H") {
      console.log(guess, highest) // just checking to make sure it's using the correct range
      console.log(
        "Higher you say? Ok. Is your number " + guessHigher() + "? => "
      );
    } else {
      console.log(lowest, guess) // just checking to make sure it's using the correct range
      console.log(
        "Lower you say? Ok. Is your number " + guessLower() + "? => "
      );
    }
  }

  process.exit();
}
