import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StartGameComponent } from './start-game.component';


describe('StartGameComponent', () => {
  let component: StartGameComponent;
  let fixture: ComponentFixture<StartGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should trigger onkeydown()', () => {
    spyOn(component, 'changeMenu');
    const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
    document.onkeydown(event);
    expect(component.changeMenu).toHaveBeenCalled();
  });

  it('should changeMenu()', () => {
    let event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
    document.onkeydown(event);
    expect(component.selected).toBe(0, 'on arrow up from start');

    event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
    document.onkeydown(event);
    expect(component.selected).toBe(1, 'on arrow down');

    component.selected = 2;
    document.onkeydown(event);
    expect(component.selected).toBe(2, 'on arrow down');
  });
});
