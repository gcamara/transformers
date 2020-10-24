import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  @Output()
  cancel = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  onCancel(): void {
    this.cancel.emit();
  }

}
