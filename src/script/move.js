import { App } from './app.js';
export class Move {
  static minutes = 0;

  static seconds = 0;

  constructor() {
    this.click;
    this.previousTitleX;
    this.previousTitleY;
    this.xTitle;
    this.yTitle;
    this.x;
    this.y;
    this.timeOut;
  }

  updateTime() {
    Move.seconds++;
    if (Move.seconds === 60) {
      Move.minutes++;
      Move.seconds = 0;
    }
  }

  init(canvas, ctx, changedCord, placeCord, checkCord, image) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.cord = changedCord;
    this.checkCord = checkCord;
    this.placeCord = placeCord;
    this.image = image;
    this.timeOut = setInterval(this.updateTime, 1000);
    document.querySelector('.main').insertAdjacentHTML('beforeend', `<button class='check'>Podpowiedz</button>`);
    document.querySelector('.check').addEventListener('click', this.hint.bind(this));
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
          previousNumber = i;
        }
        if (this.previousTitleX === this.placeCord[i][0] && this.previousTitleY === this.placeCord[i][1]) {
          nextNumber = i;
        }
      }
      this.placeCord[previousNumber][0] = this.previousTitleX;
      this.placeCord[previousNumber][1] = this.previousTitleY;
      this.placeCord[nextNumber][0] = this.x;
      this.placeCord[nextNumber][1] = this.y;
      this.click = false;
      this.checkCondition();
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
  checkCondition() {
    let correct = 0;

    this.checkCord.forEach((el, index) => {
      if (el[0] === this.placeCord[index][0] && el[1] === this.placeCord[index][1]) {
        correct++;
      } else {
      }
    });
    console.log(correct);
    if (correct === this.placeCord.length) {
      document.querySelector('.main').insertAdjacentHTML(
        'afterbegin',
        `
        <div class='complete'>
          <h3 class='complete__header'>Udało ci się zgadnąć!</h3>
          <span class='complete__time'>Twój czas: <span class='complete__time--time'>${Move.minutes}:${
          Move.seconds < 10 ? '0' + Move.seconds : Move.seconds
        }</span></span>
          <div class='complete__buttons'>
          <button data-scenerio="game-random">Spróbuj ponownie</button>
          <button data-scenerio="menu">Menu główne</button>
          </div>
        </div>
      `
      );
      Move.minutes = 0;
      Move.seconds = 0;
      clearInterval(this.timeOut);
    }
  }

  update(offX, offY) {
    this.xTitle = offX;
    this.yTitle = offY;
    this.x = Math.floor(offX / 100) * 100;
    this.y = Math.floor(offY / 100) * 100;
  }

  hint() {
    // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.checkCord.forEach((el, index) => {
      if (el[0] !== this.placeCord[index][0] || el[1] !== this.placeCord[index][1]) {
        this.ctx.fillStyle = 'rgba(255, 0, 0, 0.2)';
        this.ctx.fillRect(this.placeCord[index][0], this.placeCord[index][1], 100, 100);
      }
    });
  }
}
