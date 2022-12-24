const notRotatedElemetsClassNamesList = [
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

const formConfig = {
  formSelector: ".popup__form",
  fieldSelector: ".popup__form-field",
};

const formValidDataTypes = {
  digits: /[^0-9.]/g,
  "latin alphabets": /[^a-zA-Z\s.]/g,
};

const cardConfig = {
  cardSelector: ".card",
  focusSelector: ".card__focus",
  focusActiveClass: "card__focus_active",
  sideSelector: ".card__side",
  sideVisibleClass: "card__side_visible",
  bankLogoSelector: ".card__bank-logo",
  paySystemLogSelector: ".card__payment-system-logo",
  numberSelector: ".card__number",
  numberItemSelector: ".card__number-item",
  numberItemActiveClass: "card__number-item_active",
  validSelector: ".card__valid",
  validItemSelector: ".card__valid-date-item",
  validItemActiveClass: "card__valid-date-item_active",
  holderSelector: ".card__holder",
  holderNameSelector: ".card__holder-name",
  holderNameItemClass: "card__holder-name-item",
  holderNameItemSelector: ".card__holder-name-item",
  cvvSelector: ".card__cvv",
  cvvNumberSelector: ".card__cvv-number",
  walletCardClass: "card wallet__card",
  btnTrashClass: "card__btn-trash",
};

const cardBackList = [
  "./images/back/back1.png",
  "./images/back/back2.png",
  "./images/back/back3.png",
  "./images/back/back4.png",
];

export {
  notRotatedElemetsClassNamesList,
  formConfig,
  formValidDataTypes,
  cardConfig,
  cardBackList,
};
