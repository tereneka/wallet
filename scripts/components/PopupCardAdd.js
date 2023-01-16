import CardAddForm from "./CardAddForm.js";
import FormCard from "./FormCard.js";
import { findElementWithSameData } from "../utils.js";

export default class PopupCardAdd {
  static selectors = {
    popup: ".popup",
    btnPopupToggle: ".header__add-card-btn",
    content: ".content",
  };

  static classes = {
    popupOpened: "popup_opened",
    btnPopupToggleOpened: "header__add-card-btn_opened",
    contentInvisible: "content_invisible",
  };

  constructor() {
    this._popup = document.querySelector(PopupCardAdd.selectors.popup);
    this._btnPopupToggle = document.querySelector(
      PopupCardAdd.selectors.btnPopupToggle
    );
    this._content = document.querySelector(PopupCardAdd.selectors.content);

    this._card = new FormCard(PopupCardAdd.selectors.popup, [
      ...document.querySelectorAll(".popup__form-field"),
    ]);
    this._card.renderCard();

    this._cardAddForm = new CardAddForm(
      this._popup,
      this._card.getCardElement(),
      () => this._handleBtnPopupToggleClick(),
      (formField) => this._handleFormFieldFocus(formField),
      {
        cardNumber: (e) => this._card.setCardNumber(e),
        cardHolder: (e) => this._card.setCardHolderName(e),
        cardMonth: (e, index) => this._card.setCardValidDate(e, index),
        cardYear: (e, index) => this._card.setCardValidDate(e, index),
        cardCvv: (e) => this._card.setCardCvv(e),
      },
      () => this._resetPopup()
    );

    this._setEventListeners();
  }

  _togglePopup() {
    this._popup.classList.toggle(PopupCardAdd.classes.popupOpened);
  }

  _togglePopupBtn() {
    this._btnPopupToggle.classList.toggle(
      PopupCardAdd.classes.btnPopupToggleOpened
    );
  }

  _toggleContentVisibility() {
    this._content.classList.toggle(PopupCardAdd.classes.contentInvisible);
  }

  _resetPopup() {
    this._card.setDefaultCardFieldes();
    this._cardAddForm.resetform();
  }

  _handleBtnPopupToggleClick() {
    if (
      !this._popup.classList.value.includes(PopupCardAdd.classes.popupOpened)
    ) {
      this._card.setCardSidesBack();
    }
    this._card.hideCardFocus();
    this._card.setDefaultCardSide();
    this._toggleContentVisibility();
    this._togglePopup();
    this._togglePopupBtn();

    setTimeout(() => {
      this._resetPopup();
    }, 800);
  }

  _handleFormFieldFocus(formField) {
    const cardField = findElementWithSameData(
      this._card.cardFieldsList,
      formField,
      "focus"
    );
    this._card.moveCardFocus(cardField);
  }

  _handlePopupClick(e) {
    if (e.target === e.currentTarget) {
      this._card.hideCardFocus();
    }
  }

  _setEventListeners() {
    this._btnPopupToggle.addEventListener(
      "click",
      this._handleBtnPopupToggleClick.bind(this)
    );
    this._popup.addEventListener("click", this._handlePopupClick.bind(this));
  }
}
