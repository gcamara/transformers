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

  @Input()
  get size(): 'big' | 'small' {
    return this.sizeDef;
  }

  set size(size: 'big' | 'small') {
    this.sizeDef = size;
    this.isBigThumb = size === 'big';
  }
}
