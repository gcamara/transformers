import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { Bots, SkillRange, Transformer, TransformerType } from '../../shared/model';
import { TransformersService } from '../services/transformers.service';

const statsNames = ['strength', 'intelligence', 'speed', 'endurance', 'rank', 'courage', 'firepower', 'skill'];

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent {

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

  @Output()
  completeSelection = new EventEmitter<Transformer[]>();

  constructor(transfomerService: TransformersService) {
    this.bots = transfomerService.getBots();
  }

  /**
   * Emits to the parent component an event with the current team.
   */
  onCompleteSelection(): void {
    this.completeSelection.emit(this.selectedTeam);
  }

  /**
   * Returns the bot name or suggest to select one.
   */
  characterName(): string {
    return this.characterSelected?.name ?? 'Select one bot';
  }

  /**
   * Returns the value of the attribute or '-' if no bot.
   * @param attributeName attribute name
   */
  characterStat(attributeName: string): '-' | SkillRange {
    return this.characterSelected?.[attributeName] ?? '-';
  }

  /**
   * Returns the overall Rating of the selected bot, otherwise '-'
   */
  characterRating(): string | number {
    return this.characterSelected?.overallRating() ?? '-';
  }

  /**
   * Return the bot list with a new empty bot, which will be used to
   * trigger the user input.
   */
  botList(): Transformer[] {
    let type: TransformerType = 'Autobot';
    let list = this.bots.autobots;

    if (!this.autobots) {
      type = 'Decepticon';
      list = this.bots.decepticons;
    }

    return list;
  }

  /**
   * Check whether the bot is a member of the selected team.
   * @param botName bot name
   */
  isBotSelected(botName: string): boolean {
    return this.selectedTeam.filter(bot => bot?.name === botName).length > 0;
  }

  /**
   * Adds or remove a bot from the selected team.
   * @param bot the bot to be selected or removed.
   */
  selectBot(bot: Transformer): void {
    if (this.isBotSelected(bot.name)) {
      this.selectedTeam = this.selectedTeam.filter(element => element.name !== bot.name);
    } else {
      if (this.selectedTeam.length < 3) {
        this.selectedTeam.push(bot);
      }
    }
    this.onCompleteSelection();
  }

  /**
   * Selects the bot in order to display it's stats.
   * @param bot the bot to display
   */
  showStats(bot: Transformer): void {
    this.characterSelected = bot;
  }

  /**
   * Creates an array of the remaining empty slots to complete a team.
   */
  emptyTeam(): any[] {
    const empty = Array(3 - this.selectedTeam.length);
    return empty;
  }

}
