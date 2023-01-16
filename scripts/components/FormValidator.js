export default class FormValidator {
  static dataTypes = {
    digits: /[^0-9.]/g,
    "latin alphabets": /[^a-zA-Z\s.]/g,
  };

  constructor(form, fieldsList) {
    this._form = form;
    this._fieldsList = fieldsList;
  }

  _showFieldError(field, errorMessage) {
    const fieldError = this._form.querySelector(`.${field.id}-error`);
    fieldError.textContent = errorMessage;
    field.setAttribute("invalid", "invalid");
  }

  _hideFieldError(field) {
    const fieldError = this._form.querySelector(`.${field.id}-error`);
    fieldError.textContent = "";
    field.removeAttribute("invalid");
  }

  checkFieldValidity(field) {
    const minLength = field.getAttribute("minlength");
    let errorMessage;

    if (field.validity.valueMissing) {
      errorMessage = "This field is required.";
    } else if (minLength && field.value.length < minLength) {
      errorMessage = `Min length is ${minLength}.`;
    } else {
      errorMessage = "";
    }

    if (errorMessage) {
      this._showFieldError(field, errorMessage);
    } else {
      this._hideFieldError(field);
    }
  }

  checkInputDataType(e) {
    const reg = FormValidator.dataTypes[e.target.dataset.validType];
    const inputTypeError = document.querySelector(`.${e.target.id}-type-error`);

    inputTypeError.textContent = reg.test(e.target.value)
      ? `Only ${e.target.dataset.validType} are allowed into this input.`
      : "";

    e.target.value = e.target.value.replace(reg, "");
  }

  isFormInvalid() {
    return this._fieldsList.some(
      (field) => !field.validity.valid || field.hasAttribute("invalid")
    );
  }

  _setEventListeners() {
    this._fieldsList.forEach((field) => {
      field.addEventListener("input", () => {
        this.checkFieldValidity(field);
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }

  resetValidation() {
    this._fieldsList.forEach((field) => {
      this._hideFieldError(field);
    });
  }
}
