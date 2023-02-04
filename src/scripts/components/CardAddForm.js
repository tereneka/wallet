import FormValidator from "./FormValidator.js";
import WalletCard from "./WalletCard.js";
import { findElementWithSameData } from "../utils.js";

export default class CardAddForm {
  static selectors = {
    form: ".popup__form",
    inputCardNumber: "[name='cardNumber']",
    inputCardHolder: "[name='cardHolder']",
    selectCardMonth: "[name='cardMonth']",
    selectCardYear: "[name='cardYear']",
    inputCardCvv: "[name='cardCvv']",
    btnResetForm: ".popup__form-btn_type_reset",
  };

  constructor(
    popup,
    node,
    handleBtnPopupToggleClick,
    handleFormFieldFocus,
    setCardField,
    resetPopup
  ) {
    this._form = popup.querySelector(CardAddForm.selectors.form);
    this._inputCardNumber = this._form.querySelector(
      CardAddForm.selectors.inputCardNumber
    );
    this._inputCardHolder = this._form.querySelector(
      CardAddForm.selectors.inputCardHolder
    );
    this._selectCardMonth = this._form.querySelector(
      CardAddForm.selectors.selectCardMonth
    );
    this._selectCardYear = this._form.querySelector(
      CardAddForm.selectors.selectCardYear
    );
    this._inputCardCvv = this._form.querySelector(
      CardAddForm.selectors.inputCardCvv
    );
    this._btnResetForm = this._form.querySelector(
      CardAddForm.selectors.btnResetForm
    );

    this._fieldsList = [
      this._inputCardNumber,
      this._inputCardHolder,
      this._selectCardMonth,
      this._selectCardYear,
      this._inputCardCvv,
    ];
    this._inputsList = [
      this._inputCardNumber,
      this._inputCardHolder,
      this._inputCardCvv,
    ];
    this._selectsList = [this._selectCardMonth, this._selectCardYear];

    this._node = node;
    this._handleBtnPopupToggleClick = handleBtnPopupToggleClick;
    this._handleFormFieldFocus = handleFormFieldFocus;
    this._setCardField = setCardField;
    this._resetPopup = resetPopup;

    this._formValidator = new FormValidator(this._form, this._fieldsList);
    this._formValidator.enableValidation();

    this._setEventListeners();
  }

  getfieldsList() {
    return this._fieldsList;
  }

  _handleSubmit(e) {
    e.preventDefault();
    if (!this._formValidator.isFormInvalid()) {
      this._handleBtnPopupToggleClick();
      new WalletCard(".wallet", this._node).renderCard();
    } else {
      this._fieldsList.forEach((field) => {
        this._formValidator.checkFieldValidity(field);
      });
    }
  }

  _handleInput(e, input) {
    this._formValidator.checkInputDataType(e);
    this._setCardField[input.name](e);
  }

  _handleSelect(select, e, index) {
    this._setCardField[select.name](e, index);
  }

  _setEventListeners() {
    this._form.addEventListener("submit", this._handleSubmit.bind(this));
    this._fieldsList.forEach((field) => {
      field.addEventListener("focus", () => this._handleFormFieldFocus(field));
    });
    this._inputsList.forEach((input) => {
      input.addEventListener("input", (e) => this._handleInput(e, input));
    });
    this._selectsList.forEach((select, index) => {
      select.addEventListener("change", (e) =>
        this._handleSelect(select, e, index)
      );
    });
    this._btnResetForm.addEventListener("click", this._resetPopup.bind(this));
  }

  resetform() {
    this._form.reset();
    this._formValidator.resetValidation();
  }
}
