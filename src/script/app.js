import { Game } from './game.js';

export class App {
  constructor(menu) {
    this.menuValues = menu;
    this.main = document.querySelector('.main');
    this.game = new Game(this.main);
    this.main.addEventListener('click', this.changeScenerio.bind(this));
  }

  menu() {
    this.main.replaceChildren();
    this.main.insertAdjacentHTML('afterbegin', this.menuValues);
  }

  changeScenerio(e) {
    const scene = e.target.dataset.scenerio;

    switch (scene) {
      case 'game-random':
        this.game.init();
        break;
      case 'menu':
        this.main.replaceChildren();
        this.main.insertAdjacentHTML(
          'afterbegin',
          `<div class="main__options">
      <button data-scenerio="game-random" class="option__button ">Losuj obrazek</button>
      <button class="option__button">Wybierz obrazek</button>
      </div>`
        );
      default:
    }
  }
}

const app = new App(
  ` <div class="main__options">
<button data-scenerio="game-random" class="option__button ">Losuj obrazek</button>
<button class="option__button">Wybierz obrazek</button>
</div>`
);
app.menu();
// app.startGame();
