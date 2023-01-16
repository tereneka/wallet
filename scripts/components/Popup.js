export default class Popup {
  constructor(popupConfig) {
    this._popup = document.querySelector(`.${popupConfig.popupClassName}`);
    this._btnPopupToggle = document.querySelector(
      `.${popupConfig.btnPopupToggleClassName}`
    );
  }

  open() {
    this._popup.classList.add(`${popupClassName}_opened`);
  }

  close() {
    this._popup.classList.remove(`${popupClassName}_opened`);
  }

  setEventListeners() {
    this._popup.addEventListener("click", (e) => {
      if (
        e.target === e.currentTarget ||
        e.target.classList.contains("popup__close-btn")
      ) {
        this.close();
      }
    });
  }
}
