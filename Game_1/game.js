const gameSummary = {
  number: 0,
  wins: 0,
  losses: 0,
  draws: 0,
};

const game = {
  playerHand: null,
  aiHand: null,
};

const hands = [...document.querySelectorAll(".select img")];

function handSelection() {
  game.playerHand = this.dataset.option;
  hands.forEach((hand) => {
    hand.style.boxShadow = "";
  });
  this.style.boxShadow = "0 0 0 4px red";
}
hands.forEach((hand) => hand.addEventListener("click", handSelection));

function aiChoice() {
  const aiHand = hands[Math.floor(Math.random() * 3)].dataset.option;
  return aiHand;
}

function checkResult(player, ai) {
  if (player === ai) {
    return "draw";
  } else if (
    (player === "papier" && player === "kamień") ||
    (player === "kamień" && ai === "nożyczki") ||
    (player === "nożyczki" && ai === "papier")
  ) {
    return "win";
  } else {
    return "lose";
  }
}

function publishResult(player, ai, result) {
  document.querySelector('[data-summary="your-choice"]').textContent = player;
  document.querySelector('[data-summary="ai-choice"]').textContent = ai;
  gameSummary.number++;
  document.querySelector("p.numbers span").textContent = gameSummary.number;
  if (result === "draw") {
    gameSummary.draws++;
    document.querySelector("p.draws span").textContent = gameSummary.draws;
    document.querySelector('[data-summary="who-win"]').textContent = "Remis";
    document.querySelector('[data-summary="who-win"]').style.color = "grey";
  } else if (result === "win") {
    gameSummary.wins++;
    document.querySelector("p.wins span").textContent = gameSummary.wins;
    document.querySelector('[data-summary="who-win"]').textContent = "Wygrałeś";
    document.querySelector('[data-summary="who-win"]').style.color = "green";
  } else {
    gameSummary.losses++;
    document.querySelector("p.losses span").textContent = gameSummary.losses;
    document.querySelector('[data-summary="who-win"]').textContent =
      "Przegrałeś";
    document.querySelector('[data-summary="who-win"]').style.color = "red";
  }
}

function endGame() {
  document.querySelector(`[data-option="${game.playerHand}"]`).style.boxShadow =
    "";
  game.playerHand = null;
}

function startGame() {
  if (!game.playerHand) return alert("Wybierz dłoń");
  game.aiHand = aiChoice();
  const gameResult = checkResult(game.playerHand, game.aiHand);
  publishResult(game.playerHand, game.aiHand, gameResult);
  endGame();
}

document.querySelector(".start").addEventListener("click", startGame);
