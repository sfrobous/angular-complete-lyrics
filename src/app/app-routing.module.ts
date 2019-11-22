import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompleteLyricsComponent } from './components/complete-lyrics/complete-lyrics.component';


const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
