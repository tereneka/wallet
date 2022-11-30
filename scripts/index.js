// let bankNum = 4377730000000000;

const btnPopup = document.querySelector(".header__popup-btn");
const popup = document.querySelector(".popup");

const card = popup.querySelector(".card");
const cardFocus = card.querySelector(".card__focus");
const cardSides = card.querySelectorAll(".card__side");
const cardBankLogos = card.querySelectorAll(".card__bank-logo");
const cardPaymentLogos = card.querySelectorAll(".card__payment-system-logo");
const cardBlockLogos = card.querySelector(".card__block_for_logos");
const cardBlackLine = card.querySelector(".card__black-line");
const cardNumber = card.querySelector(".card__number");
const cardNumberItems = cardNumber.querySelectorAll(".card__number-item");
const cardValid = card.querySelector(".card__valid");
const cardValidDate = cardValid.querySelector(".card__valid-date");
const cardValidDateItems = cardValidDate.querySelectorAll(
  ".card__valid-date-item"
);
const cardHolder = card.querySelector(".card__holder");
const cardHolderName = cardHolder.querySelector(".card__holder-name");
const templateCardHolder = document.querySelector("#holder-name-item").content;
const cardCvv = card.querySelector(".card__cvv");
const cardCvvNumber = cardCvv.querySelector(".card__cvv-number");

const form = popup.querySelector(".popup__form");
const inputCardNumber = form.querySelector("[name='cardNumber']");
const inputCardHolder = form.querySelector("[name='cardHolder']");
const selectCardMonth = form.querySelector("[name='cardMonth']");
const selectCardYear = form.querySelector("[name='cardYear']");
const inputCardCvv = form.querySelector("[name='cardCvv']");
const btnFormReset = form.querySelector(".popup__form-btn_type_reset");
const formFields = [
  inputCardNumber,
  inputCardHolder,
  selectCardMonth,
  selectCardYear,
  inputCardCvv,
];

const rotaryElements = [
  ...cardBankLogos,
  ...cardPaymentLogos,
  cardBlockLogos,
  cardBlackLine,
];
const focusableCardElements = [cardNumber, cardValid, cardHolder, cardCvv];

function togglePopup() {
  btnPopup.classList.toggle("header__popup-btn_open");
  popup.classList.toggle("popup_closed");
}

function toggleCardSide() {
  card.classList.toggle("card_rotated");
  cardSides.forEach((side) => side.classList.toggle("card__side_visible"));
}

function setDefaultCardSide() {
  card.classList.remove("card_rotated");
  cardSides[0].classList.add("card__side_visible");
  cardSides[1].classList.remove("card__side_visible");
}

function moveCardFocus(element) {
  if (
    !element.closest(".card__side").classList.contains("card__side_visible")
  ) {
    toggleCardSide();
  }

  cardFocus.classList.add("card__focus_active");
  cardFocus.style.cssText = `
  width: ${element.clientWidth}px;
  height: ${element.clientHeight}px;
  top: ${element.offsetTop - 10}px;
  left: ${element.offsetLeft - 10}px;
  `;
}

function removeFocus() {
  cardFocus.classList.remove("card__focus_active");
  cardFocus.style.cssText = "";
}

function findElementWithSameData(arr, element, key) {
  let result = arr.find((i) => i.dataset[key] === element.dataset[key]);
  return result;
}

function focusCardElement(element) {
  let formField = findElementWithSameData(formFields, element, "focus");
  formField.focus();
  moveCardFocus(element);
}

function focusFormField(field) {
  let cardElement = findElementWithSameData(
    focusableCardElements,
    field,
    "focus"
  );
  moveCardFocus(cardElement);
}

function rotateCard() {
  toggleCardSide();
  removeFocus();
}

function createNameItem(letter) {
  const cardHolderNameItem = templateCardHolder
    .cloneNode(true)
    .querySelector(".card__holder-name-item");
  cardHolderNameItem.textContent = letter;
  return cardHolderNameItem;
}

// function setDefaultCardBankInfo() {
//   cardBankLogos.forEach((logo) => {
//     logo.src = "./node_modules/card-info/dist/banks-logos/ru-sberbank.svg";
//     logo.alt = "Sberbank";
//   });

//   cardPaymentLogos.forEach((logo) => {
//     logo.src = "./node_modules/card-info/dist/brands-logos/visa-white.svg";
//     logo.alt = "Visa";
//   });
// }

