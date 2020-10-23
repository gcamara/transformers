import { Component, OnDestroy, OnInit } from '@angular/core';

const arrows = ['ArrowUp', 'ArrowDown'];

@Component({
  selector: 'app-start-game',
  templateUrl: './start-game.component.html',
  styleUrls: ['./start-game.component.scss']
})
export class StartGameComponent implements OnInit, OnDestroy {

  selected = 0;

  constructor() {
    document.onkeydown = (event: KeyboardEvent) => {
      if (arrows.includes(event.key)) {
        this.changeMenu(event);
      } else if (event.key === 'Enter') {
        if (this.selected === 0) {
          window.location.href = 'new-game';
        }
      }
    };
  }

  /**
   * Change menu depending on the key pressed.
   * @param event the keyboard event.
   */
  changeMenu(event: KeyboardEvent): void {
    let value = 0;
    if (event.key === 'ArrowDown') {
      value = this.selected + 1;
    } else if (event.key === 'ArrowUp') {
      value = this.selected - 1;
    }
    if (value < 0) {
      value = 0;
    }
    if (value > 2) {
      value = 2;
    }

    this.selected = value;
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    document.onkeydown = null;
  }
}
