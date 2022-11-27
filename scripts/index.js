let bankNum = 4377730000000000;

// const cardInfo = new CardInfo(bankNum, {
//   banksLogosPath: "./node_modules/card-info/dist/banks-logos/",
//   brandsLogosPath: "./node_modules/card-info/dist/brands-logos/",
// });
// console.log("Название банка:", cardInfo.bankName);
// console.log("Логотип банка:", cardInfo.bankLogo);
// console.log(cardInfo.brandLogo);
// console.log(cardInfo.backgroundColor);

const card = document.querySelector(".card");
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

const rotaryElements = [
  cardBankLogo,
  cardPaymentLogo,
  cardBlockLogos,
  cardBlackLine,
];
const focusingElements = [cardNumber, cardValid, cardHolder, cardCvv];
// const cardNumberChildren = Array.from(cardNumber.children);
// const cardValidChildren = Array.from(cardValid.children);
// const cardHolderChildren = Array.from(cardHolder.children);
// const cardCvvChildren = Array.from(cardCvv.children);

function focusCardElement(element) {
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

function rotateCard() {
  card.classList.toggle("card_rotated");
  removeFocus();
}

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

focusingElements.forEach((element) => {
  element.addEventListener("click", () => focusCardElement(element));
});
// cardNumber.addEventListener("click", () => focusCardElement(cardNumber));
