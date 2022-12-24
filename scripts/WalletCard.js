import Card from "./Card.js";

const wallet = document.querySelector(".wallet");

export default class WalletCard extends Card {
  constructor(card, cardConfig) {
    super(card, cardConfig);
    this._createCard();
  }

  _createCard() {
    this.cardFocus.remove();
    this.card.classList = "card wallet__card";
    this._createBtnTrash();
    this._setEventListeners();
  }

  _createBtnTrash() {
    this._btnTrash = document.createElement("button");
    this._btnTrash.className = this.cardConfig.btnTrashClass;
    this._btnTrash.type = "button";
    this._btnTrash.ariaLabel = "remove card";
    this.cardSides[0].prepend(this._btnTrash);
  }

  _removeCard() {
    this._btnTrash.closest(".card").remove();
  }

  _setEventListeners() {
    this._btnTrash.addEventListener("click", () => this._removeCard());
    this.cardSides.forEach((side) => {
      side.addEventListener("click", () => super.rotateCard());
    });
  }

  renderCard() {
    wallet.prepend(this.card);
  }
}
