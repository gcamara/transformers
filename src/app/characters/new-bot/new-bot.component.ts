import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransformersService } from 'src/app/services/transformers.service';
import { Transformer } from 'src/shared/model';

@Component({
  selector: 'app-new-bot',
  templateUrl: './new-bot.component.html',
  styleUrls: ['./new-bot.component.scss']
})
export class NewBotComponent implements OnChanges {

  stats: any[];
  newBotForm: FormGroup;

  @Input()
  type: 'Autobot' | 'Decepticon';

  @Output()
  createBot = new EventEmitter<Transformer>();

  @Output()
  cancel = new EventEmitter<any>();

  constructor(transformerService: TransformersService,
              fb: FormBuilder) {
    this.stats = transformerService.stats();
    this.newBotForm = fb.group({
      name: ['', Validators.required],
      type: [{ value: 'Autobot', disabled: true}, Validators.required]
    });
    this.stats.forEach(stat => this.newBotForm.addControl(stat, fb.control(1, Validators.required)));
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.newBotForm.patchValue({ type: changes.type.currentValue });
  }

  getData(): Transformer {
    const data: Transformer = this.newBotForm.value;
    const bot = new Transformer(data.name, data.strength,
      data.intelligence, data.speed, data.endurance, data.rank,
      data.courage, data.firepower, data.skill, this.type);

    bot.added = true;
    return bot;
  }

  onSubmit(): void {
    this.newBotForm.markAllAsTouched();

    if (this.newBotForm.valid) {
      this.createBot.emit(this.getData());
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }

}
