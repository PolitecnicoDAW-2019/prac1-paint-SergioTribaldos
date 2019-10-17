class Controller {
  constructor(view) {
    this.view = view;
    this.view.selectSquare();
    this.view.selectCircle();
    this.view.selectTriangle();
    this.view.selectPencil();

    this.view.bindAction({
      button: this.view.squareButton,
      shape: this.view.square
    });

    this.view.colorSelector();
    this.view.sizeSelector();
    this.view.imgSelector();
    this.view.clearScreen();
    this.view.saveCanvas();
  }
}
