import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayerSelectionComponent } from './player-selection/player-selection.component';
import { StartGameComponent } from './start-game/start-game.component';


const routes: Routes = [
  { path: 'new-game', component: PlayerSelectionComponent, data: { animationState: 'New' } },
  { path: '', component: StartGameComponent, data: { animationState: 'Characters' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
