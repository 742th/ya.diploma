export class Popup {
  constructor(popup, open, close, reg, openReg, closeReg, openEnter, mobile) {
    this.popup = popup;
    this.openButton = open;
    this.closeButton = close;
    this.reg = reg;
    this.openReg = openReg;
    this.closeReg = closeReg;
    this.openEnter = openEnter;
    this.mobile = mobile;
  }
  open() {
    this.mobile.addEventListener('click', (e) => {
      this.popup.classList.add('active');
    });
    this.openButton.addEventListener('click', (e) => {
      this.popup.classList.add('active');
    });
    this.openEnter.addEventListener('click', (e) => {
      this.popup.classList.add('active');
      this.reg.classList.remove('active');
    })
    this.openReg.addEventListener('click', (e) => {
      this.reg.classList.add('active');
      this.popup.classList.remove('active');
    })
  }
  close() {
    this.closeButton.addEventListener('click', (e)=> {
      this.popup.classList.remove('active');
    })
    this.closeReg.addEventListener('click', (e) => {
      this.reg.classList.remove('active');
    })
  }

}