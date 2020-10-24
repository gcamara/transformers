import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BattleFieldComponent } from './battle-field/battle-field.component';
import { BotThumbComponent } from './characters/bot-thumb/bot-thumb.component';
import { CharactersComponent } from './characters/characters.component';
import { NewBotComponent } from './characters/new-bot/new-bot.component';
import { MenuComponent } from './menu/menu.component';
import { PlayerSelectionComponent } from './player-selection/player-selection.component';
import { PopupComponent } from './shared/popup/popup.component';
import { StartGameComponent } from './start-game/start-game.component';
import { AboutComponent } from './about/about.component';


@NgModule({
  declarations: [
    AppComponent,
    CharactersComponent,
    BotThumbComponent,
    StartGameComponent,
    PlayerSelectionComponent,
    PopupComponent,
    BattleFieldComponent,
    MenuComponent,
    NewBotComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
