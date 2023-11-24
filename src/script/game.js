export class Game {
  constructor(main) {
    this.canvas = '';
    this.ctx = '';
    this.main = main;
  }

  init() {
    this.main.replaceChildren();
    this.canvas = document.createElement('canvas');
    this.main.appendChild(this.canvas);
    this.canvas.width = 900;
    this.canvas.height = 600;
    this.ctx = this.canvas.getContext('2d');
    this.drawImage();
  }

  drawImage() {
    const randomImage = Math.floor(Math.random() * 1);
    const image = new Image();
    image.src = `images/img${randomImage}.jpg`;

    image.onload = () => {
      //   this.ctx.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
    };

    // setTimeout(() => {
    //   this.cutImage(image);
    // }, 3000);
    this.cutImage(image);
  }

  cutImage(image) {
    // let posY = 0;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    const cuttedImage = new Image();
    cuttedImage.src = image.src;
    console.log(cuttedImage.width);
    createImageBitmap(cuttedImage, {
      resizeWidth: 900,
      resizeHeight: 600,
      resizeQuality: 'high',
    }).then((ImageBitmap) => {
      cuttedImage.onload = () => {
        let posX = 0;
        for (let x = 0; x <= 9; x++) {
          let posY = 0;
          for (let y = 0; y <= 6; y++) {
            this.ctx.drawImage(ImageBitmap, posX, posY, 100, 100, posX, posY, 100, 100);
            this.ctx.strokeRect(posX, posY, 100, 100);
            posY += 100;
          }

          posX += 100;
        }
      };
    });
  }
}
