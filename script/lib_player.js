class Player {

    _installedGames = ['rpsls', 'twentyone'];

    constructor(playerName) {
        this.playerName = playerName;
        this._safePlayerName = playerName.toLowerCase().replace(/\s+/g, '');
        this.playerGames = [];
    }

    static generatePlayerScore(x) {

        let game = (game) => {
            this.score = 'cr_' + x._safePlayerName + '_' + game.toLowerCase() + '_score';
            this.count_total = 'cr_' + x._safePlayerName + '_' + game.toLowerCase() + '_count_total';
            this.count_win = 'cr_' + x._safePlayerName + '_' + game.toLowerCase() + '_count_win';
            this.count_loss = 'cr_' + x._safePlayerName + '_' + game.toLowerCase() + '_count_loss';

            return {
                score: this.score,
                count_total: this.count_total,
                count_win: this.count_win,
                count_loss: this.count_loss
            }
        };

        x._installedGames.forEach((elementGame) => {
            x.playerGames.push(game(elementGame));
        });

        let lsPlayerNameKey = 'cr_' + x._safePlayerName + '_name';
        if (!localStorage.hasOwnProperty(lsPlayerNameKey)) {
            console.log('Creating localStorage set for user.');
            localStorage.setItem(lsPlayerNameKey, x.playerName);
            x.playerGames.forEach((elementGame) => {
                localStorage.setItem(elementGame.score, '0');
                localStorage.setItem(elementGame.count_total, '0');
                localStorage.setItem(elementGame.count_win, '0');
                localStorage.setItem(elementGame.count_loss, '0');
            });
        }
        else {
            console.log('User already has a localStorage set.');
        }
    }

    getPlayerGameScoreItem(gameName, gameKey) {
        return localStorage.getItem('cr_' + this._safePlayerName + '_' + gameName + '_' + gameKey);
    }

    setPlayerGameScoreItem(gameName, gameKey, gameValue) {
        localStorage.setItem('cr_' + this._safePlayerName + '_' + gameName + '_' + gameKey, gameValue);
    }

    getPlayerTotalScore() {
        let totalScore = 0;
        this._installedGames.forEach((gameElement) => {
            totalScore += parseInt(localStorage.getItem('cr_' + this._safePlayerName + '_' + gameElement + '_score'));
        });

        return totalScore;
    }

}