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

  let response = await ask("Is your number " + randomNum() + "? yes or no? => ");
  if (response === "yes") {
    console.log("Wow there was a 1 in 100 chance of that. Cool!")} else {
      console.log("Well there was only a 1 in 100 chance of that, so that makes sense. Anyways, coffee?")
    }

  process.exit();
}
