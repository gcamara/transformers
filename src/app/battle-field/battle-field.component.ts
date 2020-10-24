import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Autobot, Bots, Decepticon, FightResult, Transformer } from 'src/shared/model';
import { TransformersService } from '../services/transformers.service';

@Component({
  selector: 'app-battle-field',
  templateUrl: './battle-field.component.html',
  styleUrls: ['./battle-field.component.scss']
})
export class BattleFieldComponent implements OnInit {

  bots: Bots;
  /** A = Autobots, D = Decepticons, T = Tie, R = Result */
  logs: { winner?: 'A' | 'D' | 'T' | 'R', message: string }[] = [];
  battles = 0;

  constructor(private transformerService: TransformersService,
              private router: Router) { }

  ngOnInit(): void {
    this.bots = this.transformerService.getFightBots();
    this.fight();
    window.onkeypress = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        this.router.navigate(['/']);
      }
    };
  }

  /**
   * Starts the fight!
   */
  fight(): void {

    const autobotsWinnigs = this.countWinnings('A');
    const decepticonsWinnings = this.countWinnings('D');

    const autobot = this.getNextBot(this.bots.autobots);
    const decepticon = this.getNextBot(this.bots.decepticons);

    // Best of three
    if (autobotsWinnigs === 2 || decepticonsWinnings === 2) {
      this.gameover();
      this.markRestAsSkipped(autobotsWinnigs === 2 ? autobot : decepticon);
      return;
    }

    if (autobot && decepticon) {
      if (autobot.name === 'Optimus Prime' && decepticon.name === 'Predaking') {
        this.logs.push({ message: `Optimus Prime faced Predaking! The battle destroyed everyone` });
        this.battles += 1;
        this.markAllAsDestroyed();
        this.gameover();
        return;
      }

      if (autobot.name === 'Optimus Prime') {
        this.logs.push({ winner: 'A', message: `Optimus Prime crushed ${decepticon.name}` });
        decepticon.status = 'defeated';
        this.battles += 1;
        this.fight();
        return;
      }

      if (decepticon.name === 'Predaking') {
        this.logs.push({ winner: 'D', message: `Predaking destroyed ${autobot.name}` });
        autobot.status = 'defeated';
        this.battles += 1;
        this.fight();
        return;
      }

      const courageAndStrenghtWinningBot = this.checkCourageAndStrength(autobot, decepticon);
      if (courageAndStrenghtWinningBot) {
        // tslint:disable-next-line: no-shadowed-variable
        const { winner, loser, group } = courageAndStrenghtWinningBot;
        this.logs.push({ winner: group, message: `${winner.name} fought ${loser.name}, but ${loser.name} ran away...` });
        this.battles += 1;
        this.fight();
        return;
      }

      const skillWinner = this.checkSkillWinner(autobot, decepticon);
      if (skillWinner) {
        // tslint:disable-next-line: no-shadowed-variable
        const { winner, loser, group } = skillWinner;
        this.logs.push({ winner: group, message: `${winner.name} defeated ${loser.name} by skills. It wasn't a fair fight...` });
        this.battles += 1;
        this.fight();
        return;
      }

      if (autobot.overallRating() === decepticon.overallRating()) {
        autobot.status = 'destroyed';
        decepticon.status = 'destroyed';
        this.battles += 1;
        this.logs.push({ winner: 'T', message: `${autobot.name} fought ${decepticon.name}, but they destroyed each other. It was tie.` });
        this.fight();

        return;
      }

      const overallWinner = this.checkOverallRatingWinner(autobot, decepticon);
      const { winner, loser, group } = overallWinner;
      this.battles += 1;
      this.logs.push({ winner: group, message: `${winner.name}(OR: ${winner.overallRating()}) defeated ${loser.name}(OR: ${loser.overallRating()}) by overall rating.` });
      this.fight();
    } else {
      this.gameover();
    }

  }

  /**
   * Check the last non-defeated and non-skipped bot to fight.
   * @param bots bots
   */
  getNextBot(bots: Transformer[]): Transformer | null {
    for (const bot of bots) {
      if (!bot.status) {
        return bot;
      }
    }
  }

  /**
   * Check which would win a battle of courage and strength.
   * @param autobot Autobot
   * @param decepticon Decepticon
   */
  checkCourageAndStrength(autobot: Autobot, decepticon: Decepticon): FightResult {
    const courage = this.getAttributeDifference(autobot, decepticon, 'courage');
    const strength = this.getAttributeDifference(autobot, decepticon, 'strength');

    if (strength <= -3 && courage <= -4) {
      autobot.status = 'defeated';
      return { group: 'D', winner: decepticon, loser: autobot };
    }

    if (strength >= 3 && courage >= 4) {
      decepticon.status = 'defeated';
      return { group: 'A', winner: autobot, loser: decepticon };
    }
  }

  checkSkillWinner(autobot: Autobot, decepticon: Decepticon): FightResult {
    const skill = this.getAttributeDifference(autobot, decepticon, 'skill');

    if (skill <= -3) {
      autobot.status = 'defeated';
      return { group: 'D', winner: decepticon, loser: autobot };
    }

    if (skill >= 3) {
      decepticon.status = 'defeated';
      return { group: 'A', winner: autobot, loser: decepticon };
    }
  }

  checkOverallRatingWinner(autobot: Autobot, decepticon: Decepticon): FightResult {
    const overallDifference = autobot.overallRating() - decepticon.overallRating();
    let winner = autobot;
    let loser = decepticon;
    let group: 'A' | 'D' = 'A';
    decepticon.status = 'defeated';

    if (overallDifference < 0) {
      autobot.status = 'defeated';
      decepticon.status = null;
      loser = autobot;
      winner = decepticon;
      group = 'D';
    }

    return { group, winner, loser };
  }

  gameover(): void {
    this.logs.push({ message: 'The battles are over!' });
    this.logs.push({ message: `There was(were) ${this.battles} battle(s).` });

    const autobotsWinnings = this.countWinnings('A');
    const decepticonsWinnings = this.countWinnings('D');

    if (decepticonsWinnings - autobotsWinnings === 0) {
      this.logs.push({ message: `There were no winners. It was a tie. They were all destroyed!` });
    } else {
      const winner = autobotsWinnings - decepticonsWinnings > 0 ? 'A' : 'D';

      const winnerGroup = winner === 'A' ? this.bots.autobots : this.bots.decepticons;
      const loserGroup = winner === 'D' ? this.bots.autobots : this.bots.decepticons;

      const winningTeam = winnerGroup.map(bot => bot.name).join(', ');
      const survivors = loserGroup.filter(bot => !bot.status).map(bot => bot.name).join(', ');

      this.logs.push({ winner, message: `The ${winner === 'A' ? 'Autobots' : 'Decepticons'} won the battle: ${winningTeam}` });
      if (survivors.trim().length) {
        this.logs.push({ message: `Survivors of the losing team(${winner === 'D' ? 'Autobots' : 'Decepticons'}): ${survivors}` });
      } else {
        this.logs.push({ message: 'There were no survivors of the losing team!' });
      }
    }
    this.logs.push({ message: 'Game Over!' });
  }

  markAllAsDestroyed(): void {
    Object.keys(this.bots).forEach(key => {
      this.bots[key].forEach((bot: Transformer) => bot.status = 'destroyed');
    });
  }

  markRestAsSkipped(transformer: Autobot | Decepticon): void {
    Object.keys(this.bots).forEach(key => {
      this.bots[key].forEach((bot: Transformer) => {
        if (bot.name !== transformer.name && !bot.status) {
          bot.status = 'skipped';
        }
      });
    });
  }

  countWinnings(group: 'A' | 'D'): number {
    return this.logs.filter(log => log.winner === group).length;
  }

  getAttributeDifference(autobot: Autobot, decepticon: Decepticon, attribute: string): number {
    return autobot[attribute] - decepticon[attribute];
  }
}
