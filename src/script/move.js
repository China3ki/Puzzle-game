export class Move {
  constructor() {
    this.canvas;
    this.ctx;
    this.check;
  }

  init(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.check = this.canvas.addEventListener('click', this.check.bind(this));
  }

  check(e) {
    const offsetX = e.offsetX;
    const offsetY = e.offsetY;
    console.log(offsetX);
    console.log(offsetY);
  }
}
