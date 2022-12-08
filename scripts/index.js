import { notRotatedElemetsClassNamesList } from "./data.js";

const content = document.querySelector(".content");

const btnPopupCardAdd = document.querySelector(".header__add-card-btn");

const popupCardAdd = document.querySelector(".popup");

const newCard = popupCardAdd.querySelector(".card");
const newCardSides = newCard.querySelectorAll(".card__side");
const newCardFocus = newCard.querySelector(".card__focus");
const newCardNumber = newCard.querySelector(".card__number");
const newCardNumberItems = Array.from(
  newCardNumber.querySelectorAll(".card__number-item")
);
const newCardValid = newCard.querySelector(".card__valid");
const newCardValidDateItems = newCardValid.querySelectorAll(
  ".card__valid-date-item"
);
const newCardHolder = newCard.querySelector(".card__holder");
const newCardHolderName = newCardHolder.querySelector(".card__holder-name");
const templateCardHolder = document.querySelector("#holder-name-item").content;
const newCardCvv = newCard.querySelector(".card__cvv");
const newCardCvvNumber = newCardCvv.querySelector(".card__cvv-number");
const newCardBankLogos = newCard.querySelectorAll(".card__bank-logo");
const newCardPaymentLogos = newCard.querySelectorAll(
  ".card__payment-system-logo"
);
const focusableCardElements = [
  newCardNumber,
  newCardValid,
  newCardHolder,
  newCardCvv,
];

const formCardAdd = popupCardAdd.querySelector(".popup__form");
const inputCardNumber = formCardAdd.querySelector("[name='cardNumber']");
const inputCardHolder = formCardAdd.querySelector("[name='cardHolder']");
const selectCardMonth = formCardAdd.querySelector("[name='cardMonth']");
const selectCardYear = formCardAdd.querySelector("[name='cardYear']");
const inputCardCvv = formCardAdd.querySelector("[name='cardCvv']");
const btnResetFormCardAdd = formCardAdd.querySelector(
  ".popup__form-btn_type_reset"
);
const formCardAddFields = [
  inputCardNumber,
  inputCardHolder,
  selectCardMonth,
  selectCardYear,
  inputCardCvv,
];

const wallet = document.querySelector(".wallet");
const walletCardList = wallet.querySelectorAll(".card");

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

function togglePopup(popup) {
  popup.classList.toggle("popup_opened");
}

function togglePopupBtn(btn) {
  btn.classList.toggle(`${btn.id}_opened`);
}

function toggleContentVisibility() {
  content.classList.toggle("content_invisible");
}

function changeCardSidesBack(cardSides) {
  const randomCardBackNum = getRandomInt(1, 5);
  cardSides.forEach((element) => {
    element.style.backgroundImage = `url(./images/back/back${randomCardBackNum}.png)`;
  });
}

function rotateCard(cardSides) {
  cardSides.forEach((side) => side.classList.toggle("card__side_visible"));
}

function setDefaultCardSide(cardSides) {
  cardSides[0].classList.add("card__side_visible");
  cardSides[1].classList.remove("card__side_visible");
}

function moveCardFocus(element, cardSides, cardFocus) {
  if (
    !element.closest(".card__side").classList.contains("card__side_visible")
  ) {
    rotateCard(cardSides);
  }

  cardFocus.classList.add("card__focus_active");
  cardFocus.style.cssText = `
  width: ${element.clientWidth}px;
  height: ${element.clientHeight}px;
  top: ${element.offsetTop - 10}px;
  left: ${element.offsetLeft - 10}px;
  `;
}

function removeCardFocus(cardFocus) {
  cardFocus.classList.remove("card__focus_active");
  cardFocus.style.cssText = "";
}

function findElementWithSameData(arr, element, key) {
  let result = arr.find((i) => i.dataset[key] === element.dataset[key]);
  return result;
}

function stopTypingNotInt(e) {
  e.target.value = e.target.value.replace(/[^0-9.]/g, "");
}

function stopTypingNotLetter(e) {
  e.target.value = e.target.value.replace(/[^a-zA-Z\s.]/g, "");
}

function identifyBank(num) {
  const userCardNum = num.length > 5 ? +num : 481776;
  const cardInfo = new CardInfo(userCardNum, {
    banksLogosPath: "./node_modules/card-info/dist/banks-logos/",
    brandsLogosPath: "./node_modules/card-info/dist/brands-logos/",
    brandLogoPolicy: "white",
  });

  newCardBankLogos.forEach((logo) => {
    logo.src =
      cardInfo.bankLogo ||
      "./node_modules/card-info/dist/banks-logos/ru-sberbank.svg";
    logo.alt = cardInfo.bankName || "Sberbank";
  });

  newCardPaymentLogos.forEach((logo) => {
    logo.src =
      cardInfo.brandLogo ||
      "./node_modules/card-info/dist/brands-logos/visa-white.svg";
    logo.alt = cardInfo.brandName || "Visa";
  });
}

function createNameItem(letter) {
  const cardHolderNameItem = templateCardHolder
    .cloneNode(true)
    .querySelector(".card__holder-name-item");
  cardHolderNameItem.textContent = letter;
  return cardHolderNameItem;
}

function resetPopupCardAdd() {
  newCardNumberItems.forEach((i) => (i.textContent = "#"));
  newCardValidDateItems[0].textContent = "mm";
  newCardValidDateItems[1].textContent = "yy";
  newCardHolderName.textContent = "full name";
  newCardCvvNumber.textContent = "";
  newCardBankLogos.forEach((logo) => {
    logo.src = "./node_modules/card-info/dist/banks-logos/ru-sberbank.svg";
    logo.alt = "Sberbank";
  });

  newCardPaymentLogos.forEach((logo) => {
    logo.src = "./node_modules/card-info/dist/brands-logos/visa-white.svg";
    logo.alt = "Visa";
  });
  formCardAdd.reset();
}