function identifyBank(num) {
  let userCardNum = num.length > 5 ? +num : 481776;
  const cardInfo = new CardInfo(userCardNum, {
    banksLogosPath: "./node_modules/card-info/dist/banks-logos/",
    brandsLogosPath: "./node_modules/card-info/dist/brands-logos/",
  });

  cardBankLogos.forEach((logo) => {
    logo.src = cardInfo.bankLogo
      ? cardInfo.bankLogo
      : "./node_modules/card-info/dist/banks-logos/ru-sberbank.svg";
    logo.alt = cardInfo.bankName ? cardInfo.bankName : "Sberbank";
  });

  cardPaymentLogos.forEach((logo) => {
    logo.src = cardInfo.brandLogo
      ? cardInfo.brandLogo
      : "./node_modules/card-info/dist/brands-logos/visa-white.svg";
    logo.alt = cardInfo.brandName ? cardInfo.brandName : "Visa";
  });
}

function resetPopupInfo() {
  cardNumberItems.forEach((i) => (i.textContent = "#"));
  cardValidDateItems[0].textContent = "mm";
  cardValidDateItems[1].textContent = "yy";
  cardHolderName.textContent = "full name";
  cardCvvNumber.textContent = "";
  cardBankLogos.forEach((logo) => {
    logo.src = "./node_modules/card-info/dist/banks-logos/ru-sberbank.svg";
    logo.alt = "Sberbank";
  });

  cardPaymentLogos.forEach((logo) => {
    logo.src = "./node_modules/card-info/dist/brands-logos/visa-white.svg";
    logo.alt = "Visa";
  });
  form.reset();
}

btnPopup.addEventListener("click", () => {
  togglePopup();

  setTimeout(() => {
    removeFocus();
    setDefaultCardSide();
    resetPopupInfo();
  }, 800);
});

cardSides.forEach((element) => {
  element.addEventListener("click", (e) => {
    if (e.target == e.currentTarget) {
      rotateCard();
    }
  });
});

rotaryElements.forEach((element) => {
  element.addEventListener("click", rotateCard);
});

focusableCardElements.forEach((element) => {
  element.addEventListener("click", () => focusCardElement(element));
});

formFields.forEach((field) => {
  field.addEventListener("focus", () => focusFormField(field));
});

popup.addEventListener("click", (e) => {
  if (e.target === e.currentTarget) {
    removeFocus();
  }
});

// события для инпутов формы
inputCardNumber.addEventListener("input", (e) => {
  let inputValue = e.target.value;
  let cardNumberArr = Array.from(cardNumberItems);

  identifyBank(inputValue);

  cardNumberArr.map((n, index, arr) => {
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

[selectCardMonth, selectCardYear].forEach((select, index) => {
  select.addEventListener("change", (e) => {
    let inputValue = e.target.value;

    cardValidDateItems[index].classList.add("card__valid-date-item_active");

    setTimeout(() => {
      cardValidDateItems[index].classList.remove(
        "card__valid-date-item_active"
      );
      cardValidDateItems[index].textContent =
        inputValue.length === 4 ? inputValue.slice(2) : inputValue;
    }, 200);
  });
});

inputCardHolder.addEventListener("input", (e) => {
  let inputValue = e.target.value;
  let nameItem;
  let cardNameArr = Array.from(
    cardHolderName.querySelectorAll(".card__holder-name-item")
  ).map((i) => i.textContent);

  if (inputValue.length > 0 && cardHolderName.textContent === "full name") {
    cardHolderName.textContent = "";
  }

  if (e.inputType !== "deleteContentBackward") {
    for (let i = 0; i < inputValue.length; i++) {
      if (cardNameArr[i] !== inputValue[i]) {
        nameItem = createNameItem(inputValue[i]);
        cardHolderName.append(nameItem);
      }
    }
  } else if (
    e.inputType === "deleteContentBackward" &&
    inputValue.length !== 0
  ) {
    cardNameArr.forEach((letter, index) => {
      if (letter !== inputValue[index]) {
        cardHolderName.removeChild(cardHolderName.lastChild);
      }
    });
  } else {
    cardHolderName.textContent = "full name";
  }
});

inputCardCvv.addEventListener("input", (e) => {
  cardCvvNumber.textContent = e.target.value.replace(/[\s\S]/g, "*");
});

btnFormReset.addEventListener("click", resetPopupInfo);
