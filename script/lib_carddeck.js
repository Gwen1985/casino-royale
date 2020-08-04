class cardDeck {
  constructor() {
    this.deck = [];
    this.dealt_cards = [];
  }

  generateDeck() {
    let card = (suit, value) => {
      this.name = value + " of " + "<br/>" + suit;
      this.suit = suit;
      this.value = value;
      this.image = suit.toLowerCase() + "_" + value.toLowerCase();

      return {
        name: this.name,
        suit: this.suit,
        value: this.value,
        image: this.image,
      };
    };

    let suits = ["Hearts", "Clubs", "Diamonds", "Spades"],
      //values = ['Ace', 'King', 'Queen', 'Jack', 'Ten', 'Nine', 'Eight', 'Seven', 'Six', 'Five', 'Four', 'Three', 'Two'];
      values = [
        "A",
        "K",
        "Q",
        "J",
        "10",
        "9",
        "8",
        "7",
        "6",
        "5",
        "4",
        "3",
        "2",
      ];

    suits.forEach((elementSuit) => {
      values.forEach((elementValue) => {
        this.deck.push(card(elementSuit, elementValue));
      });
    });
  }

  printDeck() {
    if (this.deck.length !== 0) {
      this.deck.forEach((deckElement) => {
        console.log(deckElement);
      });
    } else {
      console.log("The deck has not been generated.");
    }
  }

  shuffleDeck() {
    let current_index = this.deck.length,
      temp_value,
      random_index;

    while (0 !== current_index) {
      random_index = Math.floor(Math.random() * current_index);
      current_index -= 1;
      temp_value = this.deck[current_index];
      this.deck[current_index] = this.deck[random_index];
      this.deck[random_index] = temp_value;
    }
  }

  dealCard() {
    let dealt_card = this.deck.shift();
    this.dealt_cards.push(dealt_card);

    return dealt_card;
  }

  renderCard(dealt_card) {
    let cardElement = "";
    cardElement += '<div class="card border-0" style="max-width: 5rem;">';
    cardElement += '<div class="card-body singleCard">';
    cardElement += '<span class="value">' + dealt_card.value + "</span>";
    cardElement +=
      '<span class="suit ' + dealt_card.suit.toLowerCase() + '"></span>';
    cardElement += "</div>";
    // cardElement +=
    //   '<div class="card-footer-header text-left" ><small class="text-muted">' +
    //   dealt_card.name +
    //   "</small></div>";
    cardElement += "</div>";

    return cardElement;
  }

  replaceDealtCards() {
    this.deck.unshift(this.dealt_cards.shift());
  }

  clearDeck() {
    this.deck = [];
  }
}
