export class Form {
  constructor(form, errors, overlay) {
    this.form = form;
    this.overlay = overlay;
    this.errors = errors;
    this.form.addEventListener('input',(e) => {
      this._validateInputElement(e);
      this.setSubmitButtonState(e);
    });
    this.form.addEventListener('submit', (e) =>{
      e.preventDefault();
      this.form.name === 'reg'? this._getInfo(this.form.elements.email.value, this.form.elements.password.value, this.form.elements.myName.value) : this._getInfo(this.form.elements.email.value, this.form.elements.password.value);
      this.overlay.classList.remove('active');
      this._clear();
    });
    this.data = {};
  }

  setServerError () {

  }
  _validateInputElement(event) {
      if (event.target.value === '' || event.target.value === null) {
        event.target.nextElementSibling.textContent = this.errors.missInput;
      }
      if (event.target.name === 'password') {
        event.target.nextElementSibling.textContent = this.errors.minPass;
      }
      if (event.target.value.length < 2 && event.target.name !== 'password') {
        event.target.nextElementSibling.textContent = this.errors.tooShort;
      }

      if (event.target.value.length > 30) {
        event.target.nextElementSibling.textContent = this.errors.tooLong;
      }

      if (event.target.validity.valid) {
        event.target.nextElementSibling.textContent = this.errors.noError;
      }

  }
  setSubmitButtonState(event) {
    if (this.form.checkValidity() === true) {
      event.target.form.lastElementChild.removeAttribute('disabled', true);
    } else {
      event.target.form.lastElementChild.setAttribute('disabled', true);
    }
  }
  _clear() {
    if (this.form.name === 'reg') {
      this.form.elements.email.value = '';
      this.form.elements.password.value = '';
      this.form.elements.myName.value = '';
    }
    this.form.elements.email.value = '';
    this.form.elements.password.value = '';

  }
  _getInfo(email, password, name='') {
    this.data = {
      email,
      password,
      name
    }
    if (this.form.name !== 'reg') delete this.data.name;
  }

  getData() {
    return this.data;
  }
}