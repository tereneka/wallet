import { formValidDataTypes } from "./data.js";

export default class FormValidator {
  constructor(formConfig, form) {
    this._formSelector = formConfig.formSelector;
    this._fieldSelector = formConfig.fieldSelector;
    this._form = form;
    this._fieldList = Array.from(
      this._form.querySelectorAll(this._fieldSelector)
    );
  }

  _showFieldError(field, errorMessage) {
    const fieldError = this._form.querySelector(`.${field.id}-error`);
    fieldError.textContent = errorMessage;
    field.setAttribute("invalid", "invalid");
  }

  hideFieldError(field) {
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
      this.hideFieldError(field);
    }
  }

  checkInputDataType(e) {
    const reg = formValidDataTypes[e.target.dataset.validType];
    const inputTypeError = document.querySelector(`.${e.target.id}-type-error`);

    inputTypeError.textContent = reg.test(e.target.value)
      ? `Only ${e.target.dataset.validType} are allowed into this input.`
      : "";

    e.target.value = e.target.value.replace(reg, "");
  }

  isFormInvalid() {
    return this._fieldList.some(
      (field) => !field.validity.valid || field.hasAttribute("invalid")
    );
  }

  _checkFormValidity() {
    this._fieldList.forEach((field) => {
      field.addEventListener("input", () => {
        this.checkFieldValidity(field);
      });
    });
  }

  enableValidation() {
    this._checkFormValidity();
  }
}
