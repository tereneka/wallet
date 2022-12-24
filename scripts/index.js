import { formConfig, cardConfig } from "./data.js";
import FormValidator from "./FormValidator.js";
import FormCard from "./FormCard.js";
import WalletCard from "./WalletCard.js";
import { findElementWithSameData } from "./utils.js";

const content = document.querySelector(".content");

const btnPopupCardAdd = document.querySelector(".header__add-card-btn");

const popupCardAdd = document.querySelector(".popup");

const formCard = new FormCard(popupCardAdd.querySelector(".card"), cardConfig);

const formCardAdd = popupCardAdd.querySelector(".popup__form");
const formCardAddValidator = new FormValidator(formConfig, formCardAdd);
const inputCardNumber = formCardAdd.querySelector("[name='cardNumber']");
const inputCardHolder = formCardAdd.querySelector("[name='cardHolder']");
const selectCardMonth = formCardAdd.querySelector("[name='cardMonth']");
const selectCardYear = formCardAdd.querySelector("[name='cardYear']");
const inputCardCvv = formCardAdd.querySelector("[name='cardCvv']");
const btnResetFormCardAdd = formCardAdd.querySelector(
  ".popup__form-btn_type_reset"
);
export const formCardAddFields = [
  inputCardNumber,
  inputCardHolder,
  selectCardMonth,
  selectCardYear,
  inputCardCvv,
];

function togglePopup(popup) {
  popup.classList.toggle("popup_opened");
}

function togglePopupBtn(btn) {
  btn.classList.toggle(`${btn.id}_opened`);
}

function toggleContentVisibility() {
  content.classList.toggle("content_invisible");
}

function resetPopupCardAdd() {
  formCard.setDefaultCardFieldes();
  formCardAdd.reset();
  formCardAddFields.forEach((field) => {
    formCardAddValidator.hideFieldError(field);
  });
}

function submitFormCardAdd(e) {
  e.preventDefault();
  if (!formCardAddValidator.isFormInvalid()) {
    formCard.hideCardFocus();
    formCard.setDefaultCardSide();
    togglePopup(popupCardAdd);
    togglePopupBtn(btnPopupCardAdd);
    toggleContentVisibility();

    setTimeout(() => {
      resetPopupCardAdd();
      formCard.changeCardSidesBack();
    }, 800);

    new WalletCard(
      document.importNode(formCard.card, true),
      cardConfig
    ).renderCard();
  } else {
    formCardAddFields.forEach((field) => {
      formCardAddValidator.checkFieldValidity(field);
    });
  }
}

btnPopupCardAdd.addEventListener("click", () => {
  if (!popupCardAdd.classList.value.includes("popup_opened")) {
    formCard.changeCardSidesBack();
  }
  toggleContentVisibility();
  togglePopup(popupCardAdd);
  togglePopupBtn(btnPopupCardAdd);

  setTimeout(() => {
    formCard.hideCardFocus();
    formCard.setDefaultCardSide();
    resetPopupCardAdd();
  }, 800);
});

formCard.changeCardSidesBack();

formCardAddFields.forEach((field) => {
  field.addEventListener("focus", () => {
    const cardElement = findElementWithSameData(
      formCard.focusableCardElements,
      field,
      "focus"
    );
    formCard.moveCardFocus(cardElement);
  });
});

popupCardAdd.addEventListener("click", (e) => {
  if (e.target === e.currentTarget) {
    formCard.hideCardFocus();
  }
});

inputCardNumber.addEventListener("input", (e) => {
  formCardAddValidator.checkInputDataType(e);
  formCard.changeCardNumber(e);
});

inputCardHolder.addEventListener("input", (e) => {
  formCardAddValidator.checkInputDataType(e);
  formCard.changeCardHolderName(e);
});

[selectCardMonth, selectCardYear].forEach((select, index) => {
  select.addEventListener("change", (e) => {
    formCard.changeCardValidDate(e, index);
  });
});

inputCardCvv.addEventListener("input", (e) => {
  formCardAddValidator.checkInputDataType(e);
  formCard.changeCardCvv(e);
});

btnResetFormCardAdd.addEventListener("click", resetPopupCardAdd);

formCardAdd.addEventListener("submit", submitFormCardAdd);

formCardAddValidator.enableValidation();
