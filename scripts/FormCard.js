import Card from "./Card.js";
import { notRotatedElemetsClassNamesList } from "./data.js";
import { findElementWithSameData } from "./utils.js";
import { formCardAddFields } from "./index.js";

export default class FormCard extends Card {
  constructor(card, cardConfig) {
    super(card, cardConfig);
    this.focusableCardElements = [
      this.cardNumber,
      this.cardValid,
      this.cardHolder,
      this.cardCvv,
    ];
    this._setEventListeners();
  }

  _setEventListeners() {
    this.cardSides.forEach((side) =>
      side.addEventListener("click", (e) => {
        if (
          !notRotatedElemetsClassNamesList.some((className) =>
            e.target.classList.contains(className)
          )
        ) {
          super.hideCardFocus();
          super.rotateCard();
        }
      })
    );

    this.focusableCardElements.forEach((element) => {
      element.addEventListener("click", () => {
        const formField = findElementWithSameData(
          formCardAddFields,
          element,
          "focus"
        );
        super.moveCardFocus(element);
        formField.focus();
      });
    });
  }

  _identifyBank(num) {
    const userCardNum = num.length > 5 ? +num : 481776;
    const cardInfo = new CardInfo(userCardNum, {
      banksLogosPath: "./node_modules/card-info/dist/banks-logos/",
      brandsLogosPath: "./node_modules/card-info/dist/brands-logos/",
      brandLogoPolicy: "white",
    });

    this.cardBankLogos.forEach((logo) => {
      logo.src =
        cardInfo.bankLogo ||
        "./node_modules/card-info/dist/banks-logos/ru-sberbank.svg";
      logo.alt = cardInfo.bankName || "Sberbank";
    });

    this.cardPaymentLogos.forEach((logo) => {
      logo.src =
        cardInfo.brandLogo ||
        "./node_modules/card-info/dist/brands-logos/visa-white.svg";
      logo.alt = cardInfo.brandName || "Visa";
    });
  }

  changeCardNumber(e) {
    const inputValue = e.target.value;

    this._identifyBank(inputValue);

    this.cardNumberItems.map((n, index) => {
      if (
        n.textContent !== inputValue[index] &&
        (inputValue[index] ||
          (e.inputType === "deleteContentBackward" && n.textContent !== "#"))
      ) {
        n.classList.add(this.cardConfig.numberItemActiveClass);
        setTimeout(() => {
          n.textContent = inputValue[index] ? inputValue[index] : "#";
          n.classList.remove(this.cardConfig.numberItemActiveClass);
        }, 200);
      }
    });
  }

  _createNameItem(char) {
    const cardHolderNameItem = document.createElement("span");
    cardHolderNameItem.className = this.cardConfig.holderNameItemClass;
    cardHolderNameItem.textContent = char;
    return cardHolderNameItem;
  }

  changeCardHolderName(e) {
    const inputValue = e.target.value;
    let nameItem;
    const cardNameArr = Array.from(
      this.cardHolderName.querySelectorAll(
        this.cardConfig.holderNameItemSelector
      )
    ).map((i) => i.textContent);

    if (
      inputValue.length > 0 &&
      this.cardHolderName.textContent === "full name"
    ) {
      this.cardHolderName.textContent = "";
    }

    if (e.inputType !== "deleteContentBackward") {
      for (let i = 0; i < inputValue.length; i++) {
        if (cardNameArr[i] !== inputValue[i]) {
          nameItem = this._createNameItem(inputValue[i]);
          this.cardHolderName.append(nameItem);
        }
      }
    } else if (
      e.inputType === "deleteContentBackward" &&
      inputValue.length !== 0
    ) {
      cardNameArr.forEach((char, index) => {
        if (char !== inputValue[index]) {
          this.cardHolderName.removeChild(this.cardHolderName.lastChild);
        }
      });
    } else {
      this.cardHolderName.textContent = "full name";
    }
  }

  changeCardValidDate(e, index) {
    const selectValue = e.target.value;

    this.cardValidDateItems[index].classList.add(
      this.cardConfig.validItemActiveClass
    );

    setTimeout(() => {
      this.cardValidDateItems[index].classList.remove(
        this.cardConfig.validItemActiveClass
      );
      this.cardValidDateItems[index].textContent =
        selectValue.length === 4 ? selectValue.slice(2) : selectValue;
    }, 200);
  }

  changeCardCvv(e) {
    this.cardCvvNumber.textContent = e.target.value.replace(/[\s\S]/g, "*");
  }
}
