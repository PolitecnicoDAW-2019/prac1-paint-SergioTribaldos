class View {
  constructor() {
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');

    this.selectColorInput = document.getElementById('color-selector');
    this.selectSizeInput = document.getElementById('size-selector');
    this.selectImgInput = document.getElementById('file-selector');
    this.sizeDisplay = document.getElementById('size-display');
    this.clearButton = document.getElementById('clearBtn');
    this.saveButton = document.getElementById('saveBtn');
    this.previousSelectedShape;
    this.selectedColor = 'red';
    this.selectedSize = 25;

    this.squareButton = document.getElementById('squareBtn');
    this.circleButton = document.getElementById('circleBtn');
    this.triangleButton = document.getElementById('triangleBtn');
    this.pencilButton = document.getElementById('pencilBtn');
  }

  // When a shape button is pressed, bind that shape function to the canvas onclick event
  bindAction({ button, shape }) {
    button.addEventListener('click', () => {
      this.canvas.removeEventListener('mousedown', this.previousSelectedShape);
      this.previousSelectedShape = shape;
      this.canvas.addEventListener('mousedown', shape);
    });
  }

  //
  selectSquare() {
    this.bindAction({
      shape: this.square,
      button: this.squareButton
    });
  }
  selectCircle() {
    this.bindAction({
      shape: this.circle,
      button: this.circleButton
    });
  }
  selectTriangle() {
    this.bindAction({
      shape: this.triangle,
      button: this.triangleButton
    });
  }
  selectPencil() {
    this.bindAction({
      shape: this.pencil,
      button: this.pencilButton
    });
  }

  square = () => {
    var x = event.offsetX;
    var y = event.offsetY;
    this.ctx.fillStyle = this.selectedColor;
    this.ctx.fillRect(
      x - this.selectedSize / 2,
      y - this.selectedSize / 2,
      this.selectedSize,
      this.selectedSize
    );
  };
  circle = () => {
    var x = event.offsetX;
    var y = event.offsetY;

    this.ctx.fillStyle = this.selectedColor;
    this.ctx.beginPath();
    this.ctx.arc(x, y, this.selectedSize, 0, 2 * Math.PI);
    this.ctx.fill();
  };
  triangle = () => {
    var x = event.offsetX;
    var y = event.offsetY;

    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(x + 33, y + 75);
    this.ctx.lineTo(x + 100, y + 25);
    this.ctx.fillStyle = this.selectedColor;
    this.ctx.fill();
  };
  pencil = () => {
    const pencilWrite = () => {
      var x = event.offsetX;
      var y = event.offsetY;
      this.ctx.fillStyle = this.selectedColor;
      this.ctx.beginPath();
      this.ctx.arc(x, y, this.selectedSize, 0, 2 * Math.PI);
      this.ctx.fill();
    };

    this.canvas.addEventListener('mousemove', pencilWrite);

    this.canvas.addEventListener('mouseup', () => {
      this.canvas.removeEventListener('mousemove', pencilWrite);
    });
  };

  colorSelector() {
    this.selectColorInput.addEventListener('input', () => {
      this.selectedColor = this.selectColorInput.value;
    });
  }

  sizeSelector() {
    this.selectSizeInput.addEventListener('change', () => {
      this.selectedSize = this.selectSizeInput.value;
      this.sizeDisplay.innerHTML = this.selectSizeInput.value;
    });
  }

  imgSelector() {
    this.selectImgInput.addEventListener('change', event => {
      const img = new Image();
      img.onload = () => {
        this.ctx.drawImage(img, 0, 0);
      };
      img.src = URL.createObjectURL(this.selectImgInput.files[0]);
    });
  }
  clearScreen() {
    this.clearButton.addEventListener('click', () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    });
  }

  saveCanvas() {
    this.saveButton.addEventListener('click', () => {
      this.canvas.toBlob(function(blob) {
        saveAs(blob, 'Nueva Imagen');
      });
    });
  }
}
