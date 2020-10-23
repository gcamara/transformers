import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BotThumbComponent } from './characters/bot-thumb/bot-thumb.component';
import { CharactersComponent } from './characters/characters.component';
import { PlayerSelectionComponent } from './player-selection/player-selection.component';
import { PopupComponent } from './shared/popup/popup.component';
import { StartGameComponent } from './start-game/start-game.component';


@NgModule({
  declarations: [
    AppComponent,
    CharactersComponent,
    BotThumbComponent,
    StartGameComponent,
    PlayerSelectionComponent,
    PopupComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
