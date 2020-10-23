import { Component, OnDestroy, OnInit } from '@angular/core';
import { Autobot, Decepticon } from 'src/shared/model';

@Component({
  selector: 'app-player-selection',
  templateUrl: './player-selection.component.html',
  styleUrls: ['./player-selection.component.scss']
})
export class PlayerSelectionComponent implements OnInit, OnDestroy {

  autobotsTeam: Autobot[] = [];
  decepticonsTeam: Decepticon[] = [];
  canStartFight = false;

  constructor() { }

  ngOnInit(): void {
  }

  selectAutobots(autobots: Autobot[]): void {
    this.autobotsTeam = autobots;
    this.changeStartFight();
  }

  selectDecepticons(decepticons: Decepticon[]): void {
    this.decepticonsTeam = decepticons;
    this.changeStartFight();
  }

  changeStartFight(): void {
    if (this.autobotsTeam.length === 3 && this.decepticonsTeam.length === 3) {
      this.canStartFight = true;
      window.onkeypress = (evt: KeyboardEvent) => {
        if (evt.key === 'Enter') {
          this.onStartFight();
        }
      };
    } else {
      this.canStartFight = false;
      window.onkeypress = null;
    }
  }

  onStartFight(): void {
    alert('Fight started!');
  }

  ngOnDestroy(): void {
    window.onkeypress = null;
  }

}
