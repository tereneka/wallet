import Card from "./Card.js";
import { findElementWithSameData, getRandomInt } from "../utils.js";
import { cardBackList } from "../data.js";
import "../../node_modules/card-info/dist/card-info.min.js";

export default class FormCard extends Card {
  static notRotatedElemetsClassNamesList = [
    "card__number",
    "card__number-item",
    "card__valid",
    "card__label",
    "card__valid-date",
    "card__valid-date-item",
    "card__holder",
    "card__holder-name",
    "card__holder-name-item",
    "card__cvv",
    "card__cvv-number",
  ];

  constructor(containerSelector, formFieldsList) {
    super(containerSelector);
    this.cardFieldsList = [
      this._cardNumber,
      this._cardValid,
      this._cardHolder,
      this._cardCvv,
    ];
    this._formFieldsList = formFieldsList;
    this._createCard();
  }

  _createCard() {
    this.setCardSidesBack();
    this._setEventListeners();
    return this._cardElement;
  }

  setCardSidesBack() {
    const index = getRandomInt(0, 4);
    this._cardSides.forEach((side) => {
      side.style.backgroundImage = `url(${cardBackList[index]})`;
    });
  }

  _handleCardSideClick(e) {
    if (
      !FormCard.notRotatedElemetsClassNamesList.some((className) =>
        e.target.classList.contains(className)
      )
    ) {
      this.hideCardFocus();
      super.rotateCard();
    }
  }

  _handleCardFieldClick(cardField) {
    const formField = findElementWithSameData(
      this._formFieldsList,
      cardField,
      "focus"
    );
    this.moveCardFocus(cardField);
    formField.focus();
  }

  _setEventListeners() {
    this._cardSides.forEach((side) =>
      side.addEventListener("click", this._handleCardSideClick.bind(this))
    );

    this.cardFieldsList.forEach((cardField) => {
      cardField.addEventListener("click", () =>
        this._handleCardFieldClick(cardField)
      );
    });
  }

  _identifyBank(num) {
    const userCardNum = num.length > 5 ? +num : 481776;
    const cardInfo = new CardInfo(userCardNum, {
      banksLogosPath: "./node_modules/card-info/dist/banks-logos/",
      brandsLogosPath: "./node_modules/card-info/dist/brands-logos/",
      brandLogoPolicy: "white",
    });

    this._cardBankLogos.forEach((logo) => {
      logo.src =
        cardInfo.bankLogo ||
        "./node_modules/card-info/dist/banks-logos/ru-sberbank.svg";
      logo.alt = cardInfo.bankName || "Sberbank";
    });

    this._cardPaySystemLogos.forEach((logo) => {
      logo.src =
        cardInfo.brandLogo ||
        "./node_modules/card-info/dist/brands-logos/visa-white.svg";
      logo.alt = cardInfo.brandName || "Visa";
    });
  }

  setCardNumber(e) {
    const inputValue = e.target.value;

    this._identifyBank(inputValue);

    this._cardNumberItems.map((n, index) => {
      if (
        n.textContent !== inputValue[index] &&
        (inputValue[index] ||
          (e.inputType === "deleteContentBackward" && n.textContent !== "#"))
      ) {
        n.classList.add(Card.classes.numberItemActive);
        setTimeout(() => {
          n.textContent = inputValue[index] ? inputValue[index] : "#";
          n.classList.remove(Card.classes.numberItemActive);
        }, 200);
      }
    });
  }

  _createNameItem(char) {
    const cardHolderNameItem = document.createElement("span");
    cardHolderNameItem.className = Card.classes.holderNameItem;
    cardHolderNameItem.textContent = char;

    return cardHolderNameItem;
  }

  setCardHolderName(e) {
    const inputValue = e.target.value;
    let nameItem;
    const cardNameArr = this._cardHolderNameItems.map((i) => i.textContent);

    if (
      inputValue.length > 0 &&
      this._cardHolderName.textContent === "full name"
    ) {
      this._cardHolderName.textContent = "";
    }

    if (e.inputType !== "deleteContentBackward") {
      for (let i = 0; i < inputValue.length; i++) {
        if (cardNameArr[i] !== inputValue[i]) {
          nameItem = this._createNameItem(inputValue[i]);
          this._cardHolderName.append(nameItem);
        }
      }
    } else if (
      e.inputType === "deleteContentBackward" &&
      inputValue.length !== 0
    ) {
      cardNameArr.forEach((char, index) => {
        if (char !== inputValue[index]) {
          this._cardHolderName.removeChild(this._cardHolderName.lastChild);
        }
      });
    } else {
      this.cardHolderName.textContent = "full name";
    }
  }

  setCardValidDate(e, index) {
    const selectValue = e.target.value;

    this._cardValidDateItems[index].classList.add(Card.classes.validItemActive);

    setTimeout(() => {
      this._cardValidDateItems[index].classList.remove(
        Card.classes.validItemActive
      );
      this._cardValidDateItems[index].textContent =
        selectValue.length === 4 ? selectValue.slice(2) : selectValue;
    }, 200);
  }

  setCardCvv(e) {
    this._cardCvvNumber.textContent = e.target.value.replace(/[\s\S]/g, "*");
  }

  moveCardFocus(cardField) {
    if (
      !cardField
        .closest(Card.selectors.side)
        .classList.contains(Card.classes.sideVisible)
    ) {
      this.rotateCard();
    }

    this._cardFocus.classList.add(Card.classes.focusActive);
    this._cardFocus.style.cssText = `
  width: ${cardField.clientWidth}px;
  height: ${cardField.clientHeight}px;
  top: ${cardField.offsetTop - 10}px;
  left: ${cardField.offsetLeft - 10}px;
  `;
  }

  hideCardFocus() {
    this._cardFocus.classList.remove(Card.classes.focusActive);
    this._cardFocus.style.cssText = "";
  }

  setDefaultCardFieldes() {
    this._cardNumberItems.forEach((i) => (i.textContent = "#"));
    this._cardValidDateItems[0].textContent = "mm";
    this._cardValidDateItems[1].textContent = "yy";
    this._cardHolderName.textContent = "full name";
    this._cardCvvNumber.textContent = "";
    this._cardBankLogos.forEach((logo) => {
      logo.src = "./node_modules/card-info/dist/banks-logos/ru-sberbank.svg";
      logo.alt = "Sberbank";
    });

    this._cardPaySystemLogos.forEach((logo) => {
      logo.src = "./node_modules/card-info/dist/brands-logos/visa-white.svg";
      logo.alt = "Visa";
    });
  }
}
