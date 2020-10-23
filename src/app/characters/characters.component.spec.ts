import { Component, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Autobot } from 'src/shared/model';
import { CharactersComponent } from './characters.component';


@Component({
  template: '<app-characters [autobots]="true"></app-characters>'
})
class TestCharactersComponent {

  @ViewChild(CharactersComponent) characters: CharactersComponent;

}

describe('CharactersComponent', () => {
  let component: CharactersComponent;
  let fixture: ComponentFixture<CharactersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestCharactersComponent, CharactersComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharactersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should has autobots class', () => {
    component.autobots = true;
    fixture.detectChanges();
    expect(fixture.nativeElement.classList.contains('autobots')).toBe(true, 'on having autobots class');
  });

  it('should has decepticons class', () => {
    component.decepticons = true;
    fixture.detectChanges();
    expect(fixture.nativeElement.classList.contains('decepticons')).toBe(true, 'on having decepticons class');
  });

  it('should return characterName()', () => {
    expect(component.characterName()).toEqual('Select one bot');

    component.characterSelected = new Autobot('Bluestreak', 1, 1, 1, 1, 1, 1, 1, 1);
    expect(component.characterName()).toEqual('Bluestreak');
  });

  it('should return characterStat()', () => {
    expect(component.characterStat('skill')).toEqual('-');

    component.characterSelected = new Autobot('Bluestreak', 1, 1, 1, 1, 1, 1, 1, 1);
    expect(component.characterStat('skill')).toEqual(1);
  });

  it('should return characterRating()', () => {
    expect(component.characterRating()).toEqual('-');

    component.characterSelected = new Autobot('Bluestreak', 1, 1, 1, 1, 1, 1, 1, 1);
    expect(component.characterRating()).toEqual(5);
  });

  it('should return botList()', () => {
    component.decepticons = true;
    expect(component.botList().length).toBe(6);
  });

  it('should check if isBotSelected()', () => {
    const bot = new Autobot('Bluestreak', 1, 1, 1, 1, 1, 1, 1, 1);
    component.selectedTeam.push(bot);
    expect(component.isBotSelected('Bluestreak')).toBeTrue();
    expect(component.isBotSelected('Predaking')).toBeFalse();
  });

  it('should selectBot()', () => {
    const bot = new Autobot('Bluestreak', 1, 1, 1, 1, 1, 1, 1, 1);
    component.selectBot(bot);
    expect(component.selectedTeam.length).toBe(1, 'on select bluestreak');
  });

  it('should selectBot() - remove bot', () => {
    const bot = new Autobot('Bluestreak', 1, 1, 1, 1, 1, 1, 1, 1);
    component.selectBot(bot);
    expect(component.selectedTeam.length).toBe(1, 'on select bluestreak');

    component.selectBot(bot);
    expect(component.selectedTeam.length).toBe(0, 'on after select the same bot, the bot should be removed');
  });

  it('should showStats()', () => {
    const bot = new Autobot('Bluestreak', 1, 1, 1, 1, 1, 1, 1, 1);
    component.showStats(bot);
    expect(component.characterSelected).toEqual(bot);
  });

});
