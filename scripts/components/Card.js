export default class Card {
  static selectors = {
    template: "#card-template",
    card: ".card",
    focus: ".card__focus",
    side: ".card__side",
    bankLogo: ".card__bank-logo",
    paySystemLogo: ".card__payment-system-logo",
    number: ".card__number",
    numberItem: ".card__number-item",
    valid: ".card__valid",
    validItem: ".card__valid-date-item",
    holder: ".card__holder",
    holderName: ".card__holder-name",
    holderNameItem: ".card__holder-name-item",
    cvv: ".card__cvv",
    cvvNumber: ".card__cvv-number",
  };

  static classes = {
    focusActive: "card__focus_active",
    sideVisible: "card__side_visible",
    numberItemActive: "card__number-item_active",
    validItemActive: "card__valid-date-item_active",
    holderNameItem: "card__holder-name-item",
    walletCard: "card wallet__card",
    btnTrash: "card__btn-trash",
  };

  constructor(containerSelector, node) {
    this._container = document.querySelector(containerSelector);
    this._node = node;
    this._cardElement = this._getTemplate();
    this._cardSides = this._cardElement.querySelectorAll(Card.selectors.side);
    this._cardFocus = this._cardElement.querySelector(Card.selectors.focus);
    this._cardBankLogos = this._cardElement.querySelectorAll(
      Card.selectors.bankLogo
    );
    this._cardPaySystemLogos = this._cardElement.querySelectorAll(
      Card.selectors.paySystemLogo
    );
    this._cardNumber = this._cardElement.querySelector(Card.selectors.number);
    this._cardNumberItems = [
      ...this._cardNumber.querySelectorAll(Card.selectors.numberItem),
    ];
    this._cardValid = this._cardElement.querySelector(Card.selectors.valid);
    this._cardValidDateItems = this._cardValid.querySelectorAll(
      Card.selectors.validItem
    );
    this._cardHolder = this._cardElement.querySelector(Card.selectors.holder);
    this._cardHolderName = this._cardHolder.querySelector(
      Card.selectors.holderName
    );
    this._cardCvv = this._cardElement.querySelector(Card.selectors.cvv);
    this._cardCvvNumber = this._cardCvv.querySelector(Card.selectors.cvvNumber);
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(Card.selectors.template)
      .content.querySelector(Card.selectors.card)
      .cloneNode(true);

    return cardElement;
  }

  getCardElement() {
    return this._cardElement;
  }

  renderCard() {
    this._container.prepend(this._cardElement);
  }

  rotateCard() {
    this._cardSides.forEach((side) =>
      side.classList.toggle(Card.classes.sideVisible)
    );
  }

  setDefaultCardSide() {
    this._cardSides[0].classList.add(Card.classes.sideVisible);
    this._cardSides[1].classList.remove(Card.classes.sideVisible);
  }
}
