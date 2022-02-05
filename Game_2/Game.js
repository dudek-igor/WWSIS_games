class Game {
  constructor(start) {
    this.stats = new Statistic();
    this.wallet = new Wallet(start);
    document
      .getElementById("start")
      .addEventListener("click", this.startGame.bind(this));
    this.spanWallet = document.querySelector(".panel span.wallet");
    this.boards = [...document.querySelectorAll("div.color")];
    this.inputBit = document.getElementById("bid");
    this.spanResult = document.querySelector(".score span.result");
    this.spanGames = document.querySelector(".score span.number");
    this.spanWins = document.querySelector(".score span.win");
    this.spanLosses = document.querySelector(".score span.loss");
    this.render();
  }
  // aktualizuje dane w html
  // argumenty maja przypisane z gory wlasciwosic
  render(
    colors = ["grey", "grey", "grey"],
    money = this.wallet.getWalletValue(),
    result = "",
    stats = [0, 0, 0],
    bid = 0,
    wonManey = 0
  ) {
    if (result) {
      result = `Wygrałeś ${wonManey}$.`;
    } else if (!result && result !== "") {
      result = `Przegrałes ${bid}$.`;
    }
    this.spanResult.textContent = result;

    this.spanWallet.textContent = money;
    this.spanGames.textContent = stats[0];
    this.spanWins.textContent = stats[1];
    this.spanLosses.textContent = stats[2];
    // na tablicy divow przypisujemy kazdemu startowy color
    this.boards.forEach(
      (board, index) => (board.style.backgroundColor = colors[index])
    );
  }
  // wywoalnie po przycisku zakrec
  // this traci wiazanie z naszym obiektem
  startGame() {
    if (this.inputBit.value < 1)
      return alert("Kwota, którą chcesz grać jest za mała!");
    const bid = Math.floor(this.inputBit.value);
    if (!this.wallet.checkCanPlay(bid)) {
      return alert(
        "Masz za mało środków lub podana została nie prawidłowa wartość"
      );
    }
    this.wallet.changeWallet(bid, "-");

    this.draw = new Draw();
    const colors = this.draw.getDrawResult();
    const win = Result.checkWinner(colors);
    const wonMoney = Result.moneyWinInGame(win, bid);
    this.wallet.changeWallet(wonMoney);
    this.stats.addGameToStatistic(win, bid);

    this.render(
      colors,
      this.wallet.getWalletValue(),
      win,
      this.stats.showGameStatistic(),
      bid,
      wonMoney
    );
    this.inputBit.value = "";
  }
}
