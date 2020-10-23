import { Injectable } from '@angular/core';
import { Autobot, Bots, Decepticon } from '../../shared/model';

const defaultAutobots: Autobot[] = [
  new Autobot('Bluestreak', 6, 6, 7, 9, 5, 2, 9, 7),
  new Autobot('Bumblebee', 2, 8, 4, 7, 7, 10, 1, 7),
  new Autobot('Grotusque', 7, 10, 4, 6, 8, 10, 7, 10),
  new Autobot('Ironhide', 7, 7, 3, 9, 7, 10, 7, 7),
  new Autobot('Optimus Prime', 10, 10, 8, 10, 10, 10, 8, 10),
];

const defaultDecepticons: Decepticon[] = [
  new Decepticon('Tantrum', 8, 4, 3, 9, 5, 9, 8, 7),
  new Decepticon('Soundwave', 8, 9, 2, 6, 8, 5, 6, 10),
  new Decepticon('Scrapper', 8, 8, 4, 7, 5, 5, 3, 9),
  new Decepticon('Scavenger', 7, 2, 3, 6, 4, 9, 6, 7),
  new Decepticon('Predaking', 10, 5, 10, 8, 7, 9, 9, 8),
];

/**
 * Service to display a few options of bots to be chosen.
 */
@Injectable({
  providedIn: 'root'
})
export class TransformersService {

  constructor() { }

  /**
   * Returns a Bots type with a list of autobots and decepticons.
   */
  getBots(): Bots {
    return {
      autobots: defaultAutobots,
      decepticons: defaultDecepticons
    };
  }
}
