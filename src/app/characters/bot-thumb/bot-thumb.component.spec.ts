import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BotThumbComponent } from './bot-thumb.component';


describe('BotThumbComponent', () => {
  let component: BotThumbComponent;
  let fixture: ComponentFixture<BotThumbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BotThumbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BotThumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should has "big" class', () => {
    component.size = 'big';
    fixture.detectChanges();
    expect(fixture.nativeElement.classList.contains('big')).toBeTrue();
  });
});
