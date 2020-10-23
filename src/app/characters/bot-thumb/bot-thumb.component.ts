import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Transformer } from 'src/shared/model';

@Component({
  selector: 'app-bot-thumb',
  templateUrl: './bot-thumb.component.html',
  styleUrls: ['./bot-thumb.component.scss']
})
export class BotThumbComponent implements OnInit {

  @Input()
  bot: Transformer;

  @HostBinding('class.selected')
  @Input()
  selected: boolean;

  @HostBinding('class.big')
  isBigThumb = false;

  sizeDef: 'big' | 'small';

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Getter and setter for the bot thumb.
   * Depending on it's size, it'll display the whole image of the bot or it's face.
   */
  @Input()
  get size(): 'big' | 'small' {
    return this.sizeDef;
  }

  set size(size: 'big' | 'small') {
    this.sizeDef = size;
    this.isBigThumb = size === 'big';
  }
}
