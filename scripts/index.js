let bankNum = 4377730000000000;

// const cardInfo = new CardInfo(bankNum, {
//   banksLogosPath: "./node_modules/card-info/dist/banks-logos/",
//   brandsLogosPath: "./node_modules/card-info/dist/brands-logos/",
// });
// console.log("Название банка:", cardInfo.bankName);
// console.log("Логотип банка:", cardInfo.bankLogo);
// console.log(cardInfo.brandLogo);
// console.log(cardInfo.backgroundColor);

const btnPopup = document.querySelector(".header__popup-btn");
const popup = document.querySelector(".popup");

const card = popup.querySelector(".card");
const cardFocus = card.querySelector(".card__focus");
const cardSides = card.querySelectorAll(".card__side");
const cardBankLogo = card.querySelector(".card__bank-logo");
const cardPaymentLogo = card.querySelector(".card__payment-system-logo");
const cardBlockLogos = card.querySelector(".card__block_for_logos");
const cardBlackLine = card.querySelector(".card__black-line");
const cardNumber = card.querySelector(".card__number");
const cardValid = card.querySelector(".card__valid");
const cardHolder = card.querySelector(".card__holder");
const cardCvv = card.querySelector(".card__cvv");

const form = popup.querySelector(".popup__form");
const formFields = Array.from(form.querySelectorAll(".popup__form-field"));

const rotaryElements = [
  cardBankLogo,
  cardPaymentLogo,
  cardBlockLogos,
  cardBlackLine,
];
const focusableCardElements = [cardNumber, cardValid, cardHolder, cardCvv];
// const cardNumberChildren = Array.from(cardNumber.children);
// const cardValidChildren = Array.from(cardValid.children);
// const cardHolderChildren = Array.from(cardHolder.children);
// const cardCvvChildren = Array.from(cardCvv.children);

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

function findElementWithSameData(arr, element, data) {
  let result = arr.find((i) => i.dataset[data] === element.dataset[data]);
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

btnPopup.addEventListener("click", () => {
  togglePopup();
  removeFocus();
  setDefaultCardSide();
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
