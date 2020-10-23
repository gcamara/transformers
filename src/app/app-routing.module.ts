import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BattleFieldComponent } from './battle-field/battle-field.component';
import { PlayerSelectionComponent } from './player-selection/player-selection.component';
import { StartGameComponent } from './start-game/start-game.component';


const routes: Routes = [
  { path: 'new-game', component: PlayerSelectionComponent },
  { path: 'battle', component: BattleFieldComponent },
  { path: '', component: StartGameComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
