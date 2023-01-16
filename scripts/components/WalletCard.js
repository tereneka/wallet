import Card from "./Card.js";

export default class WalletCard extends Card {
  constructor(containerSelector, node) {
    super(containerSelector, node);
    this._createCard();
  }

  _getTemplate() {
    const cardElement = document.importNode(this._node, true);

    return cardElement;
  }

  _createCard() {
    this._cardFocus.remove();
    this._cardElement.classList = "card wallet__card";
    this._addBtnTrash();
    this._setEventListeners();

    return this._cardElement;
  }

  _addBtnTrash() {
    this._btnTrash = document.createElement("button");
    this._btnTrash.className = Card.classes.btnTrash;
    this._btnTrash.type = "button";
    this._btnTrash.ariaLabel = "remove card";
    this._cardSides[0].prepend(this._btnTrash);
  }

  _handleTrashClick() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _setEventListeners() {
    this._btnTrash.addEventListener("click", this._handleTrashClick.bind(this));
    this._cardSides.forEach((side) => {
      side.addEventListener("click", super.rotateCard.bind(this));
    });
  }
}
