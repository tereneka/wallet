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
const cardSides = card.querySelectorAll(".card__side");
const cardBankLogo = card.querySelector(".card__bank-logo");
const cardPaymentLogo = card.querySelector(".card__payment-system-logo");
const cardBlackLine = card.querySelector(".card__black-line");
// const cardNumber = card.querySelector(".card__number");
// const cardNumberChildren = Array.from(cardNumber.children);
// const cardValid = card.querySelector(".card__valid");
// const cardValidChildren = Array.from(cardValid.children);
// const cardHolder = card.querySelector(".card__holder");
// const cardHolderChildren = Array.from(cardHolder.children);
// const cardCvv = card.querySelector(".card__cvv");
// const cardCvvChildren = Array.from(cardCvv.children);

function rotateCard() {
  card.classList.toggle("card_rotated");
}

cardSides.forEach((element) => {
  element.addEventListener("click", (e) => {
    if (e.target == e.currentTarget) {
      rotateCard();
    }
  });
});

[(cardBankLogo, cardPaymentLogo, cardBlackLine)].forEach((element) => {
  element.addEventListener("click", rotateCard);
});
