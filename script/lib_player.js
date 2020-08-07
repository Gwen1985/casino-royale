class Player {
  static _installedGames = ["rpsls", "twentyone", "memory", "block"];

  constructor(playerName) {
    this.playerName = playerName;
    this._safePlayerName = playerName.toLowerCase().replace(/\s+/g, "");
    this.playerGames = [];
  }

  static generatePlayerScore(x) {
    let game = (game) => {
      this.score = "cr_" + game.toLowerCase() + "_score";
      this.count_total = "cr_" + game.toLowerCase() + "_count_total";
      this.count_win = "cr_" + game.toLowerCase() + "_count_win";
      this.count_loss = "cr_" + game.toLowerCase() + "_count_loss";

      return {
        score: this.score,
        count_total: this.count_total,
        count_win: this.count_win,
        count_loss: this.count_loss,
      };
    };

    this._installedGames.forEach((elementGame) => {
      x.playerGames.push(game(elementGame));
    });

    let lsPlayerID = "cr_player_id";
    let lsPlayerName = "cr_player_name";
    if (!localStorage.hasOwnProperty(lsPlayerID)) {
      console.log("Creating localStorage set for user.");
      localStorage.setItem(lsPlayerID, x._safePlayerName);
      localStorage.setItem(lsPlayerName, x.playerName);
      x.playerGames.forEach((elementGame) => {
        localStorage.setItem(elementGame.score, "0");
        localStorage.setItem(elementGame.count_total, "0");
        localStorage.setItem(elementGame.count_win, "0");
        localStorage.setItem(elementGame.count_loss, "0");
      });
    } else {
      console.log("User already has a localStorage set.");
    }
  }

  static getPlayerId() {
    return localStorage.getItem("cr_player_id");
  }

  static getPlayerName() {
    return localStorage.getItem("cr_player_name");
  }

  static getPlayerGameScoreItem(gameName, gameKey) {
    return localStorage.getItem("cr_" + gameName + "_" + gameKey);
  }

  static setPlayerGameScoreItem(gameName, gameKey, gameValue) {
    localStorage.setItem("cr_" + gameName + "_" + gameKey, gameValue);
  }

  static getPlayerTotalScore() {
    let totalScore = 0;
    this._installedGames.forEach((gameElement) => {
      totalScore += parseInt(
        localStorage.getItem("cr_" + gameElement + "_score")
      );
    });

    return totalScore;
  }
}
