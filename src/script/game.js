export class Game {
  constructor(main) {
    this.canvas = '';
    this.ctx = '';
    this.main = main;
    // this.
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

  async drawImage() {
    const randomImage = Math.floor(Math.random() * 1);
    const image = new Image();
    image.src = `images/img${randomImage}.jpg`;

    image.onload = () => {
      this.ctx.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
    };

    setTimeout(() => {
      this.cutImage(image.src);
    }, 3000);
  }

  async cutImage(src) {
    const orignalImage = new Image();
    orignalImage.src = src;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    const cropImage = await createImageBitmap(orignalImage, {
      resizeWidth: 900,
      resizeHeight: 600,
      resizeQuality: 'high',
    });
    const cord = [];
    for (let x = 0; x < 9; x++) {
      for (let y = 0; y < 6; y++) {
        this.ctx.strokeRect(x * 100, y * 100, 100, 100);
        cord.push([x * 100, y * 100]);
      }
    }
    const duplicateCord = [...cord];

    const cordLength = cord.length;
    for (let i = 0; i < cordLength; i++) {
      const randCord = Math.floor(Math.random() * cord.length);
      const randPlace = Math.floor(Math.random() * cord.length);

      this.ctx.drawImage(
        cropImage,
        cord[randCord][0],
        cord[randCord][1],
        100,
        100,
        duplicateCord[randPlace][0],
        duplicateCord[randPlace][1],
        100,
        100
      );
      this.ctx.rect(cord[randCord][0], cord[randCord][1], 100, 100);
      this.ctx.stroke();
      this.ctx.lineWidth = 2;
      cord.splice(randCord, 1);
      duplicateCord.splice(randPlace, 1);
    }
  }
}
