import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Bots, SkillRange, Transformer, TransformerType } from '../../shared/model';
import { TransformersService } from '../services/transformers.service';

const statsNames = ['strength', 'intelligence', 'speed', 'endurance', 'rank', 'courage', 'firepower', 'skill'];

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {

  @HostBinding('class.autobots')
  @Input()
  autobots: boolean;

  @Input()
  @HostBinding('class.decepticons')
  decepticons: boolean;

  characterSelected: Transformer;
  stats = statsNames;

  selectedTeam: Transformer[] = [];

  bots: Bots;

  constructor(transfomerService: TransformersService) {
    this.bots = transfomerService.getBots();
  }

  ngOnInit(): void {
  }

  characterName(): string {
    return this.characterSelected?.name ?? 'Select one bot';
  }

  characterStat(name: string): SkillRange {
    return this.characterSelected?.[name] ?? '-';
  }

  characterRating(): string | number {
    return this.characterSelected?.overallRating() ?? '-';
  }

  botList(): Transformer[] {
    let type: TransformerType = 'Autobot';
    let list = this.bots.autobots;

    if (!this.autobots) {
      type = 'Decepticon';
      list = this.bots.decepticons;
    }

    list = [
      ...list,
      new Transformer(null, 1, 1, 1, 1, 1, 1, 1, 1, type)
    ];
    return list;
  }

  isBotSelected(name: string): boolean {
    return this.selectedTeam.filter(bot => bot?.name === name).length > 0;
  }

  selectBot(bot: Transformer): void {
    if (this.isBotSelected(bot.name)) {
      this.selectedTeam = this.selectedTeam.filter(element => element.name !== bot.name);
    } else {
      if (this.selectedTeam.length < 3) {
        this.selectedTeam.push(bot);
      }
    }
  }

  showStats(bot: Transformer): void {
    this.characterSelected = bot;
  }

}
