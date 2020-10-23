import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Autobot, Decepticon } from 'src/shared/model';
import { TransformersService } from '../services/transformers.service';

@Component({
  selector: 'app-player-selection',
  templateUrl: './player-selection.component.html',
  styleUrls: ['./player-selection.component.scss']
})
export class PlayerSelectionComponent implements OnInit, OnDestroy {

  autobotsTeam: Autobot[] = [];
  decepticonsTeam: Decepticon[] = [];
  canStartFight = false;

  constructor(private transformerService: TransformersService,
              private router: Router) { }

  ngOnInit(): void {
  }

  /**
   * Selects the autobots.
   * @param autobots the autobots
   */
  selectAutobots(autobots: Autobot[]): void {
    this.autobotsTeam = autobots;
    this.changeStartFight();
  }

  /**
   * Selects the Decepticons.
   * @param autobots the Decepticons
   */
  selectDecepticons(decepticons: Decepticon[]): void {
    this.decepticonsTeam = decepticons;
    this.changeStartFight();
  }

  /**
   * Checks whether the fight can be started.
   */
  changeStartFight(): void {
    if (this.autobotsTeam.length >= 0 && this.decepticonsTeam.length > 0) {
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
    this.transformerService.autobotsTeam = this.autobotsTeam;
    this.transformerService.decepticonsTeam = this.decepticonsTeam;
    this.router.navigate(['/battle']);
  }

  ngOnDestroy(): void {
    window.onkeypress = null;
  }

}
