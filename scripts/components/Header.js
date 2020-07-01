export class Header {
  constructor(overlay, open, close, color='black', isLoggedIn=false, userName='') {
    this.color = color;
    this.isLoggedIn = isLoggedIn;
    this.userName = userName;
    this.overlay = overlay;
    this.close = close;
    this.open = open;
  }
  // render () {
  //   if( this.color === 'white') {

  //   }
  // }

  openHead() {
    this.open.addEventListener('click', (e) => {
      this.overlay.classList.add('active');
    });
  }

  closeHead() {
    this.close.addEventListener('click', (e) => {
      this.overlay.classList.remove('active');
    });
  }
}