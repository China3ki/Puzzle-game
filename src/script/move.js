export class Move {
  constructor() {
    this.click;
    this.previousTitleX;
    this.previousTitleY;
    this.xTitle;
    this.yTitle;
    this.x;
    this.y;
  }

  init(canvas, ctx, changedCord, placeCord, initCord, image) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.cord = changedCord;
    this.placeCord = placeCord;
    this.initCord = initCord;
    this.image = image;
    this.canvas.addEventListener('mousemove', this.hover.bind(this));

    this.canvas.addEventListener('mousedown', this.grab.bind(this));
    this.canvas.addEventListener('mouseup', this.ungrab.bind(this));
  }

  hover(e) {
    this.update(e.offsetX, e.offsetY);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = 0; i < this.cord.length; i++) {
      this.ctx.drawImage(this.image, this.cord[i][0], this.cord[i][1], 100, 100, this.placeCord[i][0], this.placeCord[i][1], 100, 100);

      if (this.placeCord[i][0] === this.x && this.placeCord[i][1] === this.y) {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        this.ctx.fillRect(this.x, this.y, 100, 100);
      }
    }
    this.ctx.stroke();
    this.ctx.lineWidth = 1;

    if (this.click === true) {
      let nowX;
      let nowY;
      for (let i = 0; i < this.cord.length; i++) {
        if (this.placeCord[i][0] === this.previousTitleX && this.placeCord[i][1] === this.previousTitleY) {
          nowX = this.cord[i][0];
          nowY = this.cord[i][1];
        }
        if (i === this.cord.length - 1) {
          this.ctx.drawImage(this.image, nowX, nowY, 100, 100, this.xTitle, this.yTitle, 100, 100);
        }
      }
    } else if (this.click === 'down') {
      let previousNumber = 0;
      let nextNumber = 0;
      for (let i = 0; i < this.cord.length; i++) {
        if (this.placeCord[i][0] === this.x && this.placeCord[i][1] === this.y) {
          //   this.placeCord[i][0] = this.previousTitleX;
          //   this.placeCord[i][1] = this.previousTitleY;
          previousNumber = i;
        }
        if (this.previousTitleX === this.placeCord[i][0] && this.previousTitleY === this.placeCord[i][1]) {
          //   this.placeCord[i][0] = this.x;
          //   this.placeCord[i][1] = this.y;
          nextNumber = i;
        }
        this.placeCord[previousNumber][0] = this.previousTitleX;
        this.placeCord[previousNumber][1] = this.previousTitleY;
        this.placeCord[nextNumber][0] = this.x;
        this.placeCord[nextNumber][1] = this.y;
      }
      //   console.log(`${this.previousTitleX}, ${this.previousTitleY}, ${this.x}, ${this.y}`);
      this.click = false;
    }
  }

  grab(e) {
    this.click = true;
    this.previousTitleX = this.x;
    this.previousTitleY = this.y;
  }

  ungrab(e) {
    this.click = 'down';
  }

  update(offX, offY) {
    this.xTitle = offX;
    this.yTitle = offY;
    this.x = Math.floor(offX / 100) * 100;
    this.y = Math.floor(offY / 100) * 100;
  }
}