function cloneCard() {
  const cloneCard = document.importNode(newCard, true);
  const cloneCardSides = cloneCard.querySelectorAll(".card__side");
  const cloneCardFocus = cloneCard.querySelector(".card__focus");
  const btnTrash = document.createElement("button");

  setDefaultCardSide(cloneCardSides);

  cloneCardFocus.remove();

  cloneCard.classList = "card wallet__card wallet__card_active";

  btnTrash.className = "card__btn-trash";
  btnTrash.type = "button";
  btnTrash.ariaLabel = "remove card";
  btnTrash.addEventListener("click", () => {
    btnTrash.closest(".card").remove();
  });
  cloneCardSides[0].prepend(btnTrash);

  cloneCardSides.forEach((side) => {
    side.addEventListener("click", () => rotateCard(cloneCardSides));
  });

  return cloneCard;
}

function submitFormCardAdd(e) {
  e.preventDefault();
  removeCardFocus(newCardFocus);
  setDefaultCardSide(newCardSides);
  togglePopup(popupCardAdd);
  togglePopupBtn(btnPopupCardAdd);
  toggleContentVisibility();

  setTimeout(() => {
    resetPopupCardAdd();
    changeCardSidesBack(newCardSides);
  }, 800);

  wallet.prepend(cloneCard());
}

btnPopupCardAdd.addEventListener("click", () => {
  if (!popupCardAdd.classList.value.includes("popup_opened")) {
    changeCardSidesBack(newCardSides);
  }
  toggleContentVisibility();
  togglePopup(popupCardAdd);
  togglePopupBtn(btnPopupCardAdd);

  setTimeout(() => {
    removeCardFocus(newCardFocus);
    setDefaultCardSide(newCardSides);
    resetPopupCardAdd();
  }, 800);
});

changeCardSidesBack(newCardSides);

newCardSides.forEach((side) =>
  side.addEventListener("click", (e) => {
    if (
      !notRotatedElemetsClassNamesList.some((className) =>
        e.target.classList.contains(className)
      )
    ) {
      removeCardFocus(newCardFocus);
      rotateCard(newCardSides);
    }
  })
);

focusableCardElements.forEach((element) => {
  element.addEventListener("click", () => {
    const formField = findElementWithSameData(
      formCardAddFields,
      element,
      "focus"
    );
    moveCardFocus(element, newCardSides, newCardFocus);
    formField.focus();
  });
});

formCardAddFields.forEach((field) => {
  field.addEventListener("focus", () => {
    const cardElement = findElementWithSameData(
      focusableCardElements,
      field,
      "focus"
    );
    moveCardFocus(cardElement, newCardSides, newCardFocus);
  });
});

popupCardAdd.addEventListener("click", (e) => {
  if (e.target === e.currentTarget) {
    removeCardFocus(newCardFocus);
  }
});

inputCardNumber.addEventListener("input", (e) => {
  stopTypingNotInt(e);
  let inputValue = e.target.value;

  identifyBank(inputValue);

  newCardNumberItems.map((n, index) => {
    if (
      n.textContent !== inputValue[index] &&
      (inputValue[index] ||
        (e.inputType === "deleteContentBackward" && n.textContent !== "#"))
    ) {
      n.classList.add("card__number-item_active");
      setTimeout(() => {
        n.textContent = inputValue[index] ? inputValue[index] : "#";
        n.classList.remove("card__number-item_active");
      }, 200);
    }
  });
});

inputCardHolder.addEventListener("input", (e) => {
  stopTypingNotLetter(e);
  const inputValue = e.target.value;
  let nameItem;
  const cardNameArr = Array.from(
    newCardHolderName.querySelectorAll(".card__holder-name-item")
  ).map((i) => i.textContent);

  if (inputValue.length > 0 && newCardHolderName.textContent === "full name") {
    newCardHolderName.textContent = "";
  }

  if (e.inputType !== "deleteContentBackward") {
    for (let i = 0; i < inputValue.length; i++) {
      if (cardNameArr[i] !== inputValue[i]) {
        nameItem = createNameItem(inputValue[i]);
        newCardHolderName.append(nameItem);
      }
    }
  } else if (
    e.inputType === "deleteContentBackward" &&
    inputValue.length !== 0
  ) {
    cardNameArr.forEach((letter, index) => {
      if (letter !== inputValue[index]) {
        newCardHolderName.removeChild(newCardHolderName.lastChild);
      }
    });
  } else {
    newCardHolderName.textContent = "full name";
  }
});

[selectCardMonth, selectCardYear].forEach((select, index) => {
  select.addEventListener("change", (e) => {
    const inputValue = e.target.value;

    newCardValidDateItems[index].classList.add("card__valid-date-item_active");

    setTimeout(() => {
      newCardValidDateItems[index].classList.remove(
        "card__valid-date-item_active"
      );
      newCardValidDateItems[index].textContent =
        inputValue.length === 4 ? inputValue.slice(2) : inputValue;
    }, 200);
  });
});

inputCardCvv.addEventListener("input", (e) => {
  stopTypingNotInt(e);
  newCardCvvNumber.textContent = e.target.value.replace(/[\s\S]/g, "*");
});

btnResetFormCardAdd.addEventListener("click", resetPopupCardAdd);

formCardAdd.addEventListener("submit", submitFormCardAdd);
