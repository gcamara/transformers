import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BotThumbComponent } from './characters/bot-thumb/bot-thumb.component';
import { CharactersComponent } from './characters/characters.component';


@NgModule({
  declarations: [
    AppComponent,
    CharactersComponent,
    BotThumbComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
