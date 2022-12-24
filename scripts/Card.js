import { getRandomInt } from "./utils.js";
import { cardBackList } from "./data.js";

export default class Card {
  constructor(card, cardConfig) {
    this.card = card;
    this.cardConfig = cardConfig;
    this.cardSides = this.card.querySelectorAll(this.cardConfig.sideSelector);
    this.cardFocus = this.card.querySelector(this.cardConfig.focusSelector);
    this.cardBankLogos = this.card.querySelectorAll(
      this.cardConfig.bankLogoSelector
    );
    this.cardPaymentLogos = this.card.querySelectorAll(
      this.cardConfig.paySystemLogSelector
    );
    this.cardNumber = this.card.querySelector(this.cardConfig.numberSelector);
    this.cardNumberItems = Array.from(
      this.cardNumber.querySelectorAll(this.cardConfig.numberItemSelector)
    );
    this.cardValid = this.card.querySelector(this.cardConfig.validSelector);
    this.cardValidDateItems = this.cardValid.querySelectorAll(
      this.cardConfig.validItemSelector
    );
    this.cardHolder = this.card.querySelector(this.cardConfig.holderSelector);
    this.cardHolderName = this.cardHolder.querySelector(
      this.cardConfig.holderNameSelector
    );
    this.cardCvv = this.card.querySelector(this.cardConfig.cvvSelector);
    this.cardCvvNumber = this.cardCvv.querySelector(
      this.cardConfig.cvvNumberSelector
    );
  }

  changeCardSidesBack() {
    const index = getRandomInt(0, 4);
    this.cardSides.forEach((side) => {
      side.style.backgroundImage = `url(${cardBackList[index]})`;
    });
  }

  rotateCard() {
    this.cardSides.forEach((side) =>
      side.classList.toggle(this.cardConfig.sideVisibleClass)
    );
  }

  setDefaultCardSide() {
    this.cardSides[0].classList.add(this.cardConfig.sideVisibleClass);
    this.cardSides[1].classList.remove(this.cardConfig.sideVisibleClass);
  }

  setDefaultCardFieldes() {
    this.cardNumberItems.forEach((i) => (i.textContent = "#"));
    this.cardValidDateItems[0].textContent = "mm";
    this.cardValidDateItems[1].textContent = "yy";
    this.cardHolderName.textContent = "full name";
    this.cardCvvNumber.textContent = "";
    this.cardBankLogos.forEach((logo) => {
      logo.src = "./node_modules/card-info/dist/banks-logos/ru-sberbank.svg";
      logo.alt = "Sberbank";
    });

    this.cardPaymentLogos.forEach((logo) => {
      logo.src = "./node_modules/card-info/dist/brands-logos/visa-white.svg";
      logo.alt = "Visa";
    });
  }

  moveCardFocus(element) {
    if (
      !element
        .closest(this.cardConfig.sideSelector)
        .classList.contains(this.cardConfig.sideVisibleClass)
    ) {
      this.rotateCard();
    }

    this.cardFocus.classList.add(this.cardConfig.focusActiveClass);
    this.cardFocus.style.cssText = `
  width: ${element.clientWidth}px;
  height: ${element.clientHeight}px;
  top: ${element.offsetTop - 10}px;
  left: ${element.offsetLeft - 10}px;
  `;
  }

  hideCardFocus() {
    this.cardFocus.classList.remove(this.cardConfig.focusActiveClass);
    this.cardFocus.style.cssText = "";
  }
}
